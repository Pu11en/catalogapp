"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

export default function AnimatedLogo({ size = "lg", className = "" }: AnimatedLogoProps) {
    const sizes = {
        sm: { width: 150, height: 80 },
        md: { width: 220, height: 110 },
        lg: { width: 320, height: 160 },
        xl: { width: 400, height: 200 },
    };

    const { width, height } = sizes[size];
    const scale = width / 320;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15,
            },
        },
    };

    const swooshVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 1.2, ease: "easeInOut" as const, delay: 0.5 },
                opacity: { duration: 0.3, delay: 0.5 },
            },
        },
    };

    const catalogVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 1.2,
                ease: "easeOut" as const,
            },
        },
    };

    const glowVariants = {
        animate: {
            filter: [
                "drop-shadow(0 0 0px rgba(0, 168, 232, 0))",
                "drop-shadow(0 0 15px rgba(0, 168, 232, 0.4))",
                "drop-shadow(0 0 0px rgba(0, 168, 232, 0))",
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
            },
        },
    };

    return (
        <motion.div
            className={`relative ${className}`}
            style={{ width, height }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.svg
                viewBox="0 0 320 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
                variants={glowVariants}
                animate="animate"
            >
                {/* "S" Letter */}
                <motion.g variants={letterVariants}>
                    <defs>
                        <linearGradient id="salmoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0077B6" />
                            <stop offset="50%" stopColor="#0D3B66" />
                            <stop offset="100%" stopColor="#023047" />
                        </linearGradient>
                    </defs>
                    <text
                        x="50"
                        y="70"
                        fill="url(#salmoGradient)"
                        fontFamily="Arial Black, sans-serif"
                        fontSize="56"
                        fontWeight="900"
                        letterSpacing="-2"
                    >
                        S
                    </text>
                </motion.g>

                {/* "a" Letter */}
                <motion.g variants={letterVariants}>
                    <text
                        x="85"
                        y="70"
                        fill="url(#salmoGradient)"
                        fontFamily="Arial Black, sans-serif"
                        fontSize="56"
                        fontWeight="900"
                        letterSpacing="-2"
                    >
                        a
                    </text>
                </motion.g>

                {/* "l" Letter */}
                <motion.g variants={letterVariants}>
                    <text
                        x="125"
                        y="70"
                        fill="url(#salmoGradient)"
                        fontFamily="Arial Black, sans-serif"
                        fontSize="56"
                        fontWeight="900"
                        letterSpacing="-2"
                    >
                        l
                    </text>
                </motion.g>

                {/* "m" Letter */}
                <motion.g variants={letterVariants}>
                    <text
                        x="147"
                        y="70"
                        fill="url(#salmoGradient)"
                        fontFamily="Arial Black, sans-serif"
                        fontSize="56"
                        fontWeight="900"
                        letterSpacing="-2"
                    >
                        m
                    </text>
                </motion.g>

                {/* "o" Letter */}
                <motion.g variants={letterVariants}>
                    <text
                        x="210"
                        y="70"
                        fill="url(#salmoGradient)"
                        fontFamily="Arial Black, sans-serif"
                        fontSize="56"
                        fontWeight="900"
                        letterSpacing="-2"
                    >
                        o
                    </text>
                </motion.g>

                {/* Animated Swoosh/Wave */}
                <motion.path
                    d="M40 95 Q80 85 160 95 Q240 105 280 90"
                    stroke="url(#swooshGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    variants={swooshVariants}
                />
                <defs>
                    <linearGradient id="swooshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#47B5E6" />
                        <stop offset="50%" stopColor="#00A8E8" />
                        <stop offset="100%" stopColor="#0090C8" />
                    </linearGradient>
                </defs>

                {/* Second decorative swoosh line */}
                <motion.path
                    d="M60 102 Q100 95 160 100 Q220 105 260 98"
                    stroke="#00A8E8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                    variants={swooshVariants}
                />

                {/* "Catalog" text */}
                <motion.text
                    x="160"
                    y="135"
                    textAnchor="middle"
                    fill="#0D3B66"
                    fontFamily="Arial, sans-serif"
                    fontSize="28"
                    fontWeight="500"
                    letterSpacing="4"
                    variants={catalogVariants}
                >
                    Catalog
                </motion.text>
            </motion.svg>

            {/* Floating particles effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#00A8E8]/30"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${40 + (i % 2) * 20}%`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
