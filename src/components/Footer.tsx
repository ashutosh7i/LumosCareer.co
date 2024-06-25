"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/static/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 inset-x-0 bottom-0">
      <div className="mx-auto w-full max-w-screen-xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <a
              href="https://github.com/ashutosh7i/lumoscarrier.co"
              className="flex items-center mb-2"
            >
              <Image src={logo} alt="Logo" height={30} />
              {/* <span className="ml-3 text-2xl font-semibold dark:text-white">
                lumos carrier🪄🧑‍💼™
              </span> */}
            </a>
            <span className="text-sm text-gray-500 text-center md:text-left dark:text-gray-400">
              © 2024{" "}
              <a
                href="https://github.com/ashutosh7i/lumoscarrier.co"
                className="hover:underline"
              >
                lumos carrier🪄🧑‍💼™
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
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/ashutosh7i/lumoscarrier.co"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ashutosh7i/lumoscarrier.co"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
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
