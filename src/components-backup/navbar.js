"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, List, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import WalletAccount from "./features/WalletAccount";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/create", label: "Create", icon: PlusCircle },
    { href: "/surveys", label: "Surveys", icon: List },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <div>
      <nav className="border-b border-border/40 bg-background/80 dark:bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-bold text-xl">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 dark:from-emerald-400 dark:via-lime-500 dark:to-lime-400"
                >
                  SurveyChain
                </motion.span>
              </Link>
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`gap-2 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-emerald-600 dark:hover:to-lime-600 text-white shadow-md hover:shadow-lg"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              <WalletAccount />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
