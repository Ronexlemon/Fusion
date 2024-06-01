import Image from "next/image";
import { Inter } from "next/font/google";
import { AuthPage } from "@/components/pages/AuthPage";
import MarketPlace from "@/components/pages/MarketPage";
import OndeliveryProducts from "@/components/pages/onDeliveryProducts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col  items-center justify-between `}
    >
      <OndeliveryProducts/>
    </main>
  );
}
