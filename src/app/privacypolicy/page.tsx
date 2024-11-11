import React, { ReactElement } from 'react';

function Page(): ReactElement {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-600">Effective Date: November 8, 2024</p>

      <p>
        Your privacy is important to us. This Privacy Policy outlines the
        information we collect and how we handle it in our eBook reading
        application.
      </p>

      <h2 className="text-2xl font-semibold text-blue-700">
        1. Information We Collect
      </h2>
      <p>
        As this is a demo version of our eBook reading application, we only
        collect the minimum information necessary to allow user login and
        signup. No additional personal data is collected or stored.
      </p>

      <h2 className="text-2xl font-semibold text-blue-700">
        2. How We Use Your Information
      </h2>
      <p>
        The information you provide at signup or login is solely used to grant
        you access to your account within the app.
      </p>

      <h2 className="text-2xl font-semibold text-blue-700">3. Data Security</h2>
      <p>
        We take appropriate measures to protect your information against
        unauthorized access. Your login credentials are securely stored and only
        accessible by you.
      </p>

      <h2 className="text-2xl font-semibold text-blue-700">
        4. Changes to this Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        posted here, and continued use of the app implies acceptance of any
        updates.
      </p>

      <h2 className="text-2xl font-semibold text-blue-700">5. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at{' '}
        <a
          href="mailto:multi@multidevs.com"
          className="text-blue-600 underline"
        >
          privacy@ebookapp.com
        </a>
        .
      </p>
    </div>
  );
}

export default Page;
