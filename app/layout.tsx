import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Janet Owusu — Data Analyst & Business Intelligence Specialist",
  description: "Transforming complex data into clear, actionable insights for strategic business decisions. Professional portfolio of Janet Owusu, Data Analyst specializing in Power BI, Tableau, SQL, and Python.",
  keywords: "Data Analyst, Business Intelligence, Power BI, Tableau, SQL, Python, Data Visualization, Analytics, Janet Owusu",
  openGraph: {
    title: "Janet Owusu — Data Analyst & Business Intelligence Specialist",
    description: "Transforming complex data into clear, actionable insights for strategic business decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
