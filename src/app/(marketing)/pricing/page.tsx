import React from "react";
import { FadeInUp } from "../../../components/animations/fade-in-up";
import { Section } from "../../../components/ui/section";
import { StaggerContainer, StaggerItem } from "../../../components/animations/stagger-container";
import { Button } from "../../../components/ui/button";
import { PRICING } from "../../../lib/constants";
import Link from "next/link";
import { formatPrice } from "../../../lib/utils";

export default function PricingPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
              Pricing Plans
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
              Transparent, flexible pricing options to meet your podcast production needs
            </p>
          </FadeInUp>
        </div>
      </Section>

      {/* Pricing Table */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Select the perfect package for your podcast production needs
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING.map((plan, index) => (
            <StaggerItem index={index} key={plan.id}>
              <div
                className={`bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col ${
                  plan.popular
                    ? "ring-2 ring-primary-500 dark:ring-primary-400"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-1">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {" "}
                      / Episode
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-neutral-700 dark:text-neutral-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-500 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    isAnimated
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/contact">Choose Plan</Link>
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Custom Plans */}
      <Section className="bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp>
              <h2 className="text-3xl font-display font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                Every podcast is unique. If you need a tailored package to meet your specific requirements,
                I offer custom solutions designed just for you.
              </p>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.1}>
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Custom Package Benefits</h3>
                  <ul className="space-y-3">
                    {[
                      "Tailored to your specific podcast format",
                      "Flexible production schedule",
                      "Priority support and faster turnaround",
                      "Additional revision rounds",
                      "Advanced marketing and growth strategies",
                      "Consultation and coaching sessions"
                    ].map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start text-neutral-700 dark:text-neutral-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-accent-500 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Contact me for a free consultation to discuss your podcast needs. I'll create a customized 
                    proposal tailored to your specific requirements and budget.
                  </p>
                  <Button asChild isAnimated>
                    <Link href="/contact">Request Custom Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Common questions about pricing and services
            </p>
          </FadeInUp>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[
              {
                question: "What does each episode package include?",
                answer:
                  "Each episode package includes audio editing, noise reduction, EQ and mastering, intro/outro music integration, and show notes. Higher tier packages include additional services like video editing, promotional materials, and distribution assistance."
              },
              {
                question: "How long does it take to produce an episode?",
                answer:
                  "Standard turnaround time is 3-5 business days from receiving your raw files. For rush jobs or custom timelines, please contact me to discuss availability and any additional fees."
              },
              {
                question: "Do you offer discounts for multiple episodes or long-term contracts?",
                answer:
                  "Yes! I offer package discounts for bulk episode orders and monthly retainer packages. Contact me for a custom quote based on your production volume and schedule."
              },
              {
                question: "What formats do you accept for raw recordings?",
                answer:
                  "I accept most common audio and video formats, including WAV, MP3, MP4, and MOV files. For best quality, I recommend recording in WAV format at 44.1kHz, 16-bit."
              },
              {
                question: "Do you provide revision rounds?",
                answer:
                  "All packages include two rounds of revisions. Additional revision rounds can be purchased if needed."
              },
              {
                question: "How do payments work?",
                answer:
                  "For new clients, I require a 50% deposit upfront with the remaining balance due upon project completion. Returning clients can set up monthly billing or pay per episode."
              }
            ].map((faq, index) => (
              <FadeInUp key={index} delay={index * 0.05}>
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </Section>

      {/* Satisfaction Guarantee */}
      <Section className="bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeInUp>
                <h2 className="text-3xl font-display font-bold mb-4">
                  100% Satisfaction Guarantee
                </h2>
                <p className="mb-6">
                  Your satisfaction is my top priority. If you're not completely happy with the final product,
                  I'll work with you until it meets your expectations.
                </p>
                <ul className="space-y-3">
                  {[
                    "Two rounds of revisions included",
                    "Clear communication throughout the process",
                    "Transparent pricing with no hidden fees",
                    "Quality results or your money back",
                  ].map((point, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-accent-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </FadeInUp>
            </div>
            <div className="flex justify-center">
              <FadeInUp delay={0.2}>
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                        100%
                      </p>
                      <p className="text-sm font-medium">Satisfaction Guaranteed</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Your Podcast Project?
            </h2>
            <p className="mb-8 text-white/90">
              Let's create professional podcast content that engages your audience and achieves your goals.
            </p>
            <Button
              asChild
              isAnimated
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </FadeInUp>
        </div>
      </Section>
    </main>
  );
}