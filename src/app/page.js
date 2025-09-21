"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle,
  FileUp,
  Filter,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">TalentFlow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </a>
          </nav>
          <a
            href="/process-resumes"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105 shadow"
          >
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-indigo-50 via-white to-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Hire Smarter, Not Harder
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Stop drowning in resumes. Our AI-powered agent analyzes, scores,
                and ranks hundreds of CVs in minutes, so you can focus on
                interviewing the best candidates.
              </p>
              <div className="mt-10 flex justify-center items-center space-x-4">
                <a
                  href="/process-resumes"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
                >
                  Process Resumes Now
                  <ArrowRight className="ml-2 h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            {/* Placeholder for a visually engaging graphic or product screenshot */}
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="bg-white p-2 rounded-xl shadow-2xl border border-gray-200">
                <Image
                  src="https://placehold.co/1200x600/E9E8FD/4F46E5?text=Product+Dashboard+UI&font=inter"
                  alt="Product Dashboard Screenshot"
                  className="rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/1200x600/E9E8FD/4F46E5?text=App+Preview&font=inter";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                The Power of Automated Screening
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to find the perfect candidate, faster than
                ever.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <FileUp className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Bulk Resume Upload
                </h3>
                <p className="mt-2 text-gray-600">
                  Process hundreds of resumes at once by uploading PDF, DOCX, or
                  a single ZIP file.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  AI-Powered Analysis
                </h3>
                <p className="mt-2 text-gray-600">
                  Leverages Google's Gemini to intelligently extract and
                  structure key information from any CV format.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <Filter className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Intelligent Job Matching
                </h3>
                <p className="mt-2 text-gray-600">
                  Automatically scores and ranks candidates based on your
                  specific job requirements and skills.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Instant Screening
                </h3>
                <p className="mt-2 text-gray-600">
                  Reduce time-to-hire by weeks. Get a ranked list of top
                  candidates in minutes, not days.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Automated Notifications
                </h3>
                <p className="mt-2 text-gray-600">
                  Automatically sends assessment invitations to qualified
                  candidates, keeping your pipeline moving.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 20V10H8V20Z" />
                    <path d="M12 10V4H18V10Z" />
                    <path d="M12 10L18 4L22 8L16 14H12Z" />
                    <path d="M8 20L4 16L8 12Z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Data-Driven Insights
                </h3>
                <p className="mt-2 text-gray-600">
                  Get a clear overview of your talent pool with dashboards and
                  processing summaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Get Started in 3 Simple Steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-600 text-white font-bold text-2xl border-4 border-indigo-200 shadow-lg">
                  1
                </div>
                <h3 className="mt-6 text-xl font-bold">Define Your Job</h3>
                <p className="mt-2 text-gray-600">
                  Enter the job title, description, and key skills you're
                  looking for.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-600 text-white font-bold text-2xl border-4 border-indigo-200 shadow-lg">
                  2
                </div>
                <h3 className="mt-6 text-xl font-bold">Upload Resumes</h3>
                <p className="mt-2 text-gray-600">
                  Drag and drop your folder of resumes or upload a ZIP file in
                  seconds.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-600 text-white font-bold text-2xl border-4 border-indigo-200 shadow-lg">
                  3
                </div>
                <h3 className="mt-6 text-xl font-bold">Get Ranked Results</h3>
                <p className="mt-2 text-gray-600">
                  Receive an instant, ranked list of the most qualified
                  candidates for your role.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ready to Revolutionize Your Hiring?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Spend less time screening and more time connecting with top
                talent. Try TalentFlow today and build your dream team.
              </p>
              <div className="mt-8">
                <a
                  href="/process-resumes"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
                >
                  Start Processing for Free
                  <ArrowRight className="ml-2 h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-7 w-7" />
              <span className="text-xl font-bold">TalentFlow</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p>
                &copy; {new Date().getFullYear()} TalentFlow. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
