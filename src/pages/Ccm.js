import '../app/globals.css'
import CustomNavbar from "@/components/CustomNavbar";
import Header from "@/components/Header";
import Accordeon from "@/components/Accordeon"
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <Header />
      <Accordeon />

      <Footer />

    </div>
  );
}