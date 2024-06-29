"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/static/images/logo.png";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 inset-x-0 bottom-0">
      <div className="mx-auto w-full max-w-screen-xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <a
              href={siteConfig.links.github}
              className="flex items-center mb-2"
            >
              <Image src={logo} alt="Logo" height={30} />
            </a>
            <span className="text-sm text-gray-500 text-center md:text-left dark:text-gray-400">
              © 2024{" "}
              <a href={siteConfig.links.github} className="hover:underline">
                {siteConfig.name}™
              </a>
              <br />
              made with ❤️ by{" "}
              <a
                href="https://github.com/ashutosh7i"
                className="hover:underline"
              >
                @ashutosh7i
              </a>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Our Team
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {siteConfig.Team.map((member) => (
                  <li key={member.name} className="mb-4 flex items-center">
                    <div className="mr-2 flex-shrink-0">
                      <Image
                        src={`${member.github}.png`}
                        alt={member.name}
                        height={25}
                        width={25}
                        className="rounded-full"
                      />
                    </div>
                    <a href={member.github} className="hover:underline">
                      {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Learn More
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href={siteConfig.links.ourStory}
                    className="hover:underline"
                  >
                    Our Story
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href={siteConfig.links.spotlight}
                    className="hover:underline"
                  >
                    Peerlist Spotlight
                  </a>
                </li>
                <li>
                  <a href={siteConfig.links.github} className="hover:underline">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
