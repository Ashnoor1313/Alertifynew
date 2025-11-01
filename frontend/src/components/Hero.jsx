//Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingShape from "../components/FloatingShape";
import Robot from "../components/Robot"

const HeroSection = () => {
  return (
 
    <section className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* Floating background shapes */}
      {/* <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.8} /> */}
    
      

      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">

      <motion.div
       whileTap={{ scale: 0.97, rotate: -1 }}
  whileHover={{ scale: 1.01 }}
  transition={{ type: "spring", stiffness: 120, damping: 10, duration: 0.6 }}
  className="animate-float backdrop-blur-md bg-white/5 border border-emerald-500/20 rounded-3xl shadow-xl p-10 md:p-16 max-w-4xl mx-auto hover:shadow-emerald-500/30 transition-all"
>

 


          {/* Tagline */}
          <p className="text-emerald-400 font-medium mb-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-emerald-400"></span>
            Empowering Through Technology
            <span className="h-px w-8 bg-emerald-400"></span>
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your <span className="bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">Safety</span>, 
            Our <span className="bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text">Priority</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Sakhi provides immediate assistance, community support, and resources to help women navigate challenges and feel empowered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              <Link to="/signup">Get Started</Link>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-emerald-500 text-white font-medium rounded-full hover:bg-emerald-900/30 transition-all"
            >
              <Link to="/about">Learn More</Link>
            </motion.button>
          </div>
        </motion.div>
        

       
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-16 md:mt-24 relative"
        >
         
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-emerald-500/20 blur-3xl rounded-full z-0"></div>
        </motion.div>
      </div>

{/* Empowerment Pulse Bar */}
<div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
  <div className="relative h-20 bg-gradient-to-r from-green-800/60 to-emerald-900/70 backdrop-blur-md border-t border-emerald-400/10 shadow-inner flex items-center justify-center">

    {/* Glowing Pulse Line */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400 animate-pulse rounded-full blur-sm opacity-60"></div>
    </div>

    {/* Animated Words */}
    <div className="relative z-20 text-white text-center whitespace-nowrap overflow-hidden">
      <div className="animate-marquee text-lg font-semibold tracking-wider text-emerald-300">
        <span className="mx-8">Support</span>
        <span className="mx-8">Safety</span>
        <span className="mx-8">Empowerment</span>
        <span className="mx-8">Strength</span>
        <span className="mx-8">Unity</span>
      </div>
    </div>
  </div>
</div>

        <Robot/>
    </section>
    
  );
};

export default HeroSection;