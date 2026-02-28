import Footer from "@/ShareComponents/Footer";
import NavBar from "@/ShareComponents/NavBar";


export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}