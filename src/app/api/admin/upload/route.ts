import { join } from 'node:path';
import { existsSync, mkdirSync, promises as fsPromises } from 'node:fs';

import { NextRequest, NextResponse } from 'next/server';

import { saveFile } from '@/server/util';
import { encryptAndStore } from '@/server/readium/encrypt';

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

    console.log('FILEPATH', filePath);

    const saved = await saveFile(file, filePath.trim());

    console.log('SAVED', saved);

    if (!saved) {
      return NextResponse.json(
        { error: 'File upload failed' },
        { status: 500 },
      );
    }

    // Ensure the file is fully written and accessible using fs.stat instead of fs.access
    const stats = await fsPromises.stat(filePath);

    console.log('STATS', stats);

    const response = await encryptAndStore(filePath);

    console.log('RESP', response);

    // Delete the temporarily uploaded file
    // await fsPromises.unlink(filePath);

    return response;
  } catch (error) {
    console.log('Error', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `File upload or publish failed: ${error}` },
        { status: 500 },
      );
    }
  }
}
