import { useTranslations } from "next-intl";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  status: string;
  gpa?: string;
  description: string;
  highlights: string[];
  coursework: string[];
}

export default function EducationVisualView() {
  const t = useTranslations("EducationPage");
  const tData = useTranslations("EducationData");
  const education = tData.raw("items") as EducationItem[];

  return (
    <div className="flex flex-col gap-8">
      {education.map((edu, index) => (
        <article
          key={edu.institution}
          className="card p-5 sm:p-6 animate-slide-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-text-primary font-semibold text-lg leading-tight">
                {edu.degree}
              </h2>
              <p className="text-accent-cyan font-medium text-sm mt-0.5">
                {edu.institution}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1 shrink-0">
              <span className="tag">{edu.period}</span>
              <span className="tag">{edu.status}</span>
              {edu.gpa && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
                  GPA {edu.gpa}
                </span>
              )}
            </div>
          </header>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {edu.description}
          </p>

          {/* Highlights */}
          <ul
            className="mb-4 space-y-1.5"
            aria-label={t("highlightsAriaLabel")}
          >
            {edu.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-text-muted"
              >
                <span
                  className="text-accent-cyan mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Coursework */}
          {edu.coursework.length > 0 && (
            <div>
              <p className="text-xs text-text-muted mb-2 font-mono uppercase tracking-wider">
                {t("subjectsLabel")}
              </p>
              <div
                className="flex flex-wrap gap-1.5"
                aria-label={t("subjectsAriaLabel")}
              >
                {edu.coursework.map((course) => (
                  <span key={course} className="tag">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
