import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("http://localhost:5000/api/contacts/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ fullName: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        console.error(data.error || "Unknown backend error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 3000);
  };

  const messageVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 20 } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-5xl">💬</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Let's{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              Connect
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </motion.div>

        {/* Form + Info Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden group hover:bg-white/8 transition-all duration-300"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  Send a Message
                </h3>

                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="group/input">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <span className="text-blue-400">👤</span> Full Name
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/50 text-white outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/15"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group/input">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <span className="text-purple-400">✉️</span> Email Address
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      type="email"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/50 text-white outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/15"
                      required
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="group/input">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <span className="text-pink-400">📋</span> Subject
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={onChange}
                      placeholder="Project Inquiry"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/50 text-white outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all duration-300 hover:bg-white/15"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="group/input">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <span className="text-green-400">💬</span> Your Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/50 text-white outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 resize-none hover:bg-white/15"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 text-base flex justify-center items-center gap-3 shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-3 border-t-white border-r-white/30 border-b-white/30 border-l-white/30 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span> <span className="text-xl">📩</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-400/30 backdrop-blur-sm"
                    >
                      <p className="text-center text-green-300 font-semibold flex items-center justify-center gap-2">
                        <span className="text-xl">✅</span>
                        Message sent successfully! Check on your email.
                      </p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm"
                    >
                      <p className="text-center text-red-300 font-semibold flex items-center justify-center gap-2">
                        <span className="text-xl">❌</span>
                        Failed to send message. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Info Cards - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Location Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/8 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  📍
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Location</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Musanze, Ruhengeri<br/>
                    Rwanda 🇷🇼
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/8 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  ⏱️
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Response Time</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I typically respond within<br/>
                    <span className="text-purple-400 font-semibold">1 hour</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:bg-white/8 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  🟢
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Availability</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Open for new projects
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                title="Musanze, Ruhengeri, Rwanda"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63902.49006753492!2d29.5949!3d-1.5007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc5a43629d20ad%3A0xcedbfcad56509e1b!2sRuhengeri!5e0!3m2!1sen!2srw!4v1734712312345!5m2!1sen!2srw"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;