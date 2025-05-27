"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Leaf,
  Zap,
  Palette,
  Globe,
  Package,
  Share2,
  ArrowRight,
  Star,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Play,
} from "lucide-react"

export default function ByteBloomStudio() {
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  }

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  }

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#F4F7F5] flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#A0F0D1] border-t-[#3FA96B] rounded-full mx-auto mb-4"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-[#333840]"
          >
            ByteBloom Studio
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#333840] overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#3FA96B] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 bg-[#F4F7F5]/90 backdrop-blur-md z-40 border-b border-[#A0F0D1]/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3FA96B] to-[#A0F0D1] rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ByteBloom</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Services", "Portfolio", "Contact"].map((item) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`} whileHover={{ y: -2 }} className="relative group">
                  {item}
                  <motion.div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3FA96B] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#3FA96B] hover:bg-[#3FA96B]/90 text-white">Get Started</Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F4F7F5] border-t border-[#A0F0D1]/20"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {["About", "Services", "Portfolio", "Contact"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <Button className="w-full bg-[#3FA96B] hover:bg-[#3FA96B]/90 text-white">Get Started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#3FA96B]/10 to-[#A0F0D1]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#A0F0D1]/10 to-[#3FA96B]/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-[#A0F0D1]/20 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-[#3FA96B]" />
              <span className="text-sm font-medium">Eco-Tech Branding Experts</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#3FA96B] to-[#A0F0D1] bg-clip-text text-transparent">
              ByteBloom
            </span>
            <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Studio
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[#333840]/80"
          >
            We design sleek, modern brand identities for eco-tech startups. From logos to websites, we help green
            businesses bloom online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-[#3FA96B] hover:bg-[#3FA96B]/90 text-white px-8 py-4 text-lg">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-[#3FA96B] text-[#3FA96B] hover:bg-[#3FA96B] hover:text-white px-8 py-4 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </Button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block"
            >
              <ChevronDown className="w-8 h-8 text-[#3FA96B]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft}>
              <Badge className="mb-4 bg-[#A0F0D1]/20 text-[#3FA96B] border-[#A0F0D1]">About ByteBloom</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Growing Green Brands in the Digital Ecosystem</h2>
              <p className="text-lg mb-6 text-[#333840]/80">
                At ByteBloom Studio, we believe that sustainable businesses deserve exceptional design. We specialize in
                creating modern, tech-forward brand identities that help eco-conscious startups stand out in the digital
                landscape.
              </p>
              <div className="space-y-4">
                {[
                  "5+ Years of Design Excellence",
                  "50+ Eco-Tech Brands Launched",
                  "100% Sustainable Design Process",
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#3FA96B]" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="relative">
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }} className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop&crop=faces"
                  alt="ByteBloom Studio Team"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#3FA96B] to-[#A0F0D1] rounded-full flex items-center justify-center"
                >
                  <Leaf className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#A0F0D1]/20 text-[#3FA96B] border-[#A0F0D1]">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete Brand Solutions for Eco-Tech Startups</h2>
            <p className="text-lg text-[#333840]/80 max-w-3xl mx-auto">
              From concept to launch, we provide comprehensive branding services that help your green business thrive in
              the digital world.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Palette,
                title: "Logo Design",
                description: "Memorable logos that capture your eco-tech vision",
                color: "from-[#3FA96B] to-[#A0F0D1]",
              },
              {
                icon: Globe,
                title: "Web Design",
                description: "Modern, responsive websites that convert visitors",
                color: "from-[#A0F0D1] to-[#3FA96B]",
              },
              {
                icon: Package,
                title: "Packaging",
                description: "Sustainable packaging design that stands out",
                color: "from-[#3FA96B] to-[#333840]",
              },
              {
                icon: Share2,
                title: "Social Media",
                description: "Cohesive social media branding and templates",
                color: "from-[#A0F0D1] to-[#333840]",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-[#333840]/80">{service.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-6 inline-flex items-center text-[#3FA96B] font-medium"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#A0F0D1]/20 text-[#3FA96B] border-[#A0F0D1]">Our Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Brands We've Helped Bloom</h2>
            <p className="text-lg text-[#333840]/80 max-w-3xl mx-auto">
              Discover how we've transformed eco-tech startups with stunning brand identities that drive growth and
              engagement.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "EcoFlow Energy",
                category: "Solar Tech Startup",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
                description: "Complete rebrand for renewable energy platform",
              },
              {
                title: "GreenTech Labs",
                category: "Sustainable Innovation",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
                description: "Modern identity for green technology incubator",
              },
              {
                title: "PlantBase Co",
                category: "Eco-Friendly Products",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
                description: "Packaging design for plant-based product line",
              },
              {
                title: "CleanWave",
                category: "Water Technology",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
                description: "Brand identity for water purification startup",
              },
              {
                title: "SolarSync",
                category: "Smart Energy",
                image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
                description: "Digital branding for solar management app",
              },
              {
                title: "EcoVenture",
                category: "Green Investment",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
                description: "Professional identity for eco-investment firm",
              },
            ].map((project, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="group overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#3FA96B]/80 to-transparent flex items-end"
                    >
                      <div className="p-6 text-white">
                        <Badge className="mb-2 bg-white/20 text-white border-white/30">{project.category}</Badge>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-[#333840]/80">{project.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-4 inline-flex items-center text-[#3FA96B] font-medium"
                    >
                      View Project
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-[#3FA96B]/5 to-[#A0F0D1]/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#A0F0D1]/20 text-[#3FA96B] border-[#A0F0D1]">Client Love</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Chen",
                role: "CEO, EcoFlow Energy",
                content:
                  "ByteBloom transformed our brand completely. The new identity perfectly captures our mission and has helped us attract top-tier investors.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Marcus Rodriguez",
                role: "Founder, GreenTech Labs",
                content:
                  "Working with ByteBloom was incredible. They understood our vision and created a brand that truly represents our values and innovation.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Emily Watson",
                role: "CMO, PlantBase Co",
                content:
                  "The packaging design ByteBloom created for us increased our sales by 40%. Their attention to detail and creativity is unmatched.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#333840]/80 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-[#333840]/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#A0F0D1]/20 text-[#3FA96B] border-[#A0F0D1]">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Bloom?</h2>
            <p className="text-lg text-[#333840]/80 max-w-3xl mx-auto">
              Let's discuss your project and create a brand identity that helps your eco-tech startup flourish in the
              digital landscape.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16"
          >
            <motion.div variants={slideInLeft}>
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input placeholder="Your Name" className="border-[#A0F0D1]/30 focus:border-[#3FA96B]" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          placeholder="Your Email"
                          type="email"
                          className="border-[#A0F0D1]/30 focus:border-[#3FA96B]"
                        />
                      </motion.div>
                    </div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input placeholder="Project Budget" className="border-[#A0F0D1]/30 focus:border-[#3FA96B]" />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        placeholder="Tell us about your project..."
                        rows={5}
                        className="border-[#A0F0D1]/30 focus:border-[#3FA96B]"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-[#3FA96B] hover:bg-[#3FA96B]/90 text-white py-3">
                        Send Message
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={slideInRight} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's start a conversation</h3>
                <p className="text-[#333840]/80 mb-8">
                  We're excited to learn about your eco-tech startup and discuss how we can help you create a brand that
                  makes a lasting impact.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop"
                  alt="Office workspace"
                  className="rounded-lg shadow-lg w-full h-48 object-cover mb-8"
                />
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    title: "Email Us",
                    content: "hello@bytebloomstudio.com",
                    description: "Drop us a line anytime",
                  },
                  {
                    icon: "📱",
                    title: "Call Us",
                    content: "+1 (555) 123-4567",
                    description: "Mon-Fri from 9am to 6pm",
                  },
                  {
                    icon: "📍",
                    title: "Visit Us",
                    content: "San Francisco, CA",
                    description: "Schedule a meeting",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <h4 className="font-bold">{contact.title}</h4>
                      <p className="text-[#3FA96B] font-medium">{contact.content}</p>
                      <p className="text-sm text-[#333840]/60">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333840] text-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3FA96B] to-[#A0F0D1] rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ByteBloom</span>
              </div>
              <p className="text-white/80 mb-6">
                Creating beautiful, sustainable brand identities for eco-tech startups worldwide.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    name: "Twitter",
                    icon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop",
                  },
                  {
                    name: "LinkedIn",
                    icon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop",
                  },
                  {
                    name: "Instagram",
                    icon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop",
                  },
                  {
                    name: "Dribbble",
                    icon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#3FA96B] transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="w-5 h-5 bg-white/60 rounded"></div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-white/80">
                {["Logo Design", "Web Design", "Packaging", "Social Media", "Brand Strategy"].map((service) => (
                  <li key={service}>
                    <motion.a href="#" whileHover={{ x: 5 }} className="hover:text-[#A0F0D1] transition-colors">
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-white/80">
                {["About", "Portfolio", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <motion.a href="#" whileHover={{ x: 5 }} className="hover:text-[#A0F0D1] transition-colors">
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-white/80 mb-4">Get design tips and eco-tech insights delivered to your inbox.</p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="ml-2 bg-[#3FA96B] hover:bg-[#3FA96B]/90">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-t border-white/20 mt-12 pt-8 text-center text-white/60"
          >
            <p>&copy; 2024 ByteBloom Studio. All rights reserved. Made with 💚 for a sustainable future.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
