import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "../shared/components/SessionProvider";

import '../shared/styles/main.scss';

const inter = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Singh Noor Backoffice",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
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
