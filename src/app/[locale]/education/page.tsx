import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContentLayout from "@/layouts/ContentLayout";
import EducationCodeView from "@/components/education/CodeView";
import EducationVisualView from "@/components/education/VisualView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("educationTitle"),
    description: t("educationDescription"),
  };
}

export default async function EducationPage() {
  const t = await getTranslations("EducationPage");
  return (
    <ContentLayout
      title={t("title")}
      subtitle={t("subtitle")}
      codeView={<EducationCodeView />}
      visualView={<EducationVisualView />}
    />
  );
}
