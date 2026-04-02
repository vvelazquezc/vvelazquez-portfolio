"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "success";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onBlur" });

  async function onSubmit() {
    setFormState("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <div
        className="card p-8 flex flex-col items-center gap-4 text-center animate-fade-in"
        role="alert"
        aria-live="polite"
      >
        <div className="w-14 h-14 rounded-full bg-code-green/10 border border-code-green/20 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-code-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-text-primary font-semibold text-lg">
          {t("successTitle")}
        </h2>
        <p className="text-text-secondary text-sm max-w-sm">{t("successText")}</p>
        <button
          onClick={() => {
            reset();
            setFormState("idle");
          }}
          className="text-accent-purple text-sm hover:underline"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-5 sm:p-8 flex flex-col gap-5"
      noValidate
      aria-label={t("ariaLabel")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-text-secondary"
          >
            {t("name")}{" "}
            <span className="text-accent-purple" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`px-3 py-2.5 rounded-lg bg-bg-surface border text-text-primary
                       placeholder:text-text-muted text-sm
                       focus:outline-none focus:ring-1 transition-colors
                       ${errors.name
                         ? "border-code-red/60 focus:border-code-red/60 focus:ring-code-red/20"
                         : "border-bg-border focus:border-accent-purple/60 focus:ring-accent-purple/30"
                       }`}
            {...register("name", {
              required: t("nameRequired"),
              minLength: { value: 2, message: t("nameMinLength") },
            })}
          />
          {errors.name && (
            <p id="name-error" className="text-code-red text-xs font-mono" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-text-secondary"
          >
            {t("email")}{" "}
            <span className="text-accent-purple" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`px-3 py-2.5 rounded-lg bg-bg-surface border text-text-primary
                       placeholder:text-text-muted text-sm
                       focus:outline-none focus:ring-1 transition-colors
                       ${errors.email
                         ? "border-code-red/60 focus:border-code-red/60 focus:ring-code-red/20"
                         : "border-bg-border focus:border-accent-purple/60 focus:ring-accent-purple/30"
                       }`}
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("emailInvalid"),
              },
            })}
          />
          {errors.email && (
            <p id="email-error" className="text-code-red text-xs font-mono" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-text-secondary"
        >
          {t("subject")}{" "}
          <span className="text-accent-purple" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="subject"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`px-3 py-2.5 rounded-lg bg-bg-surface border text-text-primary text-sm
                     focus:outline-none focus:ring-1 transition-colors appearance-none cursor-pointer
                     ${errors.subject
                       ? "border-code-red/60 focus:border-code-red/60 focus:ring-code-red/20"
                       : "border-bg-border focus:border-accent-purple/60 focus:ring-accent-purple/30"
                     }`}
          {...register("subject", { required: t("subjectRequired") })}
        >
          <option value="" className="bg-bg-elevated">
            {t("selectSubject")}
          </option>
          <option value="job" className="bg-bg-elevated">
            {t("subjectJob")}
          </option>
          <option value="freelance" className="bg-bg-elevated">
            {t("subjectFreelance")}
          </option>
          <option value="collab" className="bg-bg-elevated">
            {t("subjectCollab")}
          </option>
          <option value="other" className="bg-bg-elevated">
            {t("subjectOther")}
          </option>
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-code-red text-xs font-mono" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-text-secondary"
        >
          {t("message")}{" "}
          <span className="text-accent-purple" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`px-3 py-2.5 rounded-lg bg-bg-surface border text-text-primary
                     placeholder:text-text-muted text-sm resize-none
                     focus:outline-none focus:ring-1 transition-colors
                     ${errors.message
                       ? "border-code-red/60 focus:border-code-red/60 focus:ring-code-red/20"
                       : "border-bg-border focus:border-accent-purple/60 focus:ring-accent-purple/30"
                     }`}
          {...register("message", {
            required: t("messageRequired"),
            minLength: { value: 20, message: t("messageMinLength") },
          })}
        />
        {errors.message && (
          <p id="message-error" className="text-code-red text-xs font-mono" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || formState === "loading"}
        className="self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                   bg-accent-purple hover:bg-accent-purple-dim text-white text-sm font-medium
                   transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={isSubmitting || formState === "loading"}
      >
        {isSubmitting || formState === "loading" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("sending")}
          </>
        ) : (
          <>
            {t("send")}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
