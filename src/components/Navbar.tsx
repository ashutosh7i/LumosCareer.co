"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { getUserData, logout } from "@/lib/appwrite";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import logo from "../../public/static/images/logo.png";
import { useAuth } from "@/lib/AuthContext";
import PeerlistMedal from "../../public/static/images/peerlist/medal.svg";
import { siteConfig } from "@/config/site";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" prefetch={false}>
            <Image src={logo} alt="image" height={"30"} />
          </Link>
          <Image
            onClick={() => {
              router.push(
                "https://peerlist.io/vinayakgavariya/project/lumoscareer"
              );
            }}
            src={PeerlistMedal}
            alt="image"
            height={"50"}
          />
          <span className="sr-only">lumos career</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}

          {/* <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="https://github.com/ashutosh7i/lumos-carrier"
            className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="https://github.com/ashutosh7i/lumos-carrier"
            className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Contact
          </Link> */}
          {isLoggedIn ? (
            <>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Login
            </Link>
          )}
          <ModeToggle />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Login
                </Link>
              )}
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};

export default Navbar;

// ... rest of the code

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
