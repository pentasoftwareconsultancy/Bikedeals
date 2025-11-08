"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
// Use the public folder path for static assets to avoid importing binary files in TS
const HomeHeroBackgroundVideo = "/uploads/videos/bikedealhomehero.mp4";

interface HeroSectionProps {
  onSellClick: () => void;
}

export default function HeroSection({ onSellClick }: HeroSectionProps) {
  const { content } = useSiteContent();
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🎯 Load your hero section content dynamically
  const heroContent = content.find(
    (section) => section.id === "1" || section.title === "Home"
  );

  // 🎥 Auto-play handling for background video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🎬 Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ opacity: 0.85, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* 👉 Use your actual file path here */}
        <source src={HomeHeroBackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌓 Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/70 z-[1]" />

      {/* 🏍️ Motorcycle silhouette background */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div className="flex space-x-8 opacity-30">
          {/* Left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block"
          >
            <svg
              width="200"
              height="120"
              viewBox="0 0 200 120"
              className="text-white fill-current"
            >
              <path d="M20 80 C20 70, 30 60, 40 60 L160 60 C170 60, 180 70, 180 80 L180 90 C180 100, 170 110, 160 110 L40 110 C30 110, 20 100, 20 90 Z" />
              <circle cx="50" cy="90" r="20" />
              <circle cx="150" cy="90" r="20" />
              <path d="M70 60 L130 60 L120 40 L80 40 Z" />
            </svg>
          </motion.div>

          {/* Center */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <svg
              width="300"
              height="180"
              viewBox="0 0 300 180"
              className="text-white fill-current"
            >
              <path d="M30 120 C30 105, 45 90, 60 90 L240 90 C255 90, 270 105, 270 120 L270 135 C270 150, 255 165, 240 165 L60 165 C45 165, 30 150, 30 135 Z" />
              <circle cx="75" cy="135" r="30" />
              <circle cx="225" cy="135" r="30" />
              <path d="M105 90 L195 90 L180 60 L120 60 Z" />
              <path d="M150 60 L150 30 L170 30 L170 60" />
            </svg>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block"
          >
            <svg
              width="200"
              height="120"
              viewBox="0 0 200 120"
              className="text-white fill-current"
            >
              <path d="M20 80 C20 70, 30 60, 40 60 L160 60 C170 60, 180 70, 180 80 L180 90 C180 100, 170 110, 160 110 L40 110 C30 110, 20 100, 20 90 Z" />
              <circle cx="50" cy="90" r="20" />
              <circle cx="150" cy="90" r="20" />
              <path d="M70 60 L130 60 L120 40 L80 40 Z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ✨ Main Content */}
      <div className="relative z-[3] text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg shadow-2xl glow-effect">
            <h2 className="text-2xl md:text-3xl font-bold">
              {heroContent?.fields?.bannerTitle || "Just Instant Payment"}
            </h2>
            <p className="text-xl md:text-2xl font-semibold mt-1">
              {heroContent?.fields?.bannerSubtitle || "in 30 MINUTES"}
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow"
        >
          {heroContent?.fields?.mainTitle || "BikesDeal"}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
        >
          {heroContent?.fields?.description ||
            "Your trusted partner for buying and selling premium motorcycles. Experience the fastest and most secure bike dealing platform."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onSellClick}
            className="btn-glow bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 glow-effect"
          >
            {heroContent?.fields?.primaryButtonText || "Sell Your Bike Now"}
          </button>

          <a
            href="https://wa.me/918055224418?text=Hi%2C%20I%27m%20interested%20in%20your%20bike%20dealing%20services.%20Please%20provide%20more%20information."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            Contact on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[3]"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
