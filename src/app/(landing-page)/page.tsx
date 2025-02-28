
'use client';

import { ArrowRight, Book, Search, PlayCircle, GraduationCap, Mic, Globe, Star, Zap, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';

const Index = () => {

  
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-40 relative overflow-hidden">
        {/* Vector Background */}
        <div className="absolute inset-0 -z-10 opacity-10">
          {/* Abstract vector shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#0EA5E9', stopOpacity: 0.7 }} />
                </linearGradient>
                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#D946EF', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>
              <path d="M0,400 Q250,100 500,400 T1000,400 V1000 H0 Z" fill="url(#grad1)" opacity="0.3">
                <animate attributeName="d" 
                  values="M0,400 Q250,100 500,400 T1000,400 V1000 H0 Z;
                          M0,450 Q250,150 500,450 T1000,450 V1000 H0 Z;
                          M0,400 Q250,100 500,400 T1000,400 V1000 H0 Z"
                  dur="20s" 
                  repeatCount="indefinite" />
              </path>
              <path d="M0,500 Q200,300 400,500 T1000,500 V1000 H0 Z" fill="url(#grad2)" opacity="0.2">
                <animate attributeName="d" 
                  values="M0,500 Q200,300 400,500 T1000,500 V1000 H0 Z;
                          M0,550 Q200,350 400,550 T1000,550 V1000 H0 Z;
                          M0,500 Q200,300 400,500 T1000,500 V1000 H0 Z"
                  dur="15s" 
                  repeatCount="indefinite" />
              </path>
              <circle cx="200" cy="150" r="50" fill="#8B5CF6" opacity="0.1">
                <animate attributeName="cy" values="150;170;150" dur="10s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="200" r="70" fill="#0EA5E9" opacity="0.1">
                <animate attributeName="cy" values="200;230;200" dur="12s" repeatCount="indefinite" />
              </circle>
              <circle cx="500" cy="250" r="30" fill="#D946EF" opacity="0.1">
                <animate attributeName="r" values="30;40;30" dur="8s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }} 
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full rounded-full bg-gradient-to-br from-[#9b87f5]/30 to-[#0EA5E9]/20"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gradient-to-tr from-primary/20 to-sky-300/20 blur-3xl">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }} 
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="w-full h-full rounded-full bg-gradient-to-tr from-[#D946EF]/20 to-[#0EA5E9]/10"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/5 text-sm font-medium border border-primary/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Transform Your English Learning
            </motion.span>
            <h1 className="hero-text mb-6">
              Master English pronunciation with 
              <span className="relative inline-block mx-2">
                clarity
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                ></motion.span>
              </span> 
              and 
              <span className="relative inline-block mx-2">
                confidence
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                ></motion.span>
              </span>
            </h1>
            <p className="subtitle-text mb-10 max-w-2xl mx-auto">
              EndlessWiz provides interactive tools and expert guidance to help you perfect your English pronunciation, vocabulary, and fluency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/signup" className="button-primary flex items-center gap-2">
                  Start Learning
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="#features" className="button-outline">
                  Explore Features
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Hero illustration - use first image */}
          <motion.div
            className="mt-12 relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Image 
              src="/133679140_10219929.jpg"
              width={500} 
              height={500}
              alt="Child reading a book with imagination whales" 
              className="w-full h-auto rounded-2xl shadow-xl" 
            />
            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-primary/10 hidden md:block">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Ignite your imagination</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-200 to-pink-200 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span 
              className="micro-text text-primary/60 block mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Features
            </motion.span>
            <motion.h2 
              className="title-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Everything you need to master English
            </motion.h2>
            <motion.p 
              className="body-text max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our platform combines innovative technology with proven learning methodologies to enhance your English pronunciation and comprehension.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Video Learning</h3>
              <p className="text-muted-foreground mb-4">
                Watch expert instructors demonstrate proper pronunciation techniques and language nuances.
              </p>
              <Link 
                href="/learn"
                className="flex items-center text-sm font-medium text-primary hover:underline"
              >
                <span>Explore videos</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Interactive Practice</h3>
              <p className="text-muted-foreground mb-4">
                Use our interactive tools to practice pronunciation, receive feedback, and track your progress.
              </p>
              <Link 
                href="/practice"
                className="flex items-center text-sm font-medium text-primary hover:underline"
              >
                <span>Try exercises</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Vocabulary Builder</h3>
              <p className="text-muted-foreground mb-4">
                Expand your vocabulary with context-based word learning and retention techniques.
              </p>
              <Link 
                href="/learn"
                className="flex items-center text-sm font-medium text-primary hover:underline"
              >
                <span>Build vocabulary</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse", 
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Features illustration - use second image */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="/lovable-uploads/619359ee-44fc-43cd-b52d-c3a917104f2d.png" 
                alt="Child reading with magical creatures" 
                className="w-full h-auto"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow border border-primary/10 hidden md:block">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium">Imagination-driven learning</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span 
              className="micro-text text-primary/60 block mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Testimonials
            </motion.span>
            <motion.h2 
              className="title-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              What our learners say
            </motion.h2>
            <motion.p 
              className="body-text max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join thousands of satisfied learners who have transformed their English skills with EndlessWiz.
            </motion.p>
          </div>

          {/* Testimonials and third image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Testimonial 1 */}
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-sm border border-border relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="absolute top-4 right-4 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-blue-300/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary/70" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">English Learner</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "EndlessWiz has transformed my pronunciation. The interactive tools made it easy to practice and the video lessons were incredibly helpful."
                </p>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-sm border border-border relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="absolute top-4 right-4 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-blue-300/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary/70" />
                  </div>
                  <div>
                    <h4 className="font-medium">Miguel Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Business Professional</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "As someone who uses English in international business, the pronunciation practice has given me more confidence in meetings and presentations."
                </p>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div 
                className="bg-card rounded-xl p-6 shadow-sm border border-border md:col-span-2 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="absolute top-4 right-4 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-blue-300/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary/70" />
                  </div>
                  <div>
                    <h4 className="font-medium">Yuki Tanaka</h4>
                    <p className="text-sm text-muted-foreground">University Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The vocabulary builder section has helped me expand my English vocabulary significantly. The context-based approach makes words easier to remember."
                </p>
              </motion.div>
            </div>

            {/* Third image - parent-child bedtime reading */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-primary/5 to-blue-300/10 rounded-2xl p-1">
                <img 
                  src="/lovable-uploads/0dff5c81-f98f-48c3-b375-227ecca1a640.png" 
                  alt="Parent reading to child at bedtime" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute -bottom-5 left-10 bg-card p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Learning together, growing together</span>
                </div>
              </div>
              <div className="absolute -right-5 top-1/4 bg-white p-3 rounded-full shadow-lg hidden lg:flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <GraduationCap className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Animated waves */}
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <path id="wave1" d="M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0" />
              <path id="wave2" d="M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0" />
            </defs>
            <use href="#wave1" fill="white" opacity="0.1">
              <animate attributeName="d" 
                values="
                  M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0;
                  M0,160 C320,200,420,100,740,175 C1060,250,1120,216,1440,120 V0 H0;
                  M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0"
                dur="20s"
                repeatCount="indefinite" />
            </use>
            <use href="#wave2" fill="white" opacity="0.05">
              <animate attributeName="d" 
                values="
                  M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0;
                  M0,160 C310,120,410,240,740,140 C1070,40,1130,100,1440,120 V0 H0;
                  M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0"
                dur="15s"
                repeatCount="indefinite" />
            </use>
          </svg>
          
          <div className="absolute -top-20 right-20 w-40 h-40 rounded-full bg-white/20 blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 bg-white/10 px-4 py-2 rounded-full"
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Start your journey today</span>
            </motion.div>
            
            <motion.h2 
              className="title-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to transform your English skills?
            </motion.h2>
            
            <motion.p 
              className="text-primary-foreground/80 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join EndlessWiz today and start your journey to English fluency with our comprehensive learning tools.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/signup" className="bg-primary-foreground text-primary button-primary hover:bg-primary-foreground/90 group">
                  <span>Get Started for Free</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/learn" className="bg-transparent border border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground button-outline">
                  Explore Lessons
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
