import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Privacy Policy</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                At BitBuy, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-gray-700">
                By using BitBuy, you agree to the collection and use of information in accordance with this
                policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-bold mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Account credentials (username and password)</li>
                <li>Order history and preferences</li>
                <li>Communications with customer service</li>
                <li>Reviews, comments, and feedback</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you access our Service, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Click patterns and browsing behavior</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Managing your account and providing customer support</li>
                <li>Sending order confirmations and shipping updates</li>
                <li>Communicating about products, services, and promotions</li>
                <li>Personalizing your shopping experience</li>
                <li>Improving our website and services</li>
                <li>Detecting and preventing fraud and security issues</li>
                <li>Complying with legal obligations</li>
                <li>Analyzing usage trends and user preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 mb-4">
                We may share your information with third parties in the following situations:
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We share information with third-party service providers who perform services on our behalf,
                such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Payment processors</li>
                <li>Shipping and delivery companies</li>
                <li>Email service providers</li>
                <li>Analytics providers</li>
                <li>Customer service platforms</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law or in response to valid requests by
                public authorities (e.g., court orders, subpoenas, or government regulations).
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                If BitBuy is involved in a merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </p>

              <h3 className="text-xl font-bold mb-3 mt-6">With Your Consent</h3>
              <p className="text-gray-700">
                We may share your information for any other purpose with your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our Service and hold
                certain information. Cookies are small data files stored on your device.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Types of cookies we use:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Functional Cookies:</strong> Enable personalized features and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Advertising Cookies:</strong> Deliver relevant ads based on your interests</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                However, some features of our Service may not function properly without cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-gray-700 mb-4">
                Our security measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through PCI-DSS compliant providers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-700 mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure.
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to fulfill the purposes outlined
                in this Privacy Policy, unless a longer retention period is required or permitted by law. When
                we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your information</li>
                <li><strong>Portability:</strong> Request transfer of your information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request limitation on processing of your information</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us at privacy@bitbuy.com. We will respond to your
                request within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If you are a parent or guardian and believe your
                child has provided us with personal information, please contact us to request deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
              <p className="text-gray-700">
                Our Service may contain links to third-party websites. We are not responsible for the privacy
                practices or content of these external sites. We encourage you to read the privacy policies of
                any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. These
                countries may have different data protection laws. By using our Service, you consent to the
                transfer of your information to these countries.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. California Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                If you are a California resident, you have additional rights under the California Consumer
                Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know if personal information is sold or disclosed</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to deletion of personal information</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700">
                We encourage you to review this Privacy Policy periodically. Your continued use of the Service
                after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@bitbuy.com<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Address:</strong> 123 Commerce Street, New York, NY 10001<br />
                  <strong>Privacy Officer:</strong> privacy@bitbuy.com
                </p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Terms of Service →
              </Link>
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                FAQ →
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
