import React from "react";
import { Coins, MonitorSmartphone, BadgePercent } from "lucide-react";
import FloatingShape from "../components/FloatingShape";
import AdMarquee from "../components/AdMarquee";

const benefits = [
  {
    icon: <Coins className="w-6 h-6 text-yellow-500" />,
    title: "Earn SuperCoins",
    desc: "Verify headlines and get rewarded with SuperCoins to use across the platform.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-blue-500" />,
    title: "Ad-Free Experience",
    desc: "Use your coins to unlock an ad-free, focused browsing experience.",
  },
  {
    icon: <BadgePercent className="w-6 h-6 text-pink-500" />,
    title: "Exclusive Perks",
    desc: "Redeem exclusive rewards like vouchers, badges, and early access tools.",
  },
];

export default function GroundTruthBenefits() {
  return (
    <section className="relative py-24 px-6 md:px-24 bg-gradient-to-br from-emerald-700 via-emerald-900 to-black overflow-hidden text-white">

      {/* Floating background shapes */}
      {/* <FloatingShape color="bg-green-500" size="w-64 h-64" top="10%" left="5%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="60%" left="75%" delay={0.5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="85%" delay={0.8} /> */}

      {/* ✨ Glow Background */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-green-400 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-10">

      
        {/* 🌟 Empowerment Pulse Bar */}
        {/* <div className="overflow-hidden z-10">
          <div className="relative h-20 bg-gradient-to-r from-green-800/60 to-emerald-900/70 backdrop-blur-md border-t border-emerald-400/10 shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400 animate-pulse rounded-full blur-sm opacity-60"></div>
            </div>
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
        </div> */}

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Your Truth, Your Rewards
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Empower yourself and your community while unlocking SuperCoins and perks.
        </p>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 text-left shadow-xl hover:shadow-purple-500/20 transition-all"
            >
              <div className="mb-4 p-3 bg-zinc-800 rounded-full inline-flex">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-10">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-semibold hover:scale-105 transition-all">
            Start Earning SuperCoins
          </button>
        </div>
      </div>
    </section>
  );
}
