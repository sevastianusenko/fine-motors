import Link from "next/link";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";

export const metadata = {
  title: "Privacy Policy — Fine Motors LLC",
  description: "Privacy Policy for Fine Motors LLC, Newmanstown PA.",
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Effective date: May 1, 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p>
              Fine Motors LLC ("we," "us," or "our") is an independent used car dealership
              located at 3910 Stiegel Pike, Newmanstown, PA 17073. This Privacy Policy explains
              how we collect, use, and protect information you provide when visiting our website
              or contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>We may collect the following information when you use our website or contact form:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Message content (e.g. questions about a vehicle)</li>
              <li>Basic technical data (browser type, pages visited) via analytics tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your inquiries about vehicles</li>
              <li>Schedule test drives or appointments</li>
              <li>Improve our website and customer experience</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Cookies & Analytics</h2>
            <p>
              Our website may use cookies or similar technologies to understand how visitors
              interact with our pages. This data is aggregated and does not identify you
              personally. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              We retain contact information only as long as necessary to follow up on your
              inquiry or as required by applicable law. You may request deletion of your data
              at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p>
              Our website may link to external services (e.g. Google Maps, Facebook). Those
              services have their own privacy policies and we are not responsible for their
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of any personal
              information we hold about you. To exercise these rights, please contact us
              directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can reach us at:</p>
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
