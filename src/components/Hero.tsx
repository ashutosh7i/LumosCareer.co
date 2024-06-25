"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import ReactPlayer from "react-player/lazy";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
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
      <div
        id="learn-more-section"
        className="container py-16 lg:py-32 px-4 md:px-8"
      >
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
      </div>
      {/* End Learn More Section */}

      {/* Video Section */}
      <div id="video-section" className="container py-16 lg:py-32 px-4 md:px-8">
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

      {/* Clients Section */}
      <div className="container py-16 lg:py-32 pb-10 px-4 md:px-8">
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
      <div className="container py-16 lg:py-32 pb-10 px-4 md:px-8">
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
