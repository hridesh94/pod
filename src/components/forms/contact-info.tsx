"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FadeInUp } from '@/components/animations/fade-in-up';
import { SITE_CONFIG } from '@/lib/constants';

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

export const ContactInfo = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: "mail",
      label: "Email",
      value: SITE_CONFIG.contact.email,
      link: `mailto:${SITE_CONFIG.contact.email}`,
    },
    {
      icon: "phone",
      label: "Phone",
      value: SITE_CONFIG.contact.phone,
      link: `tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "@hrideshsapkota",
      link: SITE_CONFIG.social.instagram,
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "Hridesh Sapkota",
      link: SITE_CONFIG.social.linkedin,
    },
  ];

  return (
    <FadeInUp delay={0.2}>
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-display font-semibold mb-6">Get in Touch</h3>
        
        <p className="text-neutral-700 dark:text-neutral-300 mb-8">
          Need help with your podcast? Have questions about my services? I'm here to help you create amazing audio content.
        </p>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div 
              key={method.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex items-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-500 mr-4">
                {method.icon === "mail" && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                )}
                
                {method.icon === "phone" && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                )}
                
                {method.icon === "instagram" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                
                {method.icon === "linkedin" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )}
              </div>
              
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{method.label}</p>
                <Link href={method.link || '#'} className="text-neutral-900 dark:text-neutral-100 font-medium hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  {method.value}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10">
          <h4 className="text-lg font-display font-medium mb-3">Office Hours</h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            Monday - Friday: 9am - 6pm NPT<br />
            Weekend: Available for urgent matters
          </p>
        </div>
      </div>
    </FadeInUp>
  );
};
