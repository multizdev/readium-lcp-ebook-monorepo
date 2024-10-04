import { promises as fs } from 'fs';

import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

const ensureUploadsDirectory = async () => {
  const dir = path.join(process.cwd(), 'public/publications/cover-images');
  await fs.mkdir(dir, { recursive: true });
  return dir;
};

const saveFile = async (file: File, filePath: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);
  return true;
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse | undefined> {
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
    const id = formData.get('id') as string;

    if (!file || !id) {
      return NextResponse.json(
        { error: 'File or ID not found' },
        { status: 400 },
      );
    }

    // Ensure that the uploads directory exists
    const uploadsDir = await ensureUploadsDirectory();

    // Prepare file path and save the file
    const fileExtension = path.extname(file.name);
    const filePath = path.join(uploadsDir, `${id}${fileExtension}`);
    const saved = await saveFile(file, filePath);

    if (!saved) {
      return NextResponse.json(
        { error: 'File upload failed' },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
