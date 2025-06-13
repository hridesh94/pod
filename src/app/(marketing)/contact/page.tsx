import React from 'react';
import { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { FadeInUp } from '@/components/animations/fade-in-up';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { ContactForm } from '@/components/forms/contact-form';
import { ContactInfo } from '@/components/forms/contact-info';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact - Hridesh Sapkota | Podcast Producer',
  description: 'Get in touch with Hridesh Sapkota for podcast production, editing, and marketing services. Email, phone, and contact form available.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32">
        <Container>
          <StaggerContainer>
            <FadeInUp>
              <h1 className="text-hero font-display font-bold text-center mb-6">
                Let's Work <span className="text-primary-500">Together</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-xl text-neutral-700 dark:text-neutral-300 text-center max-w-2xl mx-auto mb-12">
                Have a podcast project in mind or a question about my services? I'd love to hear from you and discuss how I can help bring your audio vision to life.
              </p>
            </FadeInUp>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Contact Form and Info Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <FadeInUp>
                <h2 className="text-display font-display font-bold mb-8">Send Me a Message</h2>
              </FadeInUp>
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-display font-display font-bold text-center mb-12">
                Frequently Asked <span className="text-primary-500">Questions</span>
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                  <h3 className="font-display font-semibold text-xl mb-3">How quickly can you deliver podcast edits?</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    For standard podcast episodes (30-60 minutes), I typically deliver within 48-72 hours. For rush jobs or longer formats, please contact me to discuss timeline requirements.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                  <h3 className="font-display font-semibold text-xl mb-3">Do you offer custom packages?</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Absolutely! While I offer standard packages for common needs, I understand that each podcast is unique. Contact me with your specific requirements, and I'll create a tailored solution that fits your vision and budget.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                  <h3 className="font-display font-semibold text-xl mb-3">What format should I provide my raw audio in?</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    For best results, please provide uncompressed WAV or AIFF files (48kHz, 24-bit). However, I can work with most formats including MP3s and video files from platforms like Zoom or Riverside.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                  <h3 className="font-display font-semibold text-xl mb-3">Do you sign NDAs?</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Yes, I'm happy to sign non-disclosure agreements to protect your content and discussions. Client confidentiality is something I take very seriously.
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </Section>
      
      {/* Map Section */}
      <Section className="pb-20">
        <Container>
          <FadeInUp>
            <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">
                  Map placeholder - Google Maps embed will be here
                </p>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </Section>
    </>
  );
}