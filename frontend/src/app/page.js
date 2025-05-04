'use client'
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // Import AOS styles
import Image from "next/image";
import Head from "next/head";
import { FaLightbulb, FaChartLine, FaUsers, FaGraduationCap, FaCommentDots, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMicrophone } from "react-icons/fa";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState('morning'); // Add this line
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    company: "",
    mobile_number: "",
    email: "",
    company_website: "",
    consent: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Animation happens only once
    });
  }, []);

  // Add useEffect to handle success message timeout
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Add useEffect to handle error message timeout
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/register", formData);
      if (response.data.success) {
        setSuccessMessage("Registration successful!");
        setErrorMessage("");
        setFormData({
          first_name: "",
          last_name: "",
          job_title: "",
          company: "",
          mobile_number: "",
          email: "",
          company_website: "",
          consent: false,
        });
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Head>
        <title>CogentSolutions Task</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="font-['Roboto',sans-serif] bg-gray-50">
        {/* Navigation */}
        <nav className=" shadow-md sticky top-0 z-50" style={{ backgroundColor: "rgb(23, 23, 23)" }} >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo for normal navbar */}
                  <Image
                    src="/images/cogent-logo-01.png" 
                    alt="im Event Logo"
                    width={140} // Adjust width as needed
                    height={60} // Adjust height as needed
                  />
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <a href="#about" className="text-white hover:text-purple-400 px-3 py-2 text-m font-bold">About Us</a>
                <a href="#speakers" className="text-white hover:text-purple-400 px-3 py-2 text-m font-bold">Speakers</a>
                <a href="#agenda" className="text-white hover:text-purple-400 px-3 py-2 text-m font-bold">Agenda</a>
                <a href="#register" className="text-white hover:text-purple-400 px-3 py-2 text-m font-bold">Register</a>
              </div>
              <div className="-mr-2 flex items-center md:hidden">
                <button 
                  type="button" 
                  className="bg-blue-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="absolute top-0 inset-x-0 p-1 transition transform origin-top-right md:hidden">
              <div className="rounded-4xl shadow-md ring-1 ring-white ring-opacity-5 overflow-hidden" style={{ backgroundColor: "rgb(23, 23, 23)" }}>
                <div className="px-5 pt-4 flex justify-center items-center">
                  {/* Centered Logo for mobile navbar */}
                  <Image
                    src="/images/cogent-logo-01.png" 
                    alt="im Event Logo"
                    width={100} // Adjust width as needed
                    height={30} // Adjust height as needed
                  />
                  <div className="absolute right-4">
                    <button
                      type="button"
                      className="bg-blue-950 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1 text-center">
                  <a href="#about" className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-purple-400 ">
                    About Us
                  </a>
                  <a href="#speakers" className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-purple-400 ">
                    Speakers
                  </a>
                  <a href="#agenda" className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-purple-400 ">
                    Agenda
                  </a>
                  <a href="#register" className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-purple-400 ">
                    Register
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="relative bg-indigo-800 overflow-hidden" data-aos="fade-up">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(128, 0, 128, 0.7)), url('/images/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "110vh",
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
            <div className="relative z-10 pb-70 sm:pb-64 md:pb-64 lg:pb-64 xl:pb-64"> 
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center">
                  <h1 className="text-lg tracking-tight font-extrabold text-gray-400 py-1">
                    <span className="block">Organised By:</span>
                  </h1>
                  <div className="block mx-auto">
                    <img
                      src="/images/finastra-boardroom.png"
                      alt="Hero Icon"
                      className="w-full max-w-md mx-auto"
                    />
                  </div>
                  <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl py-4">
                    <span className="block">Reimagine Banking:</span>
                    <span className="block text-purple-400">Adapt. Evolve. Thrive.</span>
                  </h1>
                </div>
              </main>
            </div>

            {/* Event Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 backdrop-filter backdrop-blur-sm py-4 mx-4 mb-6 rounded-3xl" style={{ backgroundColor: "rgb(23, 23, 23)" }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 justify-items-center items-center">
                  {/* Date */}
                  <div className="text-center">
                    <h4 className="text-xl font-medium text-purple-400 flex items-center justify-center gap-2">
                     <FaCalendarAlt className="h-5 w-5 text-purple-400" /> DATE 
                    </h4>
                    <p className="text-white text-lg">9th April 2025</p>
                  </div>
                  {/* Location */}
                  <div className="text-center">
                    <h4 className="text-xl font-medium text-purple-400 flex items-center justify-center gap-2">
                      <FaMapMarkerAlt className="h-5 w-5 text-purple-400" /> LOCATION 
                    </h4>
                    <p className="text-white text-lg">The Nile Ritz-Carlton, Cairo, Egypt</p>
                  </div>
                  {/* Time */}
                  <div className="text-center">
                    <h4 className="text-xl font-medium text-purple-400 flex items-center justify-center gap-2">
                      <FaClock className="h-5 w-5 text-purple-400" /> TIME 
                    </h4>
                    <p className="text-white text-lg">9:30 AM - 2:00 PM GMT+2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Overview */}
        <div
          id="about"
          className="py-12"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 128, 0.7), rgba(128, 0, 128, 0.7)), url('/images/headway-F2KRf_QfCqw-unsplash.jpg')", 
            backgroundSize: "cover", // Ensures the image covers the entire background
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tiling
          }}
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Event Overview
              </h2>
              <div className="mt-4 max-w-6xl text-lg lg:text-xl text-gray-200 mx-auto space-y-6">
                <p>
                  Join us on April 9th in Cairo, Egypt, for Finastra's Universal Banking Forum, "Reimagine Banking: Adapt. Evolve. Thrive." This exclusive event is designed to help you navigate and excel in the rapidly evolving banking landscape.
                </p>
                <p>
                  Our forum will bring together business and technology experts, industry leaders, and visionaries to share their insights on the latest trends and challenges in the banking sector. You'll gain valuable knowledge on topics such as Generative AI, the impact of volatility, globalization challenges, persistent supply chain issues, recession threats, shifts in competitive dynamics, and evolving regulations.
                </p>
                <p>
                  Each session will delve into the implications, challenges, and opportunities these topics present, providing you with practical strategies to leverage the latest technologies and capitalize on emerging opportunities. This is a unique chance to learn from the best in the industry, stay ahead of the curve, and connect with fellow retail banking professionals.
                </p>
                <p>
                  Don't miss this opportunity to enhance your knowledge, skills, and network in the finance and banking sector. Register today and secure your place at this must-attend event!
                </p>
              </div>

              {/* Reasons Section */}
              <div className="mt-12 bg-gradient-to-r from-purple-800 to-purple-600 rounded-3xl shadow-lg overflow-hidden" data-aos="fade-up">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                  {/* Left Image */}
                  <div className="relative p-8  lg:p-4 xl:p-16">
                    <img
                      src="/images/Finastra-UB-Egypt-Benefits-of-attending SMALL.jpg" 
                      alt="Conference"
                      className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="p-6 text-white flex flex-col justify-center text-left">
                    <h3 className="text-2xl font-bold mb-12">
                      Top Reasons Why This is the Only Conference You Need to Attend in 2025
                    </h3>
                    <ul className="space-y-4">

                      <li className="flex items-center text-xl justify-left">
                        <FaLightbulb className="h-6 w-6 text-white  mr-3" />
                        Learn from industry experts
                      </li>
        
                      <li className="flex items-center text-xl justify-left">
                        <FaChartLine className="h-6 w-6 text-white mr-3" />
                        Stay ahead of emerging trends
                      </li>
            
                      <li className="flex items-center text-xl justify-left">
                        <FaUsers className="h-6 w-6 text-white mr-3" />
                        Connect with fellow banking professionals
                      </li>
                    
                      <li className="flex items-center text-xl justify-left">
                        <FaGraduationCap className="h-6 w-6 text-white mr-3" />
                        Enhance your knowledge, skills, and network
                      </li>
           
                      <li className="flex items-center text-xl justify-left">
                        <FaCommentDots className="h-6 w-6 text-white mr-3" />
                        Share your expertise and experience with peers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       

        {/* Speakers Section */}
        <div
          id="speakers"
          className="py-12"
          style={{
            background: "linear-gradient(to right, #e9e9f7, #cac1d4)", 
          }}
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-purple-700 sm:text-4xl">
                Our Speakers
              </h2>
            </div>

            <div className="mt-10 flex justify-between items-center">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3  ">
                {/* Speaker 1 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/1s.png"
                    alt="Mr. Mohamed Elazzazy"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold text-purple-700">Mr. Mohamed Elazzazy</h3>
                    <p className="text-m text-purple-500">Head of IT Governance and Change Management, Al-Baraka Bank Egypt</p>
                  </div>
                </div>
                {/* Speaker 2 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/2s.jpg"
                    alt="Mr. Shehab Moustafa"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Shehab Moustafa</h3>
                    <p className="text-m text-purple-500">Country Center of Excellence Director, Money Fellows</p>
                  </div>
                </div>
                {/* Speaker 3 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/3s.jpg"
                    alt="Mr. Marwan Abouzeid"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Marwan Abouzeid</h3>
                    <p className="text-m text-purple-500">Principal Solutions Consultant & Customer Value Lead, MEA & APAC, Finastra</p>
                  </div>
                </div>
                {/* Speaker 4 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/4s.jpg"
                    alt="Mr. Karim El Mourabet"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Karim El Mourabet</h3>
                    <p className="text-m text-purple-500">Solution Consulting Director - MEA, Finastra</p>
                  </div>
                </div>
                {/* Speaker 5 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/5s.jpg"
                    alt="Ms. Siobhan Byron"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Ms. Siobhan Byron</h3>
                    <p className="text-m text-purple-500">Executive Vice President, Universal Banking, Finastra</p>
                  </div>
                </div>
                {/* Speaker 6 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/6s.jpg"
                    alt="Mr. Narendra Mistry"
                   className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Narendra Mistry</h3>
                    <p className="text-m text-purple-500">Chief Product and Technology Officer, Universal Banking, Finastra</p>
                  </div>
                </div>
                {/* Speaker 7 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/7s.png"
                    alt="Mr. Ahmed Hamdy Bahey El Din"
                   className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Ahmed Hamdy Bahey El Din</h3>
                    <p className="text-m text-purple-500">Head of Information Technology, Incolease</p>
                  </div>
                </div>
                {/* Speaker 8 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/8s.png"
                    alt="Mr. Emad Shawky Habib Hanna"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Emad Shawky Habib Hanna</h3>
                    <p className="text-m text-purple-500">Chief Data and Analytics Officer, Banque Misr</p>
                  </div>
                </div>
                {/* Speaker 9 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/9s.jpg"
                    alt="Ms. Heba Yehia"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Ms. Heba Yehia</h3>
                    <p className="text-m text-purple-500">Head of Digital Products, Arab African International Bank</p>
                  </div>
                </div>
                {/* Speaker 10 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/10s.jpg"
                    alt="Mr. Hamid Nirouzad"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Hamid Nirouzad</h3>
                    <p className="text-m text-purple-500">Managing Director - Africa, Finastra Universal</p>
                  </div>
                </div>
                {/* Speaker 11 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/11s.jpg"
                    alt="Mr. Rudy Kawmi"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Rudy Kawmi</h3>
                    <p className="text-m text-purple-500">Managing Director - Middle East, Africa & Asia-Pacific, Finastra Universal Banking</p>
                  </div>
                </div>
                {/* Speaker 12 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/12s.jpg"
                    alt="Mr. Matthew Hughes"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Matthew Hughes</h3>
                    <p className="text-m text-purple-500">Head of FS&I, International Markets Atos</p>
                  </div>
                </div>
                {/* Speaker 13 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/13s.jpg"
                    alt="Mr. Daragh O'Byrne"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Mr. Daragh O'Byrne</h3>
                    <p className="text-m text-purple-500">Senior Director, Marketing, Universal Banking, Finastra</p>
                  </div>
                </div>
                {/* Speaker 14 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/14s.jpg"
                    alt="Dr. Ismail Ali"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Dr. Ismail Ali</h3>
                    <p className="text-m text-purple-500">Co-Founder and CEO of CARITech</p>
                  </div>
                </div>
                {/* Speaker 15 */}
                <div className="bg-white rounded-4xl shadow-lg overflow-hidden text-center transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="/images/15s.png"
                    alt="Ms. Riham Muhammad"
                    className="w-full h-100 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-bold  text-purple-700">Ms. Riham Muhammad</h3>
                    <p className="text-m text-purple-500">Corporate CEX Senior Analyst, FABMISR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Section */}
        <div
          id="agenda"
          className="py-12 min-h-[600px] md:min-h-[800px] flex flex-col"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(72, 61, 139, 0.8), rgba(128, 0, 128, 0.9)), url('/images/flipsnack-LUqSTRx3_Ig-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          data-aos="fade-up"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
            <div className="text-center mb-8">
              <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Agenda
              </h2>
              <p className="mt-4 max-w-2xl text-xl font-bold text-gray-200 lg:mx-auto">
                Explore the schedule for the event and plan your day with insightful sessions and discussions.
              </p>
            </div>

            {/* Schedule Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                className={`px-6 py-3 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  activeSession === 'morning' ? 'bg-purple-700 font-bold text-white' : 'bg-gray-200 font-bold text-gray-700'
                }`}
                onClick={() => setActiveSession('morning')}
              >
                Morning Sessions (9:30 AM - 10:30 AM)
              </button>
              <button
                className={`px-6 py-3 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  activeSession === 'midday' ? 'bg-purple-700 font-bold text-white' : 'bg-gray-200 font-bold text-gray-700'
                }`}
                onClick={() => setActiveSession('midday')}
              >
                Mid-Day Sessions (11:00 AM - 12:30 PM)
              </button>
              <button
                className={`px-6 py-3 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  activeSession === 'afternoon' ? 'bg-purple-700 font-bold text-white' : 'bg-gray-200 font-bold text-gray-700'
                }`}
                onClick={() => setActiveSession('afternoon')}
              >
                Afternoon Sessions (1:00 PM - 2:00 PM)
              </button>
            </div>

            {/* Schedule Content */}
            <div className="min-h-[400px] md:h-[700px] overflow-y-auto">
              {activeSession === 'morning' && (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <FaClock className="text-purple-600 mr-2" />
                    <span className="text-purple-700 font-bold">09:30 AM - 10:30 AM</span>
                  </div>
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">09:30 AM</span>
                      <h3 className="text-lg font-bold text-gray-800">Registration & Welcome Coffee</h3>
                      <p className="text-gray-600">Start your day with networking and refreshments.</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">10:00 AM</span>
                      <h3 className="text-lg font-bold text-gray-800">Opening Remarks</h3>
                      <p className="text-gray-600">Rudy Kawmi, Managing Director - Middle East, Africa & Asia-Pacific, Finastra Universal Banking</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">10:10 AM</span>
                      <h3 className="text-lg font-bold text-gray-800">Keynote session: Digital Transformation in a Gen AI World</h3>
                      <p className="text-gray-600">Ms. Siobhan Byron, Executive Vice President, Finastra Universal Banking</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">10:30 AM</span>
                      <h3 className="text-lg font-bold text-gray-800"> Decoding the Future - Transformation: The Opportunity & Time is Now</h3>
                      <p className="text-gray-600">Mr. Daragh O'Byrne, Senior Director, Marketing, Universal Banking, Finastra</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSession === 'midday' && (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <FaClock className="text-purple-600 mr-2" />
                    <span className="text-purple-700 font-bold">11:00 AM - 12:30 PM</span>
                  </div>
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">11:00 AM</span>
                      <h3 className="text-lg font-bold text-gray-800">Panel Discussion: Customer Acquisition - Gaining New Customers in a Hyper Competitive World</h3>
                      <p className="text-gray-600">Hamid Nirouzad, Managing Director - Africa, Finastra Universal Banking Ahmad Hamdy, Head of Information Technology, International Company for Leasing S.A.E. “Incolease". Ms. Riham Ismail Kassem Muhammad, Corporate & Supporting Functions CEX Senior, FABMISR</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">11:30 AM</span>
                      <h3 className="text-lg font-bold text-gray-800">Panel Discussion: Customer Retention - Keeping Customers When Loyalty Is Dead</h3>
                      <p className="text-gray-600">Karim El Mourabet, Solution Consulting Director - Middle East & Africa, Finastra Universal Banking Heba Yehia, Head of Digital Products, Arab African International Bank; Ismail Ali, Co-Founder and CEO of CARITech Mohamed Elazzazy, Head of IT Governance and Change Management, Al-Baraka Bank Egypt</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">12:00 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">Coffee Break & Networking</h3>
                      <p className="text-gray-600">Take a break and connect with fellow attendees.</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">12:30 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">Panel Discussion: Cost to Serve: Deliver Customer Delight</h3>
                      <p className="text-gray-600">Narendra Mistry, Chief Product and Technology Officer, Finastra Universal Banking Shehab Moustafa, Country Center of Excellence Director, Money Fellows; Matthew Hughes, Head of FS&I, International Markets, Atos Emad Shawky Habib Hanna, Chief Data and Analytics Officer, Banque Misr.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSession === 'afternoon' && (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <FaClock className="text-purple-600 mr-2" />
                    <span className="text-purple-700 font-bold">1:00 PM - 2:00 PM</span>
                  </div>
                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">01:00 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">The Essential Elements: What do you need to be "all things to all people"?</h3>
                      <p className="text-gray-600">Narendra Mistry, Chief Product and Technology Officer, Finastra Universal Banking</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">01:30 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">Making the case for change: The Question is How</h3>
                      <p className="text-gray-600">Marwan Abouzeid, Principal Solutions Consultant & Customer Value Lead, MEA & APAC, Finastra Universal Banking</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">01:50 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">Closing Remarks</h3>
                      <p className="text-gray-600">Rudy Kawmi, Managing Director - Middle East, Africa & Asia-Pacific, Finastra Universal Banking</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <span className="text-purple-600 font-bold">02:00 PM</span>
                      <h3 className="text-lg font-bold text-gray-800">Lunch</h3>
                      <p className="text-gray-600">End your day with a Michelin Star Course at our expense.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Finastra Section */}
        <div
          id="about-finastra"
          className="py-12"
          style={{
            background: "linear-gradient(to bottom, #e9e9f7, #cac1d4)", // Light blue gradient
          }}
          data-aos="fade-up"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-purple-700 sm:text-4xl">
                About Finastra
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Learn more about Finastra, a global leader in financial services software.
              </p>
            </div>
            <div className="mt-5 text-lg text-gray-700 space-y-4 text-center">
              <p>
                Finastra is a global provider of financial services software applications across Lending, Payments, Treasury and Capital Markets, and Universal (retail and digital) Banking. Committed to unlocking the potential of people, businesses, and communities everywhere, its vision is to accelerate the future of Open Finance through technology and collaboration.
              </p>
              <p>
                Finastra's pioneering approach is why it is trusted by ~8,100 financial institutions, including 45 of the world's top 50 banks. For more information, visit <a href="https://www.finastra.com" className="text-blue-600 hover:underline">www.finastra.com</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Register Now Section */}
        <div 
          id="register" 
          className="py-12"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(72, 61, 139, 0.8), rgba(128, 0, 128, 0.9)), url('/images/pexels-fauxels-3183150.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
              {/* Left Image */}
              <div className="hidden md:block relative h-full">
                <img
                  src="/images/pexels-fauxels-3183150.jpg"
                  alt="Contact Us"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 opacity-0"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="max-w-lg text-center p-6">
                    <h3 className="text-4xl font-bold mb-4">Join the Future of Banking</h3>
                    <p className="text-xl ">Be part of an exclusive event that will shape the future of financial services.</p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="px-8 py-12"> 
                <div className="max-w-lg mx-auto">
                  <h2 className="text-4xl font-extrabold text-center tracking-tight text-purple-800 mb-4"> 
                    Let's partner up
                  </h2>
                  <p className="text-xl text-center text-gray-700 mb-12"> 
                    Let's level up your brand, together.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4"> 
                    <div>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="mobile_number"
                        placeholder="Mobile Number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="job_title"
                        placeholder="Job Title"
                        value={formData.job_title}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        name="company_website"
                        placeholder="Company Website URL"
                        value={formData.company_website}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                        By filling out the registration form to attend our event, you agree and consent to Cogent Solutions' <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    <div className="mt-12"> 
                      <button
                        type="submit"
                        className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors shadow-lg hover:shadow-xl"
                      >
                        Register Now
                      </button>
                    </div>
                  </form>
                  {successMessage && <p className="mt-4 text-green-600 bg-white/80 p-3 rounded-lg">{successMessage}</p>}
                  {errorMessage && <p className="mt-4 text-red-600 bg-white/80 p-3 rounded-lg">{errorMessage}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black" style={{ backgroundColor: "rgb(23, 23, 23)" }}>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo and Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Cogent Solutions™</h2>
                <p className="text-gray-300 text-base">
                Through our conferences we transform your business challenges into opportunities. Our clients and customers are leading government entities and the fortune 500 companies.
                </p>
                <p className="text-gray-300 text-sm">
                 © 2025 Cogent Solutions Event Management LLC. All Right Reserved (Assessment by Dakshina Perera)
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-gray-300 hover:text-white">About Us</a>
                  </li>
                  <li>
                    <a href="#agenda" className="text-gray-300 hover:text-white">Agenda</a>
                  </li>
                  <li>
                    <a href="#speakers" className="text-gray-300 hover:text-white">Speakers</a>
                  </li>
                  <li>
                    <a href="#register" className="text-gray-300 hover:text-white">Register</a>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Our Offices</h3>
                <p className="text-gray-300">
                  <span className="py-2 flex items-center ">
                    <span>
                      <FaMapMarkerAlt className="text-purple-400 mr-4 text-2xl" />
                    </span>
                    Middle East & Africa HQ Office No: 209, The Metropolis Tower Business Bay, Dubai, United Arab Emirates
                  </span>
                  <span className="py-2 flex items-center">
                    <span>
                     <FaMapMarkerAlt className="text-purple-400 mr-4 text-2xl" />
                    </span>
                    Asia Pacific HQ 7th floor Green Lanka Tower, Colombo Sri Lanka
                  </span>
                  <span className="py-2 flex items-center">
                    <span>
                      <FaMapMarkerAlt className="text-purple-400 mr-4 text-2xl" />
                    </span>                 
                    Saudi Arabia HQ Riyadh, Saudi Arabia
                  </span>
                  <span className="py-2 flex items-center">
                    <span>
                       <FaEnvelope className="text-purple-400 mr-4 text-2xl" />
                    </span>
                     <a href="mailto:info@cogentsolutions.ae" className="text-gray-300 hover:text-white">partnerships@cogentsolutions.ae</a>
                  </span>
                  <span className="py-2 flex items-center">
                    <span>
                      <FaPhone className="text-purple-400 mr-4 text-2xl" />
                    </span>
                     +971 50 5718867
                  </span>
                </p>
              </div>
            </div>

            {/* Awards Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white text-center">Awards & Recognition</h3>
              <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
                <img
                  src="/images/BPW-2024_2.png" 
                  alt="Award 1"
                  className="h-25 object-contain"
                />
                <img
                  src="/images/bestwork-03.png" 
                  alt="Award 2"
                  className="h-25 object-contain"
                />
                <img
                  src="/images/bestwork-04.png" 
                  alt="Award 3"
                  className="h-25 object-contain"
                />
                <img
                  src="/images/bestwork-01.png" 
                  alt="Award 4"
                  className="h-25 object-contain"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 border-t border-gray-700 pt-8 flex justify-center space-x-6">
              <a href="https://www.facebook.com/cseventsuae/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="https://x.com/cseventsdxb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/company/cogent-solutions-event-management/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedinIn className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/cs_event_management/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}