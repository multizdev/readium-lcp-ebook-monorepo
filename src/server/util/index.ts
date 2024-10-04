import { createWriteStream, readFileSync } from 'node:fs';

import crypto from 'crypto';

import axios from 'axios';

/**
 * Save the uploaded file to the filesystem.
 * @param file - The uploaded file
 * @param filePath - The target path to save the file
 * @returns boolean - Returns true if the file is saved successfully, false otherwise
 */
async function saveFile(file: File, filePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const fileStream = createWriteStream(filePath);
    const stream = file.stream();
    const reader = stream.getReader();

    reader
      .read()
      .then(async function processText({ done, value }) {
        if (done) {
          fileStream.end(() => {
            resolve(true); // Resolve true only after the file stream is fully closed
          });
          return;
        }
        if (value) {
          fileStream.write(Buffer.from(value));
        }
        await reader.read().then(processText);
      })
      .catch(() => {
        fileStream.end();
        reject(false); // File saving failed
      });
  });
}

/**
 * Generate a SHA-256 hash for the content.
 * @param content - Buffer of file content
 * @returns SHA-256 hash
 */
function generateSha256(content: Buffer | string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Store encrypted content in the LCP server.
 * @param contentId - The unique ID of the content
 * @param filePath - File path of the encrypted file
 * @param sha256 - SHA-256 hash of the content
 * @param encryptionKey - Encryption key for the content
 * @returns The LCP server response
 */
async function storeEncryptedContent(
  contentId: string,
  filePath: string,
  sha256: string,
  encryptionKey: string,
) {
  const payload = {
    'content-id': contentId,
    'storage-mode': 0, // Local file storage
    'content-encryption-key': encryptionKey,
    'protected-content-location': filePath,
    'protected-content-length': readFileSync(filePath).length,
    'protected-content-sha256': sha256,
    'protected-content-disposition': filePath.split('/').pop(),
  };

  const lcpServerUrl = `http://localhost:8989/contents/${contentId}`;
  return await axios.put(lcpServerUrl, payload, {
    auth: {
      username: 'lcp-user',
      password: 'lcp-pass',
    },
  });
}

export { saveFile, generateSha256, storeEncryptedContent };
