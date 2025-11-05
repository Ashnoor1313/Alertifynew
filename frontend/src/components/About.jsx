//About.jsx
import { motion } from "framer-motion";
import { ShieldCheck, Users, MapPin, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center relative overflow-hidden py-20"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16">
        
        {/* LEFT TEXT AREA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <p className="text-emerald-400 tracking-widest font-semibold text-xl -mt-40 mb-2">
            ABOUT ALERTIFY
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Empowering with{" "}
            <span className="text-emerald-300">Smart Safety Tech</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Alertify builds modern digital safety tools to detect scams, alert loved ones,
            and create a strong support network — designed for real-world protection.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            Know Our Mission
          </motion.button>
        </motion.div>

        {/* RIGHT FEATURES GRID */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 -mt-40 sm:grid-cols-2 gap-6"
        >
          {[
           { icon: <ShieldCheck className="w-7 h-7 text-emerald-300" />, 
  title: "Fraud Shield", 
  desc: "AI-powered scam and fraud detection" 
},

{ icon: <Users className="w-7 h-7 text-emerald-300" />, 
  title: "Verified Network", 
  desc: "Community-backed reporting & alerts" 
},

{ icon: <MapPin className="w-7 h-7 text-emerald-300" />, 
  title: "Live Safety Tracking", 
  desc: "Share real-time location securely" 
},

{ icon: <HeartHandshake className="w-7 h-7 text-emerald-300" />, 
  title: "Rapid Response Hub", 
  desc: "Quick SOS, emergency call & contacts" 
}].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-800/50 border border-emerald-500/20 backdrop-blur-md p-6 rounded-2xl hover:border-emerald-400 shadow-md hover:shadow-emerald-400/20 transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="bg-emerald-900/40 w-fit p-3 rounded-xl">{item.icon}</div>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* STATS RIBBON */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-14 w-[90%] ml-10 mx-auto left-1 transform -translate-x-1/2 bg-gray-800/40 backdrop-blur-lg border border-emerald-400/20 rounded-2xl p-6 shadow-xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4  text-center">
          {[
            { num: "10K+", label: "Active Users" },
            { num: "24/7", label: "Live Support" },
            { num: "120+", label: "Safety Partners" },
            { num: "5 Years", label: "Trust & Protection" },
          ].map((s, i) => (
            <div key={i} className="py-2">
              <p className="text-2xl md:text-3xl font-bold text-emerald-300">{s.num}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
