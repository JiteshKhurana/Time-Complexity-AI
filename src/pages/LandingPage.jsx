import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Clock, Zap } from "lucide-react";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="container mx-auto px-4 py-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              TimeComplexity.AI
            </motion.h1>
          </header>

          <main className="container mx-auto px-4 py-16">
            <motion.section
              className="text-center mb-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                variants={itemVariants}
                className="text-6xl font-extrabold mb-6 leading-tight"
              >
                Optimize Your Code <br />
                with the Power of AI
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl mb-10 text-gray-300"
              >
                Analyze time complexity and predict performance in seconds
              </motion.p>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
                >
                  <Link to="/analyze">Try It Now</Link>
                </Button>
              </motion.div>
            </motion.section>

            <motion.section
              className="grid md:grid-cols-3 gap-8 mb-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  icon: Code,
                  title: "Multi-Language Support",
                  description:
                    "Analyze code in Python, C++, Java, and more with ease and precision.",
                },
                {
                  icon: Clock,
                  title: "Time Complexity Analysis",
                  description:
                    "Get accurate Big-O notation for your algorithms in real-time.",
                },
                {
                  icon: Zap,
                  title: "TLE Prediction",
                  description:
                    "Predict Time Limit Exceeded errors before submission with AI-powered insights.",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-white/10 backdrop-blur-lg border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                    <CardHeader>
                      <feature.icon className="h-12 w-12 mb-4 text-pink-400" />
                      <CardTitle className="text-2xl font-bold text-gray-100">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.section>

            <motion.section
              className="text-center mb-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-12"
              >
                How It Works
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Input Your Code",
                    description:
                      "Paste your code or upload a file in any supported language",
                  },
                  {
                    title: "AI Analysis",
                    description:
                      "Our advanced AI analyzes your code for time and space complexity",
                  },
                  {
                    title: "Get Results",
                    description:
                      "Receive detailed analysis and optimization suggestions",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
                    <motion.div
                      className="relative bg-white/10 backdrop-blur-md rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-6"
              >
                Ready to Optimize Your Code?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl mb-10 text-gray-300"
              >
                Join thousands of developers using TimeComplexityAI to improve
                their algorithms
              </motion.p>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
                >
                  <Link to="/analyze">Get Started for Free</Link>
                </Button>
              </motion.div>
            </motion.section>
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
