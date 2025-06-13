import React from "react";
import { FadeInUp } from "../../../components/animations/fade-in-up";
import { Section } from "../../../components/ui/section";
import { StaggerContainer, StaggerItem } from "../../../components/animations/stagger-container";
import { ParallaxSection } from "../../../components/animations/parallax-section";
import { Button } from "../../../components/ui/button";
import { SERVICES, SKILLS, TOOLS } from "../../../lib/constants";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
              Services
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
              Comprehensive podcast production services to help you create,
              launch, and grow your podcast
            </p>
          </FadeInUp>
        </div>
      </Section>

      {/* Core Services Section */}
      <Section id="core-services">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Core Services
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              From initial concept to final distribution, I handle every aspect
              of podcast production
            </p>
          </FadeInUp>
        </div>

        <div className="space-y-16">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <FadeInUp>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? "order-1 lg:order-2" : ""}>
                    <h3 className="text-2xl font-display font-bold mb-4">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-neutral-700 dark:text-neutral-300">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-8">
                      {index === 0 && (
                        <>
                          <div>
                            <h4 className="font-medium mb-2">
                              Setting up your podcast includes:
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                              <li>Concept development and podcast strategy</li>
                              <li>Branding and visual identity creation</li>
                              <li>Equipment recommendations and setup</li>
                              <li>
                                Platform selection and distribution planning
                              </li>
                              <li>Episode structure and format development</li>
                            </ul>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div>
                            <h4 className="font-medium mb-2">
                              Recording and editing includes:
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                              <li>Professional audio editing and mixing</li>
                              <li>
                                Noise reduction and audio quality enhancement
                              </li>
                              <li>
                                Music and sound effect integration
                              </li>
                              <li>Video editing for video podcasts</li>
                              <li>Show notes and transcript creation</li>
                            </ul>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div>
                            <h4 className="font-medium mb-2">
                              Distribution and marketing includes:
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                              <li>Publishing to podcast platforms</li>
                              <li>
                                Audiogram and promotional content creation
                              </li>
                              <li>
                                Social media content strategy
                              </li>
                              <li>SEO optimization for maximum visibility</li>
                              <li>Growth strategy and audience engagement</li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "order-2 lg:order-1" : ""}>
                    <div className="w-full h-80 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-inner flex items-center justify-center">
                      {/* This would be an image in a real implementation */}
                      <div className="w-16 h-16 bg-primary-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          ))}
        </div>
      </Section>

      {/* Detailed Skills Section */}
      <Section id="skills" className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Detailed Skills
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Specialized expertise to make your podcast stand out
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((skill, index) => (
            <FadeInUp key={index} delay={index * 0.05}>
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm flex items-start">
                <div className="w-10 h-10 bg-primary-100 dark:bg-neutral-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-primary-500 dark:text-primary-300 font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{skill}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    {getSkillDescription(skill)}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* Tools Section */}
      <Section id="tools">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Professional Tools
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Industry-standard software and equipment for exceptional results
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool, index) => (
            <StaggerItem index={index} key={`tool-${index}`}>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary-500 dark:text-primary-300 font-bold">
                      {tool.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium">{tool}</h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Process Overview */}
      <Section id="process" className="bg-neutral-900 text-white">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              My Production Process
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-300">
              A streamlined approach to creating exceptional podcasts
            </p>
          </FadeInUp>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <FadeInUp>
              <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-bold mb-4">1. Initial Consultation</h3>
                <p className="text-neutral-300">
                  We'll discuss your podcast concept, target audience, goals, and technical requirements. This helps me understand your vision and create a customized production plan.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-accent-500">
                <h3 className="text-xl font-bold mb-4">2. Planning & Pre-Production</h3>
                <p className="text-neutral-300">
                  I'll create a detailed production schedule, help refine your episode structure, and prepare all the necessary elements before recording begins.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-bold mb-4">3. Recording & Editing</h3>
                <p className="text-neutral-300">
                  After recording your content, I'll edit the audio/video to professional standards, enhance sound quality, add music and sound effects, and ensure a polished final product.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-accent-500">
                <h3 className="text-xl font-bold mb-4">4. Review & Revisions</h3>
                <p className="text-neutral-300">
                  You'll review the edited episode and request any revisions. I offer up to two rounds of revisions to ensure you're completely satisfied with the final product.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-bold mb-4">5. Publishing & Promotion</h3>
                <p className="text-neutral-300">
                  Once approved, I'll help publish your episode, create promotional assets like audiograms and graphics, and implement distribution strategies to maximize your reach.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Your Podcast Journey?
            </h2>
            <p className="mb-8 text-white/90">
              Let's work together to create a professional podcast that engages
              your audience and achieves your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                isAnimated
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button
                asChild
                isAnimated
                variant="outline"
                className="px-8 py-6 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </Section>
    </main>
  );
}

// Helper function to provide descriptions for each skill
function getSkillDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    "High Quality Audio & Video Editing": "Professional editing to create clear, engaging, and polished podcast content with perfect pacing and flow.",
    "Audio Restoration EQ and Mastering": "Advanced techniques to enhance audio quality, remove noise, and ensure consistent levels across episodes.",
    "Sound Design and SFXs": "Creative use of music, sound effects, and audio elements to enhance storytelling and listener engagement.",
    "Graphics and Thumbnails": "Eye-catching visual assets that align with your brand and help your podcast stand out on platforms.",
    "Website Maintenance": "Keeping your podcast website updated with fresh content, episode listings, and optimized for discoverability.",
    "Short Form Content": "Creating bite-sized clips and highlights for social media promotion and audience growth.",
    "Show-notes and Transcript": "Detailed episode descriptions, timestamps, and full transcripts to improve accessibility and SEO.",
    "Equipment Recommendation and Setup": "Expert advice on selecting and configuring the right microphones, interfaces, and recording equipment.",
    "Formatting a Show and Scripting": "Developing consistent episode structures, intros/outros, and content outlines for cohesive presentation.",
    "SEO Optimization and Distribution": "Strategic keyword optimization and distribution to maximize your podcast's discoverability and reach.",
  };
  
  return descriptions[skill] || "Professional expertise to enhance your podcast production quality.";
}