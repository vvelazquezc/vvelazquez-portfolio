import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/home/Hero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: "Verónica Velázquez — Developer",
    description: t("homeDescription"),
  };
}

export default function HomePage() {
  return <Hero />;
}
