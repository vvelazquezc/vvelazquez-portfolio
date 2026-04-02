import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContentLayout from "@/layouts/ContentLayout";
import ExperienceCodeView from "@/components/experience/CodeView";
import ExperienceVisualView from "@/components/experience/VisualView";
import SkillsMinimap from "@/components/experience/SkillsMinimap";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("experienceTitle"),
    description: t("experienceDescription"),
  };
}

export default async function ExperiencePage() {
  const t = await getTranslations("ExperiencePage");
  return (
    <ContentLayout
      title={t("title")}
      subtitle={t("subtitle")}
      codeView={<ExperienceCodeView />}
      visualView={<ExperienceVisualView />}
      sidebar={<SkillsMinimap />}
    />
  );
}
