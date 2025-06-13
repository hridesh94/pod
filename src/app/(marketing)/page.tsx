"use client";

import React from "react";
import { FadeInUp } from "../../components/animations/fade-in-up";
import { Button } from "../../components/ui/button";
import { Section } from "../../components/ui/section";
import { StaggerContainer, StaggerItem } from "../../components/animations/stagger-container";
import Link from "next/link";
import { SERVICES, TESTIMONIALS, PRICING, PROCESS_STEPS } from "../../lib/constants";
import { ParallaxSection } from "../../components/animations/parallax-section";
import { AudioWaveform } from "../../components/animations/audio-waveform";
import { Header } from "../../components/sections/header";
import { Footer } from "../../components/sections/footer";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ProcessStep } from "@/components/ui/process-step";
import { ProcessTimeline } from "@/components/animations/process-timeline";
import { SubwayProcessTimeline } from "@/components/animations/subway-process-timeline";
import { SubwayProcessStep } from "@/components/ui/subway-process-step";
import { useProcessScroll } from "@/lib/hooks/use-process-scroll";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { generateJsonLd } from './metadata';
import { JsonLdScript } from '@/components/shared/json-ld-script';
import { HorizontalProcessTimeline } from "../../components/animations/horizontal-process-timeline";

export default function HomePage() {
  const jsonLdData = generateJsonLd();
  // Track active process steps based on scroll position
  const activeSteps = useProcessScroll(PROCESS_STEPS.length);
  
  return (
    <main>
      <JsonLdScript data={jsonLdData} />
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeInUp>
              <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
                Hi, I am Hridesh Sapkota
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
                A freelance podcast producer with 4+ years of experience in
                helping clients plan, craft and publish their podcast in both
                audio and visual format.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button isAnimated>Start a Project</Button>
                </Link>
                <Link href="/portfolio">
                  <Button isAnimated variant="outline">View Portfolio</Button>
                </Link>
              </div>
            </FadeInUp>
          </div>
          <div className="relative">
            <FadeInUp delay={0.3}>
              <div className="relative w-full h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl overflow-hidden shadow-xl">
                {/* This would be an image or animation in a real implementation */}
                <div className="absolute bottom-6 left-0 w-full px-8">
                  <AudioWaveform
                    className="h-24"
                    color="rgba(255, 255, 255, 0.7)"
                    barCount={48}
                    barWidth={3}
                    barGap={2}
                    barMinHeight={5}
                    barMaxHeight={40}
                  />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeInUp>
              <div className="w-full h-80 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-inner flex items-center justify-center">
                {/* This would be an image in a real implementation */}
                <div className="text-4xl font-display font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
                  4+ Years Experience
                </div>
              </div>
            </FadeInUp>
          </div>
          <div className="order-1 lg:order-2">
            <FadeInUp>
              <h2 className="text-3xl font-display font-bold mb-6">About Me</h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                I'm a podcast production specialist with extensive experience in
                audio editing, video production, and podcast strategy. My
                background in design and audio engineering allows me to create
                polished, professional podcasts that stand out.
              </p>
              <p className="mb-6 text-neutral-700 dark:text-neutral-300">
                Working with creators, businesses, and brands, I help bring their
                stories to life through high-quality podcast production. My goal
                is to make the podcasting process seamless while delivering
                exceptional results.
              </p>
              <Button asChild variant="outline">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </FadeInUp>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">My Services</h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              I offer comprehensive podcast production services to help you
              create, edit, and distribute high-quality content.
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.id} index={index}>
              <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 dark:bg-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  {/* This would be an icon in a real implementation */}
                  <div className="w-6 h-6 bg-primary-500 rounded-md"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  className="text-primary-500 hover:underline font-medium inline-flex items-center"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <FadeInUp>
            <Button asChild variant="outline">
              <Link href="/services">View All Services</Link>
            </Button>
          </FadeInUp>
        </div>
      </Section>

      {/* Process Section - Updated with horizontal timeline */}
      <Section id="process" className="bg-white dark:bg-neutral-900 overflow-hidden relative">
        <div className="text-center mb-12">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">My Production Process</h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              A streamlined 6-step framework that transforms your podcast vision into professional reality
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 rounded-full"></div>
          </FadeInUp>
        </div>

        <div className="relative max-w-full mx-auto">
          <HorizontalProcessTimeline />
        </div>
      </Section>

      {/* Portfolio Preview Section */}
      <Section id="portfolio" className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-white to-accent-300">
                Featured Work
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-300">
              Recent podcast productions that showcase my expertise
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-6 rounded-full"></div>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Business Breakthrough", 
              type: "Interview Series", 
              color: "from-accent-500 to-accent-600",
              bgAccent: "bg-amber-300",
              icon: "🎙️",
              description: "Weekly interviews with successful entrepreneurs"
            },
            { 
              title: "Tech Talk Weekly", 
              type: "Audio & Video Podcast", 
              color: "from-primary-400 to-primary-500",
              bgAccent: "bg-sky-300",
              icon: "💻",
              description: "In-depth discussions on emerging technologies"
            },
            { 
              title: "Mindful Entrepreneurship", 
              type: "Narrative Podcast", 
              color: "from-purple-500 to-purple-600",
              bgAccent: "bg-purple-300",
              icon: "🧠",
              description: "Stories of founders balancing success & wellbeing"
            }
          ].map((project, index) => (
            <StaggerItem key={index}>
              {/* Import motion from Framer Motion at top of file */}
              <div 
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-neutral-800 h-full"
              >
                {/* Project Visual - More vibrant with clear contrast */}
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative p-4 overflow-hidden`}>
                  {/* Enhanced lighting effects */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_60%)]"></div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${project.bgAccent} opacity-20 blur-xl`}></div>
                  <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full ${project.bgAccent} opacity-10 blur-xl`}></div>
                  
                  {/* Icon with animated background glow on hover */}
                  <div className="relative z-10 transform transition-transform group-hover:scale-110 duration-300">
                    <div className={`absolute inset-0 ${project.bgAccent} opacity-20 rounded-full blur-md scale-90 group-hover:scale-125 group-hover:opacity-40 transition-all duration-300`}></div>
                    <span className="text-6xl relative z-10">{project.icon}</span>
                  </div>
                </div>
                
                {/* Content Area - More readable with better contrast */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-1 text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-100 dark:border-neutral-700">
                    <Link
                      href="/portfolio"
                      className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
                    >
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <AudioWaveform
                      className="h-6 w-16"
                      barCount={6}
                      barWidth={2}
                      barGap={2}
                      barMinHeight={2}
                      barMaxHeight={10}
                      color="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-14 text-center">
          <FadeInUp>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Button 
                asChild 
                isAnimated 
                variant="secondary" 
                className="px-5 py-2 text-sm font-medium shadow-md group"
              >
                <Link href="/portfolio" className="flex items-center">
                  <span>View Full Portfolio</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </FadeInUp>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Here's what my clients have to say about my work
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <StaggerItem key={testimonial.id} index={index}>
              <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md border border-neutral-100 dark:border-neutral-700">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        starIndex < testimonial.rating
                          ? "text-accent-500"
                          : "text-neutral-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-neutral-700 flex items-center justify-center">
                    <span className="font-medium text-primary-500 dark:text-primary-400">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Pricing Preview Section */}
      <Section id="pricing" className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Pricing Plans
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Transparent pricing with options for every need
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((plan, index) => (
            <StaggerItem key={plan.id} index={index}>
              <div
                className={`bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
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
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {" "}
                      / Episode
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-neutral-700 dark:text-neutral-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-500 mr-2"
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

        <div className="mt-8 text-center">
          <FadeInUp>
            <p className="text-neutral-600 dark:text-neutral-400">
              Customized plans available as per need. 
              <Link
                href="/contact"
                className="text-primary-500 hover:underline ml-1"
              >
                Contact me
              </Link>{" "}
              for details.
            </p>
          </FadeInUp>
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section
        id="cta"
        className="bg-gradient-to-br from-primary-900 to-primary-700 text-white"
      >
        <div className="text-center">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Your Podcast Journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Let's work together to create a professional podcast that engages
              your audience and achieves your goals.
            </p>
            <Button
              asChild
              isAnimated
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </FadeInUp>
        </div>
      </Section>
    </main>
  );
}