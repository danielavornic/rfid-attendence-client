'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function HeroSectionOne() {
  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-center">
      <Navbar />
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 dark:text-slate-300 md:text-4xl lg:text-7xl">
          {'Track Student Attendance with Ease'.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Streamline your attendance management with our modern RFID-based system. Monitor student
          presence, generate reports, and make data-driven decisions in real-time.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            asChild
            className="w-60 transform rounded-lg text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            <Link href="/live">Get Started</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 max-w-7xl rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="/images/dashboard.png"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b border-t border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
        <h1 className="text-base font-bold md:text-2xl">SAMS</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/dashboard">Dashboard Demo</Link>
        </Button>
      </div>
    </nav>
  );
};
