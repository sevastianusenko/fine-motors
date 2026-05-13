import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "Terms of Use — Fine Motors LLC",
  description: "Terms of Use for Fine Motors LLC, Newmanstown PA.",
};

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-white font-sans antialiased flex flex-col">
      <NavBar />

      <main className="flex-1 mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-400 mb-10">Effective date: May 1, 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Fine Motors LLC website ("Site"), you agree to be bound
              by these Terms of Use. If you do not agree, please do not use this Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Use of the Site</h2>
            <p>You agree to use this Site only for lawful purposes. You may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Reproduce or redistribute any content without our written permission</li>
              <li>Use the Site in any way that could damage or impair its operation</li>
              <li>Attempt to gain unauthorized access to any part of the Site</li>
              <li>Submit false or misleading information through any contact form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Vehicle Listings & Pricing</h2>
            <p>
              All vehicle listings, descriptions, and prices on this Site are provided for
              informational purposes only and are subject to change without notice. We make
              every effort to ensure accuracy, but we do not guarantee that listing information
              is free of errors. Final pricing and availability must be confirmed directly with
              Fine Motors LLC before purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. No Warranty</h2>
            <p>
              This Site and its content are provided "as is" without any warranty of any kind,
              express or implied. Fine Motors LLC does not warrant that the Site will be
              uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Fine Motors LLC shall not be liable for
              any indirect, incidental, or consequential damages arising from your use of this
              Site or reliance on any information provided herein.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Third-Party Links</h2>
            <p>
              This Site may contain links to third-party websites (e.g. Google Maps, Facebook).
              These links are provided for convenience only. Fine Motors LLC has no control over
              and accepts no responsibility for the content of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, logos, and design — is the
              property of Fine Motors LLC or its content suppliers and is protected by applicable
              copyright laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms of Use at any time. Changes will be
              posted on this page with an updated effective date. Continued use of the Site
              after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Commonwealth of Pennsylvania, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>Questions about these Terms? Reach us at:</p>
            <div className="mt-3 space-y-1">
              <p><span className="font-semibold">Fine Motors LLC</span></p>
              <p>3910 Stiegel Pike, Newmanstown, PA 17073</p>
              <p>
                Phone:{" "}
                <a href="tel:+17176445444" className="text-orange-500 hover:underline">
                  (717) 644-5444
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:Finemotorsautosales@gmail.com" className="text-orange-500 hover:underline">
                  Finemotorsautosales@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
