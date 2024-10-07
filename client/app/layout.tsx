import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";
import MainContentLayout from "@/providers/MainContentLayout";
import MainLayout from "@/providers/MainLayout";
import GTMInitialiser from "@/providers/GTMInitialiser";


export const metadata: Metadata = {
  title: "Task Manager App",
  description: "Task Manager App By Faizan Maseeh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMInitialiser />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
          <Toaster position="top-center" />
          <div className="h-full flex overflow-hidden">
            <MiniSidebar />
            <div className="flex-1 flex flex-col">
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
              </MainContentLayout>
            </div>
          </div>
      </body>
    </html>
  );
}
