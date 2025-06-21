'use client';
import React from 'react';
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple, FaWhatsapp,  } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Container } from '@mui/material';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
const Footer = () => {
  const list = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'About', link: '/About' },
    { id: 3, name: 'Categories', link: '/Category' },
    { id: 4, name: 'Contact Us', link: '/Contactus' },
    { id: 5, name: 'Help', link: '/Help' },
  ];

  const supportLinks = [
  
    { id: 6, name: 'Help', link: "/help" },
    { id: 7, name: 'Terms & Conditions', link: "/terms_conditions" },
    { id: 8, name: "Privacy Policy", link: "/privacypolicy" },
    { id: 9, name: "Delivery Information", link: "/DeliveryInfo" },
    { id: 10, name: "Returns and Cancellations", link: "/return" },
  ];

  const socialIcons = [
    { href: "https://facebook.com",color:'var(--secondary)', icon: <FaFacebook size={22} /> },
    { href: "https://instagram.com",color:'var(--secondary)', icon: <FaInstagram size={22} /> },
    { href: "https://youtube.com",color:'var(--secondary)', icon: <FaPinterest size={22} /> },
  ];

  return (
    <footer className="w-full overflow-hidden mt-20 font-[600] text-[var(--secondary)]">
      {/* Top Section */}
      <div className="bg-[#FFB82C] py-10 px-4">
        <Container>
          <div className="flex w-full flex-col lg:flex-row flex-wrap justify-between text-[var(--secondary)]">
            
            {/* Column 1: Logo & Description */}
            <div className="w-full lg:w-[30%] space-y-4">
              <img src="/assets/logo.svg" alt="Anne Creations Logo" className="w-[150px] h-auto max-w-full" />
              <p className="text-sm">
                Anne Creations HB is a leading company in South India for embroidery design support
                for single-needle and multi-needle machines.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://apps.apple.com/app/your-app-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg"
                >
                  <FaApple size={30} color="var(--secondary)" />
                  <div className="text-sm">
                    <p className="text-[12px]">Download on the</p>
                    <p className="text-[18px] font-bold">App Store</p>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=your.app.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg"
                >
                  <IoLogoGooglePlaystore size={30} color="var(--secondary)" />
                  <div className="text-sm">
                    <p className="text-[12px]">Get it on</p>
                    <p className="text-[18px] font-bold">Play Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="w-full sm:w-1/2 lg:w-[15%]">
              <h3 className="font-bold text-lg my-4">Quick Links</h3>
              <ul className="space-y-2">
                {list.map((item) => (
                  <li key={item.id}>
                    <a href={item.link} className="hover:underline text-md">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="w-full sm:w-1/2 lg:w-[20%]">
              <h3 className="font-bold text-lg my-4">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((item) => (
                  <li key={item.id}>
                    <a href={item.link} className="hover:underline text-md">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="w-full lg:w-[20%]">
              <h3 className="font-bold text-lg my-4">Contact Us</h3>
              <ul className="space-y-2 text-md">
                <li className="flex items-center gap-2">
                  <FaWhatsapp />
                  <a
                    href="https://wa.me/919951916767"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    +91 995191 6767
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineEmail color='var(--secondary'  />
                  <a href="mailto:support@annecreationshb.com" className="hover:underline">
                    support@gmail.com
                  </a>
                </li>

                <li className="pt-4 font-semibold">Follow Us</li>
                <li className="flex gap-3">
                  {socialIcons.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75"
                    >
                      {item.icon}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--secondary)] py-4">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-[#FFB82C] text-center">
            <span>© Copyright 2025. All rights reserved.</span>
            <span>Design & Developed by W3 Technologies</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
