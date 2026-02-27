import ServicesSection from "./HomeComponents/ServicesSection/ServicesSection";
import Banner from "./HomeComponents/Banner/Banner";
import AboutUs from "./HomeComponents/AboutUs/AboutUs";
import CTA from "./HomeComponents/CTA/CTA";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col gap-20 lg:gap-32 pb-20">
      
      {/* Banner */}
      <Banner />

      {/* About Us */}
      <AboutUs />

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <CTA />

      {/* products */}

      {/* Meet Our Team */}

      {/* Core Features */}

      {/* testimonials */}

    </main>
  );
}