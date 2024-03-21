import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

import '../shared/styles/main.scss';

const inter = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Backoffice Singh Noor",
  description: "Store management system for singhnoor.com website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
