import { Metadata } from "next";
import { getFooterSocialLinks } from "./action";
import { FooterForm } from "./footer-form";

export const metadata: Metadata = {
  title: "Dashboard - Footer Page Builder",
  description: "Manage and edit footer social media links in the dashboard.",
};

export default async function FooterPageBuilder() {
  const data = await getFooterSocialLinks();
  return <FooterForm initialData={data} />;
}
