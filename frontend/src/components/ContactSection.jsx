import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your backend integration or email service here
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white p-8">
      
      {/* Left Info */}
      <div className="md:w-1/2 flex flex-col justify-center mb-10 md:mb-0 pr-6">
        <h2 className="text-4xl font-bold text-emerald-300 mb-4">📬 Get in Touch</h2>
        <p className="text-lg text-green-100 mb-6">
          Got questions, feedback, or want to contribute to Sakhi? Reach out and we’ll get back to you soon!
        </p>
        <img
          src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
          alt="Contact Illustration"
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>

      {/* Right Contact Form */}
      <div className="md:w-1/2 bg-black/30 rounded-xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 rounded bg-black/40 text-white placeholder-gray-400 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 rounded bg-black/40 text-white placeholder-gray-400 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            placeholder="Your Message"
            className="p-3 rounded bg-black/40 text-white placeholder-gray-400 border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded shadow-lg transition"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
