"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import ReactPlayer from "react-player/lazy";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronRightIcon, Hammer, NotebookPen } from "lucide-react";
import Star from "@/components/star/star";
import { useAuth } from "@/lib/AuthContext";

import appwrite from "../../public/static/images/appwrite.svg";
import azure from "../../public/static/images/azure.png";
import gemeni from "../../public/static/images/gemeni.png";
import next from "../../public/static/images/next.svg";
import nginx from "../../public/static/images/nginx.png";
import react from "../../public/static/images/react.svg";
import ubuntu from "../../public/static/images/ubuntu.png";
import vercel from "../../public/static/images/vercel.svg";
import peerlistBanner from "../../public/static/images/peerlist/banner.png";

const Steps = [
  {
    index: 1,
    title: "summarize JD",
    description: "We summarize the job description for you",
    href: "#",
    bg_color: "bg-red-500",
  },
  {
    index: 2,
    title: "analyze resume",
    description: "We analyze your resume and provide feedback",
    href: "#",
    bg_color: "bg-yellow-500",
  },
  {
    index: 3,
    title: "generate resume",
    description: "We generate a resume for you based on the JD",
    href: "#",
    bg_color: "bg-green-500",
  },
  {
    index: 4,
    title: "generate cover letter",
    description: "We generate a cover letter for you based on the JD",
    href: "#",
    bg_color: "bg-purple-500",
  },
  {
    index: 5,
    title: "generate cold email",
    description: "We generate a cold email for you based on the JD",
    href: "#",
    bg_color: "bg-blue-500",
  },
  {
    index: 6,
    title: "interview prep",
    description: "We provide you with interview preparation guide",
    href: "#",
    bg_color: "bg-pink-500",
  },
];

const Cards = [
  {
    title: "Analyze",
    description: "We analyze your resume, JD & provide feedback",
    icon: <BarChart3 size={50} />,
    bg_color: "bg-orange-500",
  },
  {
    title: "Generation",
    description: "We generate a new resume, cover-letter & cold-email for you",
    icon: <Hammer size={50} />,
    bg_color: "bg-green-500",
  },
  {
    title: "Prepare",
    description:
      "We help you prepare for the interview with a customised guide",
    icon: <NotebookPen size={50} />,
    bg_color: "bg-purple-500",
  },
];

