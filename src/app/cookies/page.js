"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Cookie,
  Settings,
  BarChart3,
  Shield,
  Info,
  ToggleLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function and cannot be disabled. They enable core functionality such as wallet authentication and session management.",
      examples: [
        "Wallet connection state",
        "Session authentication tokens",
        "Security and fraud prevention",
        "Load balancing and performance",
      ],
      required: true,
      color: "from-emerald-500 to-lime-500",
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description:
        "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: [
        "Theme preferences (light/dark mode)",
        "Language selection",
        "Display preferences",
        "Notification settings",
      ],
      required: false,
      color: "from-emerald-600 to-lime-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting anonymous information.",
      examples: [
        "Page view tracking",
        "Feature usage statistics",
        "User journey analysis",
        "Performance monitoring",
      ],
      required: false,
      color: "from-lime-500 to-emerald-500",
    },
  ];

  const sections = [
    {
      title: "What Are Cookies?",
      content: [
        "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, authenticate your identity, and provide a better user experience.",
        "We use cookies and similar technologies (such as local storage and session storage) to operate SurveyChain effectively and securely.",
      ],
    },
    {
      title: "How We Use Cookies",
      content: [
        "We use cookies for several purposes:",
        "• Authentication: To verify your wallet connection and maintain your logged-in session",
        "• Security: To protect against fraud, abuse, and unauthorized access",
        "• Preferences: To remember your settings and choices across sessions",
        "• Analytics: To understand how users interact with our Service and identify areas for improvement",
        "• Performance: To optimize loading times and ensure smooth operation",
      ],
    },
    {
      title: "Third-Party Cookies",
      content: [
        "Some cookies are set by third-party services we integrate with, including:",
        "• Web3 wallet providers (MetaMask, Coinbase Wallet): For wallet connection and transaction signing",
        "• Analytics providers: For usage tracking and performance monitoring",
        "• OnchainKit: For blockchain interaction and smart contract functionality",
        "These third parties have their own cookie policies, and we encourage you to review them.",
      ],
    },
    {
      title: "Cookie Duration",
      content: [
        "Session Cookies: These temporary cookies are deleted when you close your browser. They are used for essential functions like authentication.",
        "Persistent Cookies: These cookies remain on your device for a set period or until you delete them. They remember your preferences across sessions.",
        "The duration of each cookie varies based on its purpose, ranging from a single session to up to one year.",
      ],
    },
    {
      title: "Managing Cookie Preferences",
      content: [
        "You have control over cookies and can manage them through your browser settings:",
        "• Block all cookies: You can configure your browser to reject all cookies, though this may limit functionality",
        "• Delete existing cookies: You can clear cookies stored on your device at any time",
        "• Accept/reject specific cookies: Most browsers allow you to accept or reject cookies on a case-by-case basis",
        "Note that disabling essential cookies may prevent you from using certain features of SurveyChain, including wallet connection and survey participation.",
      ],
    },
    {
      title: "Browser-Specific Instructions",
      content: [
        "Chrome: Settings → Privacy and security → Cookies and other site data",
        "Firefox: Settings → Privacy & Security → Cookies and Site Data",
        "Safari: Preferences → Privacy → Cookies and website data",
        "Edge: Settings → Cookies and site permissions → Cookies and site data",
        "For mobile browsers, consult your device's settings menu.",
      ],
    },
    {
      title: "Do Not Track (DNT)",
      content: [
        'Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you prefer not to be tracked. Currently, there is no industry standard for responding to DNT signals.',
        "We honor DNT signals where technically feasible, but note that certain essential cookies are required for the Service to function properly.",
      ],
    },
    {
      title: "Updates to This Policy",
      content: [
        'We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by updating the "Last updated" date at the top of this page.',
        "Your continued use of SurveyChain after changes are posted constitutes your acceptance of the updated Cookie Policy.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have questions about our use of cookies or this Cookie Policy, please contact us through the appropriate channels provided on our platform.",
      ],
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-lime-500/5 dark:to-emerald-500/10 pt-20 pb-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 dark:from-emerald-500/20 dark:to-lime-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-lime-500/10 dark:from-emerald-500/20 dark:to-lime-500/20 border border-emerald-500/20 dark:border-emerald-500/30 mb-6">
              <Cookie className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-600 dark:from-emerald-400 dark:to-lime-400">
                Transparency & Control
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 dark:from-emerald-400 dark:via-lime-500 dark:to-lime-400">
                Cookie Policy
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </motion.div>

          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="mb-8 border-emerald-500/20 dark:border-emerald-500/30 bg-card/80 dark:bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Understanding Cookies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  This Cookie Policy explains how SurveyChain uses cookies and
                  similar technologies to provide, improve, and secure our
                  decentralized survey platform. We believe in transparency and
                  giving you control over your data.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookie Types */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Types of Cookies We Use
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cookieTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="h-full border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          {type.required ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                              Required
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-300">
                              Optional
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {type.description}
                        </p>
                        <div>
                          <p className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-400">
                            Examples:
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {type.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">
                                  •
                                </span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Detailed Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <Card className="mb-6 border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-lime-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.content.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Control Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-lime-500/30 dark:border-lime-500/40 bg-gradient-to-r from-emerald-500/5 to-lime-500/5 dark:from-emerald-500/10 dark:to-lime-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ToggleLeft className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                  <CardTitle className="text-lime-900 dark:text-lime-100">
                    Your Cookie Choices
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lime-800 dark:text-lime-200 leading-relaxed">
                  You have full control over non-essential cookies. You can
                  manage your preferences through your browser settings at any
                  time. Essential cookies are required for the Service to
                  function and cannot be disabled.
                </p>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                  onClick={() =>
                    window.open("chrome://settings/cookies", "_blank")
                  }
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Browser Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
}
