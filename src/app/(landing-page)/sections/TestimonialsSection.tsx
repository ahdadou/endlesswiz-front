"use client";

import {
  ArrowRight,
  Book,
  GraduationCap,
  Mic,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const TestimonialsSection = () => {
  return (
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
            Join thousands of satisfied learners who have transformed their
            English skills with EndlessWiz.
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
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
                  <p className="text-sm text-muted-foreground">
                    English Learner
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "EndlessWiz has transformed my pronunciation. The interactive
                tools made it easy to practice and the video lessons were
                incredibly helpful."
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
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
                  <p className="text-sm text-muted-foreground">
                    Business Professional
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "As someone who uses English in international business, the
                pronunciation practice has given me more confidence in meetings
                and presentations."
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
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
                  <p className="text-sm text-muted-foreground">
                    University Student
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The vocabulary builder section has helped me expand my English
                vocabulary significantly. The context-based approach makes words
                easier to remember."
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
              <Image
                src="/133679140_10219929.jpg"
                width={500}
                height={500}
                alt="Parent reading to child at bedtime"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="absolute -bottom-5 left-10 bg-card p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Learning together, growing together
                </span>
              </div>
            </div>
            <div className="absolute -right-5 top-1/4 p-3 rounded-full shadow-lg hidden lg:flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GraduationCap className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
