"use client";

import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function Contact() {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [copiedItem, setCopiedItem] = useState(null);
    const sectionRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: "", message: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setStatus({
                type: "error",
                message: "Email service is not configured.",
            });
            setLoading(false);
            return;
        }

        const templateParams = {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_email: "codebymonir@gmail.com",
            reply_to: form.email,
        };

        try {
            const result = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            if (result.status === 200) {
                setStatus({
                    type: "success",
                    message: "You'll get reply soon...!",
                });

                toast.success("Message sent to Monir Hossen successfully!", {
                    style: {
                        color: "green", // or a hex code like '#16a34a'
                    },
                });
                setForm({ name: "", email: "", message: "" });
            } else {
                throw new Error("Send failed");
            }
        } catch (error) {
            // console.log("FULL EMAILJS ERROR:", error);
            setStatus({
                type: "error",
                message: "Failed to send message. Please try again or email directly.",
            });
        } finally {
            setLoading(false);
        }
    };

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/CodeByMonir",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
            username: "@CodeByMonir",
            color: "hover:bg-gray-800",
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/codebymonir",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
            username: "CodeByMonir",
            color: "hover:bg-[#0077b5]",
        },
        {
            name: "Facebook",
            url: "https://facebook.com/moniratmeta",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
            username: "/MonirAtMeta",
            color: "hover:bg-[#1877f2]",
        },
    ];

    const contactMethods = [
        {
            icon: "📧",
            title: "Email",
            value: "codebymonir@gmail.com",
            link: "mailto:codebymonir@gmail.com",
            copyable: true,
        },
        {
            icon: "📱",
            title: "Phone",
            value: "+880 1780 477992",
            link: "tel:+8801780477992",
            copyable: true,
        },
        {
            icon: "💬",
            title: "WhatsApp",
            value: "+880 1751 971834",
            link: "https://wa.me/8801751971834",
            copyable: false,
        },
        {
            icon: "📅",
            title: "Schedule Meeting",
            value: "Book a call",
            link: "https://calendly.com/codebymonir",
            copyable: false,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
        hover: {
            scale: 1.03,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const copyToClipboard = (text, itemTitle) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(itemTitle);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    return (
        <motion.section
            ref={sectionRef}
            className="py-16 md:py-20 px-4 sm:px-6 md:px-20 bg-transparent relative"
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Background Glow Effects - Blends softly into both light and dark themes */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-20 light:opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.2), transparent)" }}
            />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[150px] opacity-15 light:opacity-5 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15), transparent)" }}
            />

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start relative z-10">

                {/* Left Side - Contact Info */}
                <motion.div variants={itemVariants}>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        variants={itemVariants}
                    >
                        <span className="bg-linear-to-r from-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed"
                        variants={itemVariants}
                    >
                        Have a project idea or want to collaborate? I'm always open
                        to discussing new opportunities.
                    </motion.p>

                    {/* Contact Methods Grid */}
                    <motion.div
                        className="mb-8"
                        variants={itemVariants}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-[#F8FAFC]">Contact Methods</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {contactMethods.map((method) => (
                                <motion.div
                                    key={method.title}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="group relative"
                                >
                                    <div
                                        className="relative rounded-xl p-3 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer 
                                                   border-slate-200 dark:border-sky-500/20 bg-white/60 dark:bg-slate-900/50
                                                   hover:border-sky-400 dark:hover:border-[#38BDF8] hover:bg-sky-50/50 dark:hover:bg-sky-500/5"
                                        onClick={() => {
                                            if (method.link && !method.copyable) window.open(method.link, '_blank');
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{method.icon}</span>
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-400 dark:text-[#94A3B8]">{method.title}</p>
                                                <p className="text-sm text-slate-700 dark:text-[#F8FAFC] font-medium truncate">{method.value}</p>
                                            </div>
                                            {method.copyable && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyToClipboard(method.value, method.title);
                                                    }}
                                                    className="text-xs transition-colors duration-300 px-2 py-1 rounded font-medium
                                                               bg-sky-50 dark:bg-sky-500/10 text-sky-500 dark:text-[#38BDF8] border border-sky-200 dark:border-sky-500/30
                                                               data-[copied=true]:bg-emerald-50 dark:data-[copied=true]:bg-emerald-500/20 data-[copied=true]:text-emerald-600 dark:data-[copied=true]:text-emerald-400 data-[copied=true]:border-emerald-200 dark:data-[copied=true]:border-emerald-500/30"
                                                    data-copied={copiedItem === method.title}
                                                >
                                                    {copiedItem === method.title ? "Copied! ✓" : "Copy"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-[#F8FAFC]">Social Media</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                                               border border-slate-200 dark:border-sky-500/30 text-slate-500 dark:text-[#94A3B8] bg-slate-50/50 dark:bg-sky-500/5"
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: "#38BDF8",
                                        background: "rgba(56, 189, 248, 0.15)",
                                        color: "#38BDF8",
                                    }}
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.name}
                                        className="w-5 h-5 dark:brightness-100 brightness-90"
                                    />
                                    <span className="text-sm transition-colors font-medium">
                                        {social.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                </motion.div>

                {/* Right Side - Form with Title */}
                <motion.div variants={itemVariants}>
                    <motion.div
                        className="rounded-2xl p-6 backdrop-blur-sm border-2 transition-all duration-300
                                   border-slate-200 dark:border-sky-500/20 bg-white/60 dark:bg-slate-900/50"
                        whileHover={{
                            borderColor: "#38BDF8",
                            boxShadow: "0 0 30px rgba(56, 189, 248, 0.1)",
                        }}
                    >
                        {/* Form Title */}
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent">
                                    Send a Message
                                </span>
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-[#94A3B8]">
                                Fill out the form below and I'll get back to you soon
                            </p>
                            <div className="w-20 h-0.5 mx-auto mt-3 rounded-full"
                                style={{ background: "linear-gradient(90deg, #38BDF8, #60A5FA)" }}
                            />
                        </div>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="text-sm font-medium text-slate-600 dark:text-[#94A3B8]">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none
                                               bg-transparent border border-slate-200 dark:border-sky-500/20 text-slate-800 dark:text-[#F8FAFC]
                                               focus:border-sky-400 dark:focus:border-[#38BDF8] focus:ring-2 focus:ring-sky-400/20"
                                    placeholder="Your name"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600 dark:text-[#94A3B8]">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none
                                               bg-transparent border border-slate-200 dark:border-sky-500/20 text-slate-800 dark:text-[#F8FAFC]
                                               focus:border-sky-400 dark:focus:border-[#38BDF8] focus:ring-2 focus:ring-sky-400/20"
                                    placeholder="your.email@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600 dark:text-[#94A3B8]">Message *</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full mt-1 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none resize-none
                                               bg-transparent border border-slate-200 dark:border-sky-500/20 text-slate-800 dark:text-[#F8FAFC]
                                               focus:border-sky-400 dark:focus:border-[#38BDF8] focus:ring-2 focus:ring-sky-400/20"
                                    placeholder="Tell me about your project..."
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {status.message && (
                                <div className={`p-3 rounded-lg border text-sm font-medium ${status.type === "success"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                    : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: "#38BDF8",
                                    color: "white",
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    background: "#0EA5E9",
                                    boxShadow: "0 10px 25px -5px rgba(56, 189, 248, 0.4)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}