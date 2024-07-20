import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/modules/app/provider/QueryClient";
import { Nav } from "@/modules/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Query Training",
  description: "Task on React Query Paginations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          <Nav />
          <div className="px-8 py-8 w-full items-center justify-center flex">{children}</div>
        </body>
      </html>
    </Provider>
  );
}
