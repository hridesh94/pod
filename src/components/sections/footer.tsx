import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
      <Container>
        <div className="py-10 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-display font-bold">
                  H
                </div>
                <span className="text-lg font-display font-semibold">
                  Hridesh Sapkota
                </span>
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                Professional podcast producer with 4+ years of experience in audio editing, video production, and podcast strategy.
              </p>
              <div className="flex space-x-4">
                {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                    aria-label={platform}
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services#setup"
                    className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                  >
                    Setting up the Podcast
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#editing"
                    className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                  >
                    Recording and Editing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#distribution"
                    className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                  >
                    Distribution and Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                  >
                    Pricing Plans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {SITE_CONFIG.contact.phone}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} Hridesh Sapkota. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-xs text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "twitter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      );
    default:
      return null;
  }
};