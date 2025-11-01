import { motion } from "framer-motion";
import { ShieldCheck, Users, MapPin, HeartHandshake } from "lucide-react";
// import FloatingShape from "../components/FloatingShape";
// import SplineAnimation from "../components/SplineAnimation";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Optional Spline 3D Background */}
      {/* <SplineAnimation /> */}

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/70 z-0" />

      {/* Floating Shapes (Optional) */}
      {/* 
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.8} /> 
      */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Placeholder (Spline removed) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          />

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <p className="text-emerald-400 font-bold text-3xl mb-1 tracking-wider">
              ABOUT Alertify
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Empowering <span className="text-emerald-300">Women</span> Through{" "}
              <span className="text-emerald-300">Technology</span>
            </h2>

            <p className="text-lg text-gray-300 mb-5">
              Alertify is a revolutionary safety platform created by women, for
              women. Our mission is to leverage technology to create safer
              communities and empower women with tools for personal security and
              confidence.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                  title: "Safety First",
                  desc: "24/7 emergency features and real-time alerts",
                },
                {
                  icon: <Users className="w-6 h-6 text-emerald-400" />,
                  title: "Community",
                  desc: "Verified network of supportive women",
                },
                {
                  icon: <MapPin className="w-6 h-6 text-emerald-400" />,
                  title: "Location Tracking",
                  desc: "Share your location with trusted contacts",
                },
                {
                  icon: <HeartHandshake className="w-6 h-6 text-emerald-400" />,
                  title: "Support Network",
                  desc: "Immediate access to help when needed",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-900/50 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Learn More About Our Mission
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "24/7", label: "Support Available" },
              { number: "100+", label: "Safety Partners" },
              { number: "5+", label: "Years Protecting Women" },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-3xl font-bold text-emerald-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

