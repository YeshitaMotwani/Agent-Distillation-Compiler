import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import DemoLayout from "@/components/demo/DemoLayout";

export const metadata = {
  title: "Demo — Agent Distillation Compiler",
};

export default function DemoPage() {
  return (
    <main>
      <Navbar />
      <DemoLayout />
      <Footer />
    </main>
  );
}