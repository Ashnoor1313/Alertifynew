import React from "react";

const testimonials = [
  {
    name: "Riya Kapoor",
    role: "Student, DU",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    feedback:
      "Sakhi has helped me understand how to avoid digital scams. Super easy to use and informative!",
  },
  {
    name: "Amit Singh",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    feedback:
      "Very helpful community! I avoided a phishing scam just by reading someone’s shared experience here.",
  },
  {
    name: "Sneha Das",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback:
      "This website builds awareness in a very interactive and reliable way. Loved the community aspect!",
  },
  {
    name: "Rajeev Mehra",
    role: "IT Consultant",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    feedback:
      "I recommend Sakhi to everyone. It’s a must-have for staying ahead of online frauds!",
  },
  {
    name: "Priya Verma",
    role: "Housewife",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback:
      "After seeing a post on Sakhi, I realized I was being targeted in a KYC scam. Thank you for saving me!",
  },
  {
    name: "Kunal Bhatt",
    role: "College Student",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    feedback:
      "Clean UI, great community, and relevant alerts. Sakhi is like a digital guardian for students!",
  },
];

const TestimonialPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white p-10">
      
      {/* Left: Testimonials Box */}
      <div className="md:w-1/2 bg-black/20 rounded-xl p-9 overflow-y-auto h-[85vh] mr-4 border border-emerald-500 shadow-lg scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-700">
        <h2 className="text-3xl font-bold text-emerald-300 mb-6 text-center">🌟 What Our Users Say</h2>
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-black/40 rounded-lg p-4 mb-4 shadow hover:shadow-emerald-500/30 transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full border border-emerald-400 object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold text-green-200">{item.name}</h4>
                <p className="text-sm text-gray-300">{item.role}</p>
              </div>
            </div>
            <p className="text-sm text-white/90">{item.feedback}</p>
          </div>
        ))}
      </div>

      {/* Right: Design + Quote or Image */}
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center px-6">
        <img
          src="https://img.freepik.com/free-vector/flat-design-customer-support_23-2148887720.jpg"
          alt="Feedback"
          className="w-full max-w-md mb-6 rounded-xl shadow-xl"
        />
        <blockquote className="italic text-lg text-emerald-200">
          “Together, we create a safer digital world — one story at a time.”
        </blockquote>
        <p className="mt-2 text-sm text-gray-300">
          Join Sakhi and help protect others by sharing your experiences.
        </p>
      </div>
    </div>
  );
};

export default TestimonialPage;
