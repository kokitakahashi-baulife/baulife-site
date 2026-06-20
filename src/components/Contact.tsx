import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-28 px-5 sm:px-6"
      style={{
        background:
          "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 40%, #faf0e6 100%)",
      }}
    >
      <div className="max-w-[520px] mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Contact
            </p>
            <h2 className="text-2xl font-bold mb-5">お問い合わせ</h2>
            <p className="text-sm text-[#666] mb-9 leading-relaxed">
              コラボのご相談、取材、その他のお問い合わせはこちらから。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