export default function Hero() {
  const router = useRouter();
  const { user } = useAuth();

  const Strings = [
    "lumos🪄 career✨",
    "lumos🪄 help✨",
    "lumos🪄 analyze resume✨",
    "lumos🪄 craft Resume✨",
    "lumos🪄 summarize JD✨",
    "lumos🪄 craft Cover letter✨",
  ];

  function handleGetStarted() {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  function scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId) as HTMLElement;
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Hero */}
      <div>
        <div className="container py-16 lg:py-32 px-4 md:px-8">
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              <ReactTyped
                strings={Strings}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
              <br />
            </h1>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg sm:text-xl text-muted-foreground">
              Transfigure Yourself Into An Outstanding Candidate🌟
            </p>
            <br />
            <p className="text-sm sm:text-md text-muted-foreground">
              LumosCareer offers a comprehensive suite of tools to streamline
              your job and internship applications. From resume analysis and JD
              summaries to custom cover letters and interview prep, we help you
              shine as the ideal candidate.😉.
            </p>
            <br />
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex flex-col sm:flex-row justify-center items-center">
            <div
              onClick={handleGetStarted}
              className="bg-background text-white dark:bg-background dark:text-gray-200 p-3 rounded-md cursor-pointer"
            >
              <Star />
            </div>
            <Button
              size={"lg"}
              variant="secondary"
              onClick={() => scrollToSection("learn-more-section")}
            >
              Learn more🤔
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <a
              className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
              href="#"
              onClick={() => scrollToSection("video-section")}
            >
              Usage Guide
              <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}

      {/* Learn More Section */}
      <div id="learn-more-section" className="container px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Learn More About LumosCareer
          </h2>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground">
            {
              "LumosCareer is your comprehensive toolkit for transforming yourself into an outstanding candidate. Whether you're applying for jobs or internships, we streamline every step of your application process.Our suite of tools offers resume analysis, job description summaries, resume and cover letter generation, and interview preparation, ensuring you shine in every application."
            }
          </p>
        </div>
        <br />
        <section className="bg-white dark:bg-gray-900">
          <div className="pt-8 px-4 mx-auto max-w-screen-xl lg:pt-8">
            {" "}
            {/* Changed py-8 to pt-8 */}
            <div className="grid md:grid-cols-3 gap-8">
              {Cards.map((step) => (
                <div
                  key={step.title}
                  className={`${step.bg_color} border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8`}
                >
                  <div className="text-background w-12 h-12 pb-6">
                    {" "}
                    {/* Adjusted icon size with width and height */}
                    {step.icon}
                  </div>
                  <h2 className="hover:underline font-medium text-2xl text-secondary inline-flex items-center">
                    {step.title}
                  </h2>
                  <p className="text-xl font-normal text-secondary mb-4">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* End Learn More Section */}

      {/* Video Section */}
      <div id="video-section" className="container py-16 lg:py-16 px-4 md:px-8">
        <div className="mt-6 md:mt-12 py-3 flex justify-center items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
          <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
            Learn more
          </span>
          watch this video
        </div>
        <div className="flex justify-center">
          <ReactPlayer url="https://www.youtube.com/watch?v=0R-yGD9WGCI" />
        </div>
      </div>
      {/* End Video Section */}

      {/* Clients */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-12 lg:gap-x-4 justify-center">
        <div className="container py-16 lg:py-16 px-4 md:px-8">
          <div className="mt-6 md:mt-12 py-3 flex items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
            <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
              Steps to follow
            </span>
            to use LumosCareer🪄
          </div>
          <br />
          <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-12 lg:gap-x-4 justify-center">
            <section id="works" className="relative  py-10 sm:py-16 lg:py-24">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-xl text-primary font-extrabold mx-auto md:text-6xl lg:text-5xl">
                    How to use?
                  </h2>
                  <p className="max-w-2xl mx-auto mt-4 text-base text-foreground leading-relaxed md:text-2xl">
                    Our AI solution will help you from start to finish
                  </p>
                </div>
                <div className="relative mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                    <Image
                      alt=""
                      loading="lazy"
                      width="1000"
                      height="500"
                      decoding="async"
                      data-nimg="1"
                      className="w-full"
                      style={{ color: "transparent" }}
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                    />
                  </div>
                  <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                    {Steps.map((step) => (
                      <div key={step.index}>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-secondary-foreground border-2 border-primary rounded-full shadow">
                          <span className="text-xl font-semibold text-secondary">
                            {step.index}
                          </span>
                        </div>
                        <h3 className="mt-6 text-xl text-primary font-semibold leading-tight md:mt-10">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-base text-gray-400 md:text-lg">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
                style={{
                  background:
                    "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
                }}
              ></div>
            </section>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="container py-16 lg:py-16 pb-10 px-4 md:px-8">
        <div className="mt-6 md:mt-12 py-3 flex items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
          <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
            Achievements we have
          </span>
          at LumosCareer🪄
        </div>
        <br />
        {/* Clients */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-12 lg:gap-x-4 justify-center">
          <div className="flex justify-center">
            <Image
              src={peerlistBanner}
              // height={300}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="containerpy-16 lg:py-16 pb-10 px-4 md:px-8">
        <div className="mt-6 md:mt-12 py-3 flex items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
          <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
            Technologies we use
          </span>
          at LumosCareer🪄
        </div>
        <br />
        {/* Clients */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-12 lg:gap-x-4 justify-center">
          <div className="flex justify-center">
            <Image
              src={appwrite}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={azure}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={gemeni}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={next}
              height={25}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={nginx}
              height={25}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={react}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={ubuntu}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={vercel}
              height={30}
              alt="Picture of the author"
              className="mb-4 sm:mb-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}
