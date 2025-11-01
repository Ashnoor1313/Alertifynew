// FeatureSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  QrCode,
  IndianRupee,
  Link as LinkIcon,
  MessageSquare,
  Bot,
} from "lucide-react";
import FlipCard from "../components/FlipCard";

const FeatureCard = ({ icon, title, desc, delay, origin }) => (
  <motion.div
    initial={{ rotateY: 90, opacity: 0, [origin]: -100 }}
    whileInView={{ rotateY: 0, opacity: 1, [origin]: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-emerald-400 transition-all shadow-xl"
  >
    <div className="flex items-start gap-4">
      <div className="bg-emerald-900/40 p-3 rounded-lg">{icon}</div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-300 text-sm">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <QrCode className="w-8 h-8 text-emerald-400" />,
      title: "QR Code Scanner",
      desc: "Instant detection of malicious QR codes before scanning",
      route: "/qr",
      origin: "x",
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-emerald-400" />,
      title: "UPI Fraud Detection",
      desc: "Real-time verification of UPI IDs and transaction requests",
      route: "/upi",
      origin: "y",
    },
    {
      icon: <LinkIcon className="w-8 h-8 text-emerald-400" />,
      title: "URL Analysis",
      desc: "Deep scan of shortened URLs and phishing links",
      route: "/url",
      origin: "x",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-emerald-400" />,
      title: "SMS Scam Detection",
      desc: "AI analysis of suspicious messages and OTP frauds",
      route: "/sms",
      origin: "y",
    },
    {
      icon: <Bot className="w-8 h-8 text-emerald-400" />,
      title: "AI Assistant",
      desc: "24/7 Live chatbot for instant scam verification",
      route: "/assistant",
      origin: "y",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-emerald-400" />,
      title: "Phone Spam Detection",
      desc: "Detect spam and scam phone calls instantly",
      route: "/phone",
      origin: "x",
    },
  ];

  return (
    <section
      id="features"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Optional Animated Card */}
      {/* <FlipCard /> */}

      <div className="container mx-auto px-6 z-10 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400">AI-Powered</span> Protection Layers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Multi-layered security approach combining cutting-edge AI with
            real-time monitoring
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.route} key={index}>
              <FeatureCard
                {...feature}
                delay={index * 0.2}
                origin={feature.origin}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
