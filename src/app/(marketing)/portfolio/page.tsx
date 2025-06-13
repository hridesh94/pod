import React from "react";
import { FadeInUp } from "../../../components/animations/fade-in-up";
import { Section } from "../../../components/ui/section";
import { StaggerContainer, StaggerItem } from "../../../components/animations/stagger-container";
import { Button } from "../../../components/ui/button";
import { AudioWaveform, ReactiveAudioWaveform } from "../../../components/animations/audio-waveform";
import Link from "next/link";

// Mock data - in a real app, this would come from the Sanity CMS
const portfolioItems = [
  {
    id: 1,
    title: "The Business Mindset Podcast",
    client: "Sarah Johnson",
    description: "A weekly interview show featuring entrepreneurs and business leaders sharing their journey and insights.",
    tags: ["Interview", "Business", "Audio & Video"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: true,
  },
  {
    id: 2,
    title: "Tech Talk Weekly",
    client: "Michael Chen",
    description: "A tech news and analysis podcast covering the latest in technology and digital trends.",
    tags: ["Tech", "News", "Audio Only"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: true,
  },
  {
    id: 3,
    title: "Mindful Entrepreneurship",
    client: "Lisa Patel",
    description: "Exploring the intersection of mindfulness practices and entrepreneurship.",
    tags: ["Wellness", "Business", "Audio & Video"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: true,
  },
  {
    id: 4,
    title: "History Uncovered",
    client: "David Wilson",
    description: "Diving deep into historical events and their impact on our modern world.",
    tags: ["Education", "History", "Audio Only"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: false,
  },
  {
    id: 5,
    title: "Future Finance",
    client: "Emma Roberts",
    description: "Exploring cryptocurrency, blockchain, and the future of financial systems.",
    tags: ["Finance", "Tech", "Audio & Video"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: false,
  },
  {
    id: 6,
    title: "Travel Stories",
    client: "James and Maya",
    description: "A couple sharing their adventures and travel stories from around the world.",
    tags: ["Travel", "Lifestyle", "Audio Only"],
    thumbnailUrl: "",
    audioUrl: "",
    videoUrl: "",
    featured: false,
  },
];

// Filter for featured items
const featuredItems = portfolioItems.filter((item) => item.featured);

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInUp>
            <h1 className="text-hero font-display font-bold text-neutral-900 dark:text-white mb-6">
              Portfolio
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-200">
              Explore my podcast production work across various genres and formats
            </p>
          </FadeInUp>
        </div>
      </Section>

      {/* Featured Work */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Featured Work
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Highlighted podcast productions that showcase my skills and versatility
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {featuredItems.map((item, index) => (
            <FadeInUp key={item.id} delay={index * 0.1}>
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto bg-gradient-to-br from-primary-900 to-primary-500 flex items-center justify-center">
                    {/* This would be an image or video in a real implementation */}
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-primary-50 dark:bg-neutral-700 text-primary-700 dark:text-primary-300 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                      Client: {item.client}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button asChild variant="outline" className="mr-4">
                        <Link href={`/portfolio/${item.id}`}>View Details</Link>
                      </Button>
                      <AudioWaveform
                        className="h-8 w-32"
                        barCount={12}
                        barWidth={2}
                        barGap={1}
                        barMinHeight={3}
                        barMaxHeight={15}
                        color="#3b82f6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Section>

      {/* All Portfolio Items */}
      <Section className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              All Projects
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              Browse my complete portfolio of podcast production work
            </p>
          </FadeInUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <StaggerItem index={index} key={`portfolio-${item.id}`}>
              <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                  {/* This would be an image in a real implementation */}
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-primary-50 dark:bg-neutral-700 text-primary-700 dark:text-primary-300 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    {item.client}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-1 text-sm">
                    {item.description.length > 80
                      ? `${item.description.substring(0, 80)}...`
                      : item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="text-primary-500 hover:underline"
                    >
                      View Details
                    </Link>
                    <AudioWaveform
                      className="h-6 w-24"
                      barCount={8}
                      barWidth={2}
                      barGap={1}
                      barMinHeight={2}
                      barMaxHeight={8}
                      color="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Client Feedback
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              What my clients say about working with me
            </p>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.1}>
          <div className="bg-neutral-900 text-white p-10 rounded-xl shadow-lg max-w-4xl mx-auto relative">
            <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <div className="mt-6">
              <p className="text-xl italic mb-6">
                "Working with Hridesh has been transformative for our podcast. His attention to detail,
                technical expertise, and creative input have elevated our show to a professional level
                that our audience consistently praises. Beyond the technical aspects, his understanding
                of storytelling and audience engagement has been invaluable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                  <span className="font-bold text-white">SJ</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Sarah Johnson</h4>
                  <p className="text-neutral-300">Host, Business Breakthrough Podcast</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </Section>

      {/* Process Overview */}
      <Section className="bg-neutral-50 dark:bg-neutral-800">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              My Work Process
            </h2>
            <p className="max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300">
              How I approach each podcast production project
            </p>
          </FadeInUp>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Discovery",
                description:
                  "Understanding your goals, audience, and vision for the podcast",
                icon: "🎯",
              },
              {
                title: "Planning",
                description:
                  "Creating a detailed production plan and timeline",
                icon: "📝",
              },
              {
                title: "Production",
                description:
                  "Recording, editing, and enhancing your podcast content",
                icon: "🎙️",
              },
              {
                title: "Distribution",
                description:
                  "Publishing and promoting your podcast to reach your audience",
                icon: "🚀",
              },
            ].map((step, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-2xl">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Create Your Podcast?
            </h2>
            <p className="mb-8 text-white/90">
              Let's work together to bring your podcast vision to life with professional production.
            </p>
            <Button
              asChild
              isAnimated
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </FadeInUp>
        </div>
      </Section>
    </main>
  );
}