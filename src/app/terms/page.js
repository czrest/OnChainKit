"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Scale } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        {
          text: 'By accessing and using SurveyChain (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.',
        },
        {
          text: "We reserve the right to modify these terms at any time. Your continued use of the Service following any changes indicates your acceptance of the new terms.",
        },
      ],
    },
    {
      title: "2. Wallet Connection & Authentication",
      content: [
        {
          text: "To use our Service, you must connect a compatible Web3 wallet (such as MetaMask). You are responsible for maintaining the security of your wallet and private keys.",
        },
        {
          text: "You acknowledge that blockchain transactions are irreversible and that you are solely responsible for all activities conducted through your connected wallet.",
        },
        {
          text: "We do not store your private keys or have access to your wallet. All transactions are conducted directly on the Base blockchain.",
        },
      ],
    },
    {
      title: "3. Survey Creation & ETH Deposits",
      content: [
        {
          subtitle: "Creator Responsibilities",
          text: "When creating a survey, you must deposit ETH that will be distributed as rewards to respondents. You are responsible for ensuring adequate funds and accurate survey configuration.",
        },
        {
          subtitle: "Reward Distribution",
          text: "ETH rewards are distributed automatically through smart contracts when surveys are finalized. Once deposited, funds cannot be withdrawn unless all survey conditions are met or the survey is properly closed.",
        },
        {
          subtitle: "Screening Requirements",
          text: "All surveys must include screening criteria. You agree to review applications fairly and in good faith, approving only respondents who meet your stated criteria.",
        },
      ],
    },
    {
      title: "4. Survey Participation",
      content: [
        {
          subtitle: "Application Process",
          text: "To participate in a survey, you must first apply by providing screening information. Acceptance is at the sole discretion of the survey creator.",
        },
        {
          subtitle: "Response Requirements",
          text: "You agree to provide honest, accurate, and thoughtful responses. Submitting fraudulent or low-quality responses may result in rejection and loss of rewards.",
        },
        {
          subtitle: "Reward Claims",
          text: "Rewards are distributed proportionally among approved respondents when the survey creator finalizes the survey. You acknowledge that rewards depend on survey completion and creator action.",
        },
      ],
    },
    {
      title: "5. Smart Contract & Blockchain",
      content: [
        {
          text: "All surveys and transactions are governed by smart contracts deployed on the Base blockchain. You acknowledge the inherent risks of blockchain technology, including but not limited to smart contract vulnerabilities, network congestion, and gas fees.",
        },
        {
          text: "We are not responsible for any losses incurred due to smart contract bugs, blockchain network issues, or user error in transaction execution.",
        },
        {
          text: "Gas fees for blockchain transactions are paid by the user initiating the transaction and are non-refundable.",
        },
      ],
    },
    {
      title: "6. Prohibited Activities",
      content: [
        {
          text: "You agree not to engage in any of the following prohibited activities:",
        },
        {
          text: "• Creating fraudulent surveys or providing false screening information",
        },
        {
          text: "• Attempting to manipulate reward distribution or exploit smart contract vulnerabilities",
        },
        {
          text: "• Using bots, scripts, or automated tools to submit responses or applications",
        },
        {
          text: "• Harassing, threatening, or discriminating against other users",
        },
        {
          text: "• Uploading malicious code or attempting to compromise the Service",
        },
        {
          text: "• Violating any applicable laws or regulations",
        },
      ],
    },
    {
      title: "7. Intellectual Property",
      content: [
        {
          text: "You retain ownership of all survey content you create and responses you provide. By using the Service, you grant us a non-exclusive, worldwide license to host and display your content as necessary to operate the Service.",
        },
        {
          text: "The SurveyChain platform, including all code, design, and branding, is protected by intellectual property rights and remains our exclusive property.",
        },
      ],
    },
    {
      title: "8. Disclaimers & Limitation of Liability",
      content: [
        {
          text: 'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE UNINTERRUPTED ACCESS, ACCURACY OF DATA, OR SUCCESS OF TRANSACTIONS.',
        },
        {
          text: "WE ARE NOT LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO LOSS OF FUNDS, DATA, OR PROFITS.",
        },
        {
          text: "Our total liability shall not exceed the amount of fees you paid to us in the 12 months preceding any claim.",
        },
      ],
    },
    {
      title: "9. Dispute Resolution",
      content: [
        {
          text: "Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
        },
        {
          text: "You agree to waive any right to participate in class action lawsuits or class-wide arbitration.",
        },
      ],
    },
    {
      title: "10. Termination",
      content: [
        {
          text: "We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, including for violation of these Terms.",
        },
        {
          text: "Upon termination, you remain responsible for all outstanding obligations, and certain provisions of these Terms will continue to apply.",
        },
      ],
    },
    {
      title: "11. Contact Information",
      content: [
        {
          text: "If you have any questions about these Terms of Service, please contact us through the appropriate channels provided on our platform.",
        },
      ],
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 dark:to-emerald-500/10 pt-20 pb-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 mb-6">
              <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-600 dark:from-emerald-400 dark:to-lime-400">
                Legal Agreement
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 dark:from-emerald-400 dark:via-lime-500 dark:to-lime-400">
                Terms of Service
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
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Important Notice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service govern your use of SurveyChain, a
                  decentralized survey platform built on the Base blockchain. By
                  using our Service, you agree to be bound by these terms.
                  Please read them carefully before participating in any surveys
                  or creating content on our platform.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <Card className="mb-6 border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      {item.subtitle && (
                        <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400">
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
          ))}

          {/* Warning Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-amber-500/30 dark:border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <CardTitle className="text-amber-900 dark:text-amber-100">
                    Blockchain Risks
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  Using blockchain technology involves inherent risks.
                  Transactions are irreversible, and you are solely responsible
                  for the security of your wallet and private keys. Always
                  verify transaction details before confirming, and never share
                  your private keys with anyone.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </>
  );
}
