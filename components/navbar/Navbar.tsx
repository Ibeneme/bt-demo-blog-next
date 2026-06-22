"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../assests/images/logo_a.png";

interface SubLink {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: SubLink[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationData: NavItem[] = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "/about", hasDropdown: false },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        {
          title: "ADHD Testing",
          description:
            "Comprehensive evaluation for focus and executive function.",
          href: "/services/adhd",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          title: "Autism (ASD) Testing",
          description:
            "Specialized diagnostic assessments for neurodivergence.",
          href: "/services/asd",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          title: "Psychoeducational",
          description: "Expert testing for dyslexia and learning needs.",
          href: "/services/psychoed",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          ),
        },
        {
          title: "Neuropsychological",
          description: "Advanced neurological and cognitive assessments.",
          href: "/services/neuro",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ),
        },
        {
          title: "Psychological Assessments",
          description: "Broad evaluations for emotional and behavioral health.",
          href: "/services/assessments",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          ),
        },
        {
          title: "MMPI-3 Testing",
          description: "Standardized personality and psychopathology testing.",
          href: "/services/mmpi",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          ),
        },
        {
          title: "Additional Services",
          description: "Consultations and parent management training.",
          href: "/services/additional",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ),
        },
      ],
    },
    { name: "Blog", href: "/blog", hasDropdown: false },
    {
      name: "Locations",
      href: "/locations",
      hasDropdown: true,
      dropdownItems: [
        {
          title: "Dallas HQ Office",
          description:
            "Our main comfortable therapeutic facility in Dallas, Texas.",
          href: "/locations/dallas-hq",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  const isItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.hasDropdown && item.dropdownItems) {
      return item.dropdownItems.some((subItem) => pathname === subItem.href);
    }
    return false;
  };

  const handleLinkClick = (item: NavItem) => {
    if (item.hasDropdown) {
      setActiveDropdown(activeDropdown === item.name ? null : item.name);
    } else {
      setActiveDropdown(null);
      setIsOpen(false);
    }
  };

  // NEW LOGIC: Dark green background on all pages except home (/)
  const isHome = pathname === "/";
  const shouldHaveSolidBg = !isHome || isScrolled || isOpen;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldHaveSolidBg
          ? "bg-[#023B37] backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-[#023B37]/40 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={logo}
                alt="ARIAD Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col border-l border-white/20 pl-3">
              <span className="text-sm md:text-md font-black tracking-tight text-white uppercase leading-none">
                ARIAD
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#067F76] font-extrabold mt-1">
                Psychological
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navigationData.map((item) => {
              const active = isItemActive(item);
              return (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => handleLinkClick(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                        active
                          ? "bg-white/10 text-[#67E8D6] font-bold"
                          : activeDropdown === item.name
                          ? "bg-white/5 text-white"
                          : "text-slate-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${
                          activeDropdown === item.name
                            ? "rotate-180 text-[#067F76]"
                            : "text-slate-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                        active
                          ? "bg-white/10 text-[#67E8D6] font-bold"
                          : "text-slate-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[360px] bg-[#023B37]/95 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl shadow-black/60">
                      <div className="grid gap-1">
                        {item.dropdownItems?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`flex items-start gap-3.5 p-3 rounded-xl group transition-all duration-300 ${
                                isSubActive ? "bg-white/10" : "hover:bg-white/5"
                              }`}
                            >
                              <div
                                className={`mt-0.5 p-2 rounded-xl border transition-all duration-300 ${
                                  isSubActive
                                    ? "bg-[#067F76] border-[#067F76]/50 text-white"
                                    : "bg-white/5 border-white/10 group-hover:border-[#067F76]/50 text-[#067F76]"
                                }`}
                              >
                                {sub.icon}
                              </div>
                              <div>
                                <h4
                                  className={`text-sm font-bold transition-colors ${
                                    isSubActive
                                      ? "text-[#67E8D6]"
                                      : "text-white group-hover:text-[#fff]"
                                  }`}
                                >
                                  {sub.title}
                                </h4>
                                <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                                  {sub.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Consultation Action Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-5 py-2.5 bg-[#067F76] hover:bg-[#056b63] active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-[#023B37]/30"
            >
              Consultation
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-20 bg-slate-950/60 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#023B37] border-b border-white/10 max-h-[calc(100vh-80px)] overflow-y-auto z-50">
            <div className="px-4 pt-4 pb-8 space-y-3">
              {navigationData.map((item) => {
                const active = isItemActive(item);
                return (
                  <div
                    key={item.name}
                    className="border-b border-white/5 pb-3 last:border-none"
                  >
                    {item.hasDropdown ? (
                      <button
                        onClick={() => handleLinkClick(item)}
                        className={`w-full flex justify-between items-center py-3 text-base font-bold transition-colors ${
                          active || activeDropdown === item.name
                            ? "text-[#67E8D6]"
                            : "text-white"
                        }`}
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 text-base font-bold transition-colors ${
                          active
                            ? "text-[#67E8D6]"
                            : "text-white hover:text-[#067F76]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}

                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="pl-6 space-y-3 pt-2">
                        {item.dropdownItems?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => {
                                setIsOpen(false);
                                setActiveDropdown(null);
                              }}
                              className={`flex gap-3 p-2 rounded-xl transition-all ${
                                isSubActive
                                  ? "bg-white/10"
                                  : "hover:bg-white/5 active:bg-white/10"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg flex-shrink-0 border ${
                                  isSubActive
                                    ? "bg-[#067F76] border-[#067F76]/40 text-white"
                                    : "bg-white/5 text-[#067F76] border-white/10"
                                }`}
                              >
                                {sub.icon}
                              </div>
                              <div>
                                <h4
                                  className={`font-bold transition-colors ${
                                    isSubActive
                                      ? "text-[#67E8D6]"
                                      : "text-slate-100"
                                  }`}
                                >
                                  {sub.title}
                                </h4>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {sub.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-4 mt-6 bg-[#067F76] hover:bg-[#056b63] font-black text-white rounded-2xl transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
