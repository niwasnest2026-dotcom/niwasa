import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Niwas Nest',
  description: 'Terms of Service for Niwas Nest - Learn about the terms and conditions for using our platform.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Niwas Nest ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Niwas Nest is a platform that connects users with property owners offering PGs, hostels, apartments, and coliving spaces. We facilitate the discovery and booking of accommodations but are not responsible for the actual provision of accommodation services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 18 years old to use our services</li>
                <li>One person may not maintain multiple accounts</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our platform for:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others</li>
                <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating</li>
                <li>Submitting false or misleading information</li>
                <li>Uploading or transmitting viruses or any other type of malicious code</li>
                <li>Spamming, phishing, or engaging in other unsolicited advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Bookings and Payments</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>All bookings are subject to availability and confirmation by the property owner</li>
                <li>Payment terms and cancellation policies are set by individual property owners</li>
                <li>We facilitate payments but are not responsible for refund disputes</li>
                <li>Additional fees may apply as specified during the booking process</li>
                <li>You agree to pay all charges incurred by your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Property Listings</h2>
              <p className="text-gray-700 mb-4">For property owners and managers:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You must have the legal right to list and rent the property</li>
                <li>All information provided must be accurate and up-to-date</li>
                <li>You are responsible for managing bookings and guest communications</li>
                <li>You must comply with all applicable laws and regulations</li>
                <li>You agree to honor confirmed bookings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Platform and its original content, features, and functionality are and will remain the exclusive property of Niwas Nest and its licensors. The Platform is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. User Content</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You retain ownership of content you submit to the Platform</li>
                <li>You grant us a license to use, modify, and display your content on the Platform</li>
                <li>You are responsible for ensuring your content does not violate any laws or third-party rights</li>
                <li>We reserve the right to remove content that violates these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>The Platform is provided "as is" without warranties of any kind</li>
                <li>We do not guarantee the accuracy of property listings or availability</li>
                <li>We are not responsible for the quality or condition of accommodations</li>
                <li>Users interact with property owners at their own risk</li>
                <li>We do not endorse or guarantee any property or property owner</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Niwas Nest, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, punitive, consequential, or special damages arising from your use of the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to defend, indemnify, and hold harmless Niwas Nest and its licensee and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of India. Any disputes arising from these terms shall be subject to the jurisdiction of Indian courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@niwasnest.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91-XXXX-XXXX-XX</p>
                <p className="text-gray-700"><strong>Address:</strong> [Your Business Address]</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Niwas Nest, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}