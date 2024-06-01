import Image from "next/image";
import { Inter } from "next/font/google";
import { AuthPage } from "@/components/pages/AuthPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col  items-center justify-between `}
    >
      <AuthPage />
    </main>
  );
}
