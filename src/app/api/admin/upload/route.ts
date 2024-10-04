import { join } from 'node:path';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  promises as fsPromises,
} from 'node:fs';

import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { generateSha256, saveFile, storeEncryptedContent } from '@/server/util';

// Ensure that the uploads directory exists
function ensureUploadsDirectory(): string {
  const uploadsDir = join(process.cwd(), 'public/uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
  }
  return uploadsDir;
}

/**
 * Handle the POST request for file upload and license generation.
 */
export async function POST(req: NextRequest): Promise<Response | undefined> {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 },
      );
    }

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }

    // Ensure that the uploads directory exists
    const uploadsDir = ensureUploadsDirectory();

    // Prepare file path and save the file
    // const filePath = join(process.cwd(), 'public/uploads', file.name.trim());
    const filePath = join(uploadsDir, file.name.trim());
    const saved = await saveFile(file, filePath.trim());

    if (!saved) {
      return NextResponse.json(
        { error: 'File upload failed' },
        { status: 500 },
      );
    }

    // Ensure the file is fully written and accessible using fs.stat instead of fs.access
    await fsPromises.stat(filePath);

    // Read file content and generate SHA-256
    const fileBuffer = readFileSync(filePath);
    const sha256Hash = generateSha256(fileBuffer);

    // Set content ID, encryption key, provider, and rights
    const contentId = uuidv4(); // You should generate this dynamically
    const encryptionKey = crypto.randomBytes(32).toString('hex'); // Replace with the actual encryption key

    // Store the encrypted content on LCP server
    const lcpResponse = await storeEncryptedContent(
      contentId,
      filePath,
      sha256Hash,
      encryptionKey,
    );

    if (lcpResponse.status !== 201 && lcpResponse.status !== 200) {
      throw new Error('Failed to store encrypted content on LCP server');
    }

    // Return success response
    return NextResponse.json({
      message: 'File uploaded, stored, and license generated successfully',
      content: lcpResponse.data,
      contentId,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `File upload or publish failed: ${error}` },
        { status: 500 },
      );
    }
  }
}
