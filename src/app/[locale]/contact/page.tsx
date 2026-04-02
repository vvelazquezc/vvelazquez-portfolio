import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-accent-purple text-sm mb-2">
          {t("commandHint")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          {t("title")}
        </h1>
        <p className="text-text-muted text-sm sm:text-base">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Aside info */}
        <aside
          className="lg:col-span-2 flex flex-col gap-5"
          aria-label={t("contactInfoAriaLabel")}
        >
          {/* Availability */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full bg-code-green animate-pulse"
                aria-hidden="true"
              />
              <h2 className="text-sm font-semibold text-text-primary">
                {t("availability")}
              </h2>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t("availabilityText")}
            </p>
          </div>

          {/* Response time */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-text-primary mb-1">
              {t("responseTime")}
            </h2>
            <p className="text-text-muted text-sm font-mono">
              {t("responseTimeValue")}
            </p>
          </div>

          {/* Social links */}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-text-primary mb-3">
              {t("findMe")}
            </h2>
            <ul className="flex flex-col gap-2" role="list">
              {[
                { label: "GitHub", handle: "@vvelazquez", href: "#" },
                { label: "LinkedIn", handle: "Verónica Velázquez", href: "#" },
              ].map(({ label, handle, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                    aria-label={`${label}: ${handle}`}
                  >
                    <span className="text-text-muted group-hover:text-accent-purple transition-colors font-mono text-xs w-16 shrink-0">
                      {label}
                    </span>
                    <span className="text-text-muted group-hover:text-text-secondary transition-colors">
                      {handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
