"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Wallet Information",
          text: "When you connect your Web3 wallet to our Service, we collect your public wallet address. We do not have access to your private keys or seed phrases.",
        },
        {
          subtitle: "Survey Data",
          text: "We collect and store survey content you create, including questions, screening criteria, and reward amounts. We also collect response data from survey participants.",
        },
        {
          subtitle: "On-Chain Data",
          text: "Transaction data, including survey creation, responses, and reward distributions, are recorded on the Base blockchain and are publicly accessible.",
        },
        {
          subtitle: "Usage Information",
          text: "We may collect information about how you interact with our Service, including pages visited, features used, and technical data such as browser type and device information.",
        },
      ],
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: [
        {
          text: "We use the information we collect for the following purposes:",
        },
        {
          text: "• To provide, maintain, and improve the SurveyChain Service",
        },
        {
          text: "• To facilitate survey creation, application processing, and reward distribution",
        },
        {
          text: "• To authenticate your wallet connection and verify transaction signatures",
        },
        {
          text: "• To send notifications about survey status, applications, and rewards",
        },
        {
          text: "• To detect and prevent fraud, abuse, and security incidents",
        },
        {
          text: "• To analyze usage patterns and improve user experience",
        },
        {
          text: "• To comply with legal obligations and enforce our Terms of Service",
        },
      ],
    },
    {
      icon: Lock,
      title: "3. Data Storage & Security",
      content: [
        {
          subtitle: "Off-Chain Storage",
          text: "Survey content, screening criteria, and response data are stored on our secure servers. We implement industry-standard security measures including encryption, access controls, and regular security audits.",
        },
        {
          subtitle: "On-Chain Storage",
          text: "Transaction data and reward distributions are stored immutably on the Base blockchain. This data is publicly accessible and cannot be deleted or modified.",
        },
        {
          subtitle: "Security Measures",
          text: "We employ technical and organizational measures to protect your data, including encrypted connections (HTTPS), secure authentication, and regular vulnerability assessments. However, no system is completely secure, and we cannot guarantee absolute security.",
        },
      ],
    },
    {
      icon: Globe,
      title: "4. Information Sharing & Disclosure",
      content: [
        {
          subtitle: "Public Blockchain Data",
          text: "All on-chain transactions, including wallet addresses, survey creation, and reward distributions, are publicly visible on the Base blockchain explorer.",
        },
        {
          subtitle: "Survey Creators",
          text: "When you apply to a survey, your screening responses are shared with the survey creator to evaluate your eligibility. Your survey responses are shared with the creator upon completion.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share data with trusted third-party service providers who assist in operating our Service, such as hosting providers and analytics tools. These providers are bound by confidentiality obligations.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, court order, or governmental regulation, or if necessary to protect our rights, safety, or property.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "5. Your Privacy Rights",
      content: [
        {
          subtitle: "Access & Correction",
          text: "You may request access to the personal information we hold about you and request corrections if it is inaccurate.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your off-chain data, subject to legal and operational requirements. Note that on-chain data cannot be deleted due to the immutable nature of blockchain.",
        },
        {
          subtitle: "Opt-Out",
          text: "You may opt out of certain data collection by adjusting your browser settings or disconnecting your wallet. However, this may limit your ability to use the Service.",
        },
        {
          subtitle: "Data Portability",
          text: "You may request a copy of your data in a structured, machine-readable format.",
        },
      ],
    },
    {
      icon: Shield,
      title: "6. Cookies & Tracking Technologies",
      content: [
        {
          text: "We use cookies and similar tracking technologies to enhance your experience. These include:",
        },
        {
          text: "• Essential cookies for authentication and session management",
        },
        {
          text: "• Analytics cookies to understand how users interact with our Service",
        },
        {
          text: "• Preference cookies to remember your settings and choices",
        },
        {
          text: "You can control cookie settings through your browser, but disabling certain cookies may affect functionality. For more details, see our Cookie Policy.",
        },
      ],
    },
    {
      icon: Lock,
      title: "7. Third-Party Services",
      content: [
        {
          text: "Our Service integrates with third-party services, including:",
        },
        {
          text: "• Web3 wallet providers (MetaMask, Coinbase Wallet, etc.)",
        },
        {
          text: "• Base blockchain network",
        },
        {
          text: "• OnchainKit and other blockchain tools",
        },
        {
          text: "These third parties have their own privacy policies, and we are not responsible for their privacy practices. We encourage you to review their policies before using our Service.",
        },
      ],
    },
    {
      icon: Database,
      title: "8. Data Retention",
      content: [
        {
          text: "We retain your information for as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy. Survey data is retained to maintain historical records and comply with legal obligations.",
        },
        {
          text: "On-chain data is permanently stored on the blockchain and cannot be deleted. You acknowledge and accept this when using our Service.",
        },
      ],
    },
    {
      icon: Globe,
      title: "9. International Data Transfers",
      content: [
        {
          text: "Your data may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Service, you consent to such transfers.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "10. Children's Privacy",
      content: [
        {
          text: "Our Service is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.",
        },
      ],
    },
    {
      icon: Shield,
      title: "11. Changes to This Privacy Policy",
      content: [
        {
          text: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.',
        },
      ],
    },
    {
      icon: Lock,
      title: "12. Contact Us",
      content: [
        {
          text: "If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us through the appropriate channels provided on our platform.",
        },
      ],
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-lime-500/5 dark:to-lime-500/10 pt-20 pb-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-40 left-10 w-96 h-96 bg-lime-500/10 dark:bg-lime-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/20 border border-lime-500/20 dark:border-lime-500/30 mb-6">
              <Shield className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-600 dark:from-emerald-400 dark:to-lime-400">
                Your Data Protection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 dark:from-emerald-400 dark:via-lime-500 dark:to-lime-400">
                Privacy Policy
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
            <Card className="mb-8 border-lime-500/20 dark:border-lime-500/30 bg-card/80 dark:bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Our Commitment to Privacy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  At SurveyChain, we take your privacy seriously. This Privacy
                  Policy explains how we collect, use, store, and protect your
                  personal information when you use our decentralized survey
                  platform. We are committed to transparency and giving you
                  control over your data.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Sections */}
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <Card className="mb-6 border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-lime-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {item.subtitle && (
                          <h4 className="font-semibold mb-2 text-lime-700 dark:text-lime-400">
                            {item.subtitle}
                          </h4>
                        )}
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Security Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-emerald-500/30 dark:border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  <CardTitle className="text-emerald-900 dark:text-emerald-100">
                    Data Security Commitment
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  We implement industry-leading security measures to protect
                  your data. However, due to the decentralized nature of
                  blockchain technology, certain information (such as wallet
                  addresses and transactions) is publicly visible on the Base
                  blockchain. Please consider this when participating in
                  surveys.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
}
