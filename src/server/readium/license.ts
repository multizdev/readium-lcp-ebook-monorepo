import axios from 'axios';

/**
 * Generate a license for the content.
 * @param contentId - The content ID
 * @param provider - Provider URL
 * @param userInfo - User info including passphrase
 * @param rights - Rights associated with the license
 * @returns The generated license from LCP server
 */
async function generateLicense(
  contentId: string,
  provider: string,
  userInfo: { id: string; email: string; hint: string; passphraseHash: string },
  rights: { print: number; copy: number; start: string; end: string },
) {
  const licensePayload = {
    provider,
    user: {
      id: userInfo.id,
      email: userInfo.email,
      encrypted: ['email'],
    },
    encryption: {
      user_key: {
        text_hint: userInfo.hint,
        hex_value: userInfo.passphraseHash,
      },
    },
    rights: {
      print: rights.print,
      copy: rights.copy,
      start: rights.start,
      end: rights.end,
    },
  };

  const licenseUrl = `http://localhost:8989/contents/${contentId}/license`;
  return await axios.post(licenseUrl, licensePayload, {
    auth: {
      username: 'lcp-user',
      password: 'lcp-pass',
    },
  });
}

export { generateLicense };