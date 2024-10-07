import { NextResponse } from 'next/server';

import { v4 as uuidv4 } from 'uuid';

import { exec } from 'node:child_process';

// Function to convert PDF to EPUB using Calibre's ebook-convert tool
async function convertPdfToEpub(tempFilePath: string): Promise<string> {
  const epubFilePath = tempFilePath.replace('.pdf', '.epub'); // Change file extension to .epub
  return new Promise((resolve, reject) => {
    const conversionCommand = `ebook-convert "${tempFilePath}" "${epubFilePath}"`;
    exec(conversionCommand, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Conversion failed: ${error.message}`));
      }
      if (stderr) {
        return reject(new Error(`Conversion stderr: ${stderr}`));
      }
      console.log(`Conversion stdout: ${stdout}`);
      resolve(epubFilePath); // Return the EPUB file path
    });
  });
}

async function encryptAndStore(tempFilePath: string): Promise<Response> {
  const finalFilePath = await convertPdfToEpub(tempFilePath);

  const contentId = uuidv4();
  const storagePath = 'D:\\MultiDev\\EReader\\readium\\storage'; // Adjust to your storage path
  const publicUrl = 'http://localhost:8989'; // Public URL where encrypted files are accessible

  const lcp_user = process.env.LCP_USERNAME || '';
  const lcp_pass = process.env.LCP_PASSWORD || '';

  const lcpencryptCommand = `lcpencrypt -input "${finalFilePath.replaceAll(' ', '').trim()}" -storage ${storagePath} -url ${publicUrl} -contentid ${contentId} -lcpsv http://${lcp_user}:${lcp_pass}@localhost:8989 -verbose`;

  return new Promise((resolve) => {
    exec(lcpencryptCommand, async (error, stdout, stderr) => {
      if (error) {
        return resolve(
          NextResponse.json(
            { error: `Encryption failed: ${error.message}` },
            { status: 500 },
          ),
        );
      }
      if (stderr) {
        return resolve(
          NextResponse.json(
            { error: `Encryption stderr: ${stderr}` },
            { status: 500 },
          ),
        );
      }

      console.log(`Encryption stdout: ${stdout}`);

      // Optionally, notify the LCP server of the new encrypted file
      // You can use the LCP server notification feature here if needed

      return resolve(
        NextResponse.json({
          message: 'File encrypted and stored successfully',
          contentId: contentId,
          url: `${publicUrl}/${contentId}.epub`,
        }),
      );
    });
  });
}

export { encryptAndStore };
