import React from "react";
import { FadeInUp } from "../../../components/animations/fade-in-up";
import { Section } from "../../../components/ui/section";
import { StaggerContainer, StaggerItem } from "../../../components/animations/stagger-container";
import { ParallaxSection } from "../../../components/animations/parallax-section";
import { SKILLS, TOOLS } from "../../../lib/constants";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
              About Me
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
              Get to know the person behind the podcasts. With 4+ years of
              experience, I help creators, brands, and businesses produce
              high-quality audio and video content.
            </p>
          </FadeInUp>
        </div>
      </Section>

      {/* Bio Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeInUp>
              <h2 className="text-3xl font-display font-bold mb-6">
                My Journey
              </h2>
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                <p>
                  I'm Hridesh Sapkota, a professional podcast producer based in
                  Nepal. My journey into audio production began over 4 years ago
                  when I discovered my passion for storytelling through sound.
                </p>
                <p>
                  With a background in design, video editing, and audio
                  production, I bring a unique blend of creative and technical
                  skills to every project. My experience spans across various
                  podcast genres, from interview-style shows to narrative-driven
                  series.
                </p>
                <p>
                  I've helped dozens of podcasters elevate their production
                  quality, optimize their workflow, and grow their audience
                  through strategic content creation and distribution.
                </p>
              </div>
            </FadeInUp>
          </div>
          <div>
            <FadeInUp delay={0.2}>
              <div className="w-full h-96 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-inner flex items-center justify-center">
                {/* This would be an image in a real implementation */}
                <div className="text-4xl font-display font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
                  Hridesh Sapkota
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">My Skills</h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              A comprehensive set of podcast production capabilities
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((skill, index) => (
            <StaggerItem index={index} key={`skill-${index}`}>
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-500 font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg">{skill}</h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Tools Section */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Tools I Use
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Professional industry-standard software and equipment
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="flex flex-wrap justify-center gap-4">
          {TOOLS.map((tool, index) => (
            <StaggerItem index={index} key={`tool-${index}`}>
              <div className="bg-white dark:bg-neutral-800 px-6 py-3 rounded-full shadow-sm border border-neutral-100 dark:border-neutral-700">
                <span className="font-medium">{tool}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Experience Section */}
      <Section className="bg-neutral-900 text-white">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              My Experience
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-300">
              Years of dedicated podcast production expertise
            </p>
          </FadeInUp>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          <FadeInUp>
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="font-display font-bold text-xl mb-2">
                Freelance Podcast Producer
              </h3>
              <p className="text-accent-500 mb-4">2021 - Present</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>
                  Produced over 500 podcast episodes for various clients across
                  different niches
                </li>
                <li>
                  Specialized in interview-style shows, narrative podcasts, and
                  branded content
                </li>
                <li>
                  Developed efficient production workflows to deliver consistent,
                  high-quality content
                </li>
                <li>
                  Implemented audience growth strategies resulting in 200%+
                  listener increases
                </li>
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="font-display font-bold text-xl mb-2">
                Audio Engineer, Studio XYZ
              </h3>
              <p className="text-accent-500 mb-4">2019 - 2021</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>
                  Managed audio recording, editing, and production for podcasts
                  and radio shows
                </li>
                <li>
                  Collaborated with a team of producers to deliver polished
                  audio content
                </li>
                <li>
                  Developed expertise in advanced audio restoration and
                  enhancement techniques
                </li>
                <li>
                  Assisted in training junior staff on audio production best
                  practices
                </li>
              </ul>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="font-display font-bold text-xl mb-2">
                Video Editor, CreativeHub
              </h3>
              <p className="text-accent-500 mb-4">2017 - 2019</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>
                  Edited video content for digital marketing campaigns and social
                  media
                </li>
                <li>
                  Developed skills in visual storytelling and audience
                  engagement
                </li>
                <li>
                  Collaborated with content creators to optimize video formats
                  for different platforms
                </li>
                <li>
                  Gained expertise in motion graphics and visual effects
                </li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </Section>

      {/* Values Section */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">My Values</h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              The principles that guide my work and client relationships
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeInUp delay={0.1}>
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                I never compromise on quality. Every project receives meticulous
                attention to detail, ensuring professional results that exceed
                expectations.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Deadlines matter in podcasting. I pride myself on consistent,
                timely delivery that keeps your publishing schedule on track and
                your audience engaged.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Client Partnership</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                I believe in building collaborative relationships. Your vision is
                my priority, and I work closely with you to understand your goals
                and bring them to life.
              </p>
            </div>
          </FadeInUp>
        </div>
      </Section>

      {/* CTA Section */}
      <ParallaxSection
        className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20"
        offset={50}
      >
        <div className="text-center">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Create Amazing Audio?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Let's work together to bring your podcast vision to life with professional
              production that engages your audience.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-accent-500 text-white hover:bg-accent-600 h-11 px-8 py-2"
            >
              Get in Touch
            </a>
          </FadeInUp>
        </div>
      </ParallaxSection>
    </main>
  );
}