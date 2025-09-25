import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";

export const metadata = {
  title: "Contact Us | Nature and Nurtures",
  description:
    "Get in touch with Nature and Nurtures for inquiries and support.",
};
export default async function ContactPage() {
  return (
    <div>
      <Header />

      <main className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          We&apos;d love to hear from you! Whether you have questions about our
          products, need assistance with an order, or just want to say hello,
          feel free to reach out.
        </p>
      </main>
      <Footer />
    </div>
  );
}
