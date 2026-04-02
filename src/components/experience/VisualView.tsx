import { useTranslations } from "next-intl";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export default function ExperienceVisualView() {
  const t = useTranslations("ExperiencePage");
  const tData = useTranslations("ExperienceData");
  const experiences = tData.raw("items") as ExperienceItem[];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-bg-border ml-4 hidden sm:block"
        aria-hidden="true"
      />

      <ol
        className="flex flex-col gap-10"
        aria-label={t("listAriaLabel")}
      >
        {experiences.map((exp, index) => (
          <li
            key={exp.company}
            className="relative sm:pl-12 animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Timeline dot */}
            <div
              className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-bg-elevated border-2 border-accent-purple hidden sm:flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-2 h-2 rounded-full bg-accent-purple" />
            </div>

            <article className="card p-5 sm:p-6">
              {/* Header */}
              <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-text-primary font-semibold text-lg leading-tight">
                    {exp.role}
                  </h2>
                  <p className="text-accent-purple font-medium text-sm mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1 shrink-0">
                  <span className="tag">{exp.period}</span>
                  <span className="tag">{exp.location}</span>
                </div>
              </header>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Achievements */}
              <ul
                className="mb-4 space-y-1.5"
                aria-label={t("achievementsAriaLabel")}
              >
                {exp.achievements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span
                      className="text-code-green mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div
                className="flex flex-wrap gap-1.5"
                aria-label={t("technologiesAriaLabel")}
              >
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
