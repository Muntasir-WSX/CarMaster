import React from "react";
import { FaGoogle, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import FooterLogo from "./FooterLogo";

export default function Footer() {
  const portfolioLink = "https://myportfolio-ea142.web.app/";

  const footerLinks = [
    {
      title: "About",
      links: ["Home", "Service", "Contact"],
    },
    {
      title: "Company",
      links: ["Why Car Master", "About"], 
    },
    {
      title: "Support",
      links: ["Support Center", "Feedback", "Accesbility"],
    },
  ];

  return (
    <footer className="bg-[#151515] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="flex flex-col items-start space-y-6">
          <div className="-ml-2">
            <FooterLogo width={80} height={55} />
          </div>

          <p className="text-[#E8E8E8] text-sm leading-relaxed max-w-70">
            Car Master is a leading automotive repair shop, providing top-notch
            maintenance and expert care to keep your vehicle running at its peak
            performance.
          </p>
          <div className="flex gap-3">
            <SocialIcon link={portfolioLink} icon={<FaGoogle />} />
            <SocialIcon link={portfolioLink} icon={<FaTwitter />} />
            <SocialIcon link={portfolioLink} icon={<FaInstagram />} />
            <SocialIcon link={portfolioLink} icon={<FaLinkedin />} />
          </div>
        </div>
        {footerLinks.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h4 className="text-xl font-semibold">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-[#F3F3F3] hover:text-[#FF3811] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

function SocialIcon({ icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center text-lg hover:bg-[#FF3811] cursor-pointer transition-all"
    >
      {icon}
    </a>
  );
}
