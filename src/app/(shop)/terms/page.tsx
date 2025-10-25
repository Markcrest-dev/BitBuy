import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Terms of Service</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using ShopHub ("the Service"), you agree to be bound by these Terms of Service
                ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p className="text-gray-700">
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
              <p className="text-gray-700 mb-4">
                You may use our Service only as permitted by law. You agree not to misuse the Service or
                help anyone else do so.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>You agree not to:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
                <li>Submit false, inaccurate, or misleading information</li>
                <li>Use any automated system to access the Service</li>
                <li>Attempt to interfere with, compromise, or disrupt the Service</li>
                <li>Resell or commercially exploit the Service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate, complete, and current
                information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding your password and for all activities that occur under
                your account. You must notify us immediately of any unauthorized use of your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account if you breach these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Orders and Payments</h2>
              <p className="text-gray-700 mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse or
                cancel any order for any reason, including but not limited to product availability, errors
                in pricing or product information, or suspected fraud.
              </p>
              <p className="text-gray-700 mb-4">
                Prices for our products are subject to change without notice. We reserve the right to modify
                or discontinue products without notice.
              </p>
              <p className="text-gray-700 mb-4">
                Payment must be received before your order is processed. We accept major credit cards, debit
                cards, and other payment methods as displayed at checkout.
              </p>
              <p className="text-gray-700">
                By providing payment information, you represent and warrant that you are authorized to use
                the payment method and authorize us to charge your payment method.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-4">
                We will ship products to the address you provide during checkout. You are responsible for
                ensuring the accuracy of your shipping information.
              </p>
              <p className="text-gray-700 mb-4">
                Delivery times are estimates and not guaranteed. We are not liable for delays caused by
                shipping carriers or circumstances beyond our control.
              </p>
              <p className="text-gray-700">
                Risk of loss and title for products pass to you upon delivery to the carrier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-700 mb-4">
                Our return policy allows returns within 30 days of delivery for most products. Items must
                be unused, in original packaging, and in resalable condition.
              </p>
              <p className="text-gray-700 mb-4">
                Certain items are non-returnable, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal care and hygiene products</li>
                <li>Downloadable software and digital products</li>
                <li>Gift cards and promotional items</li>
                <li>Clearance and final sale items</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Refunds will be processed to the original payment method within 5-7 business days after we
                receive and inspect the returned item.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are owned by ShopHub and
                are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not copy, modify, distribute, sell, or lease any part of our Service without our
                express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. User Content</h2>
              <p className="text-gray-700 mb-4">
                Our Service may allow you to post reviews, comments, and other content. You retain ownership
                of your content, but grant us a worldwide, non-exclusive, royalty-free license to use,
                reproduce, and display your content.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for your content and represent that you own or have necessary rights to
                post it. We reserve the right to remove any content that violates these Terms or is otherwise
                objectionable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700">
                We do not warrant that the Service will be uninterrupted, secure, or error-free, or that
                defects will be corrected.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHOPHUB SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
                WHETHER INCURRED DIRECTLY OR INDIRECTLY.
              </p>
              <p className="text-gray-700">
                Our total liability to you for any claims arising from your use of the Service shall not
                exceed the amount you paid us in the twelve (12) months prior to the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless ShopHub and its officers, directors,
                employees, and agents from any claims, liabilities, damages, losses, or expenses arising
                from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of the United
                States and the State of New York, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify or replace these Terms at any time. We will provide notice
                of material changes by posting the new Terms on this page and updating the "Last updated"
                date.
              </p>
              <p className="text-gray-700">
                Your continued use of the Service after changes become effective constitutes acceptance of
                the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@shophub.com<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Address:</strong> 123 Commerce Street, New York, NY 10001
                </p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Privacy Policy →
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
