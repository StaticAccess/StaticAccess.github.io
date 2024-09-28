'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Github, Linkedin, FileDown, ExternalLink, Menu, Sun, Moon, Mail, Phone, XIcon,Award, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { Caveat, Inter } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

const caveat = Caveat({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

const socialIcons = [
  { Icon: Github, href: 'https://github.com/StaticAccess' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/soubhagyaranjan2000/' },
  { Icon:  XIcon, href: 'https://x.com/SoubhagyaDas_'}
]

const sections = ['about', 'skills', 'projects', 'blog', 'certifications', 'contact'];

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState("about")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRefs = useRef(sections.map(() => React.createRef<HTMLElement>()))

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = window.innerHeight
      const scrollPosition = window.scrollY

      sections.forEach((section, index) => {
        const element = sectionRefs.current[index].current
        if (element) {
          const offsetTop = (element as HTMLElement).offsetTop
          if (scrollPosition >= offsetTop - pageHeight / 2 && scrollPosition < offsetTop + (element as HTMLElement).offsetHeight - pageHeight / 2) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} ${inter.className}`}>
      <nav className={`md:fixed md:top-0 md:left-0 md:h-screen md:w-64 md:p-8 md:overflow-y-auto transition-colors duration-300 ease-in-out ${isDarkMode ? 'md:bg-gray-800' : 'md:bg-white'}`}>
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${caveat.className} mb-8`}
          >
            <h1 className="text-3xl font-bold mb-2">Soubhagyaranjan Das</h1>
            <h2 className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Software Engineer</h2>
          </motion.div>
          <ul className="space-y-4">
            {sections.map((section) => (
              <motion.li key={section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: sections.indexOf(section) * 0.1 }}
              >
                <a
                  href={`#${section}`}
                  className={`${caveat.className} transition-all duration-300 ease-in-out ${
                    isDarkMode ? 'hover:text-white' : 'hover:text-black'
                  } ${
                    activeSection === section
                      ? `text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`
                      : 'text-lg'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="flex space-x-4 mt-8">
            {socialIcons.map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 left-0 right-0 p-4 z-50 transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${caveat.className}`}
          >
            <h1 className="text-2xl font-bold">Soubhagyaranjan Das</h1>
            <h2 className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Software Engineer</h2>
          </motion.div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className={`rounded-full transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white hover:bg-gray-700' 
                  : 'text-gray-900 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button variant="ghost" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              className="mt-4 space-y-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sections.map((section) => (
                <motion.li key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: sections.indexOf(section) * 0.1 }}
                >
                  <a
                    href={`#${section}`}
                    className={`${caveat.className} block py-2 transition-all duration-300 ease-in-out ${
                      isDarkMode ? 'hover:text-white' : 'hover:text-black'
                    } ${
                      activeSection === section
                        ? `text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`
                        : 'text-lg'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                      setIsMenuOpen(false)
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <main className="md:ml-64 p-4 md:p-8">
        <Button
          variant="ghost"
          size="icon"
          className={`fixed top-4 right-4 z-50 rounded-full transition-colors duration-300 md:flex hidden ${
            isDarkMode 
              ? 'text-white hover:bg-gray-700' 
              : 'text-gray-900 hover:bg-gray-200'
          }`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
        <AboutSection ref={sectionRefs.current[0]} isDarkMode={isDarkMode} />
        <SkillsSection ref={sectionRefs.current[1]} isDarkMode={isDarkMode} />
        <ProjectsSection ref={sectionRefs.current[2]} setSelectedProject={setSelectedProject} isDarkMode={isDarkMode} />
        <BlogSection ref={sectionRefs.current[3]} isDarkMode={isDarkMode} />
        <CertificationsSection ref={sectionRefs.current[4]} isDarkMode={isDarkMode} />
        <ContactSection ref={sectionRefs.current[5]} isDarkMode={isDarkMode} />
      </main>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} isDarkMode={isDarkMode} />
    </div>
  )
}

const SectionWrapper = React.forwardRef(({ children, title, id, isDarkMode }:{ children: React.ReactNode, title: string, id: string, isDarkMode: boolean }, ref:React.Ref<HTMLElement>) => (
  <section
    id={id}
    ref={ref}
    className="mb-16"
  >
    <h2 className={`${caveat.className} text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h2>
    {children}
  </section>
))
SectionWrapper.displayName = 'SectionWrapper';


const AboutSection = React.forwardRef<HTMLElement, { isDarkMode: boolean }>(({ isDarkMode }, ref) => (
  <SectionWrapper title="About Me" id="about" ref={ref} isDarkMode={isDarkMode}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="mb-6 text-lg text-justify" >
      I am a software engineer based in India, with expertise in machine learning, networking, cybersecurity, and DBMS. As a fresher, I am focused on contributing to projects that make a positive impact, while enhancing my skills in the software development life cycle and the .NET framework.
      

     </p>
      <p className="mb-6 text-lg">
        
      </p>
    </motion.div>
    <motion.div 
      className="flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <Button asChild className={`${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} hover:opacity-90 transition-all duration-300 transform hover:scale-105`}>
        <a href="/d/resume_SoubhagyaranjanDas_kiit_2370435_SEP12.pdf" download="resume_SoubhagyaranjanDas.pdf">
          <FileDown className="mr-2 h-4 w-4" /> Download Résumé
        </a>
      </Button>
      <Button asChild variant="outline" className={`${isDarkMode ? 'border-white text-white hover:bg-gray-800' : 'border-gray-900 text-gray-900 hover:bg-gray-100'} transition-all duration-300 transform hover:scale-105`}>
        <a href="https://github.com/StaticAccess" target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> GitHub
        </a>
      </Button>
      <Button asChild variant="outline" className={`${isDarkMode ? 'border-white text-white hover:bg-gray-800' : 'border-gray-900 text-gray-900 hover:bg-gray-100'} transition-all duration-300 transform hover:scale-105`}>
        <a href="https://www.linkedin.com/in/soubhagyaranjan2000/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </a>
      </Button>
    </motion.div>
  </SectionWrapper>
))
AboutSection.displayName = 'AboutSection';


const SkillsSection = React.forwardRef<HTMLElement, { isDarkMode: boolean }>(({ isDarkMode }, ref) => {
  const skills = {
    "Programming Languages": ["Python", "Java", "C", "C#", "JavaScript","SQL"],
    "Libraries & Frameworks": ["React", "Next.js", "Pandas", "Numpy", "Tailwind CSS","Flask"],
    "Tools & Technologies": ["Git & Github", "Docker","RESTful APIs"],
    "Databases": ["Radis", "SqlLite","Sql Alchemy"],
  }

  return (
    <SectionWrapper title="Skills" id="skills" ref={ref} isDarkMode={isDarkMode}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillList], index) => (
          <motion.div 
            key={category} 
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <h3 className={`${caveat.className} text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{category}</h3>
            <ul className="space-y-2">
              {skillList.map((skill, skillIndex) => (
                <motion.li
                  key={skillIndex}
                  className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05), ease: "easeOut" }}
                >
                  <span className={`mr-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>•</span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
})
SkillsSection.displayName = 'SkillsSection';

const ProjectsSection =  React.forwardRef(({ setSelectedProject, isDarkMode }: { setSelectedProject: React.Dispatch<React.SetStateAction<null>>, isDarkMode: boolean }, ref: React.Ref<HTMLElement>) => {
  console.log(setSelectedProject);
  
  const projects = [
    {
      title: "Book Recommender System",
      description: " A hybrid book recommendation system using collaborative filtering methods.",
      technologies: ["Python", "Flask", "pandas", "scikit-learn","Restful API"],
      github: "https://github.com/StaticAccess/Book-Recommender-System",
      live: "https://book-recommender-system-qpiz.onrender.com/",
      image: "/img/book.png?height=200&width=300",
      link:  "/p/comingsoon.html "

      
    },
    {
      title: "Sepsis Prediction Application",
      description: "Developeda web-based application for sepsis prediction using Flask and a Random Forest Model,achieving 85% accuracy.",
      technologies: ["Python", "Pandas", "Flask","Numpy", "Scikit-learn","Random Forest","SVM","Logistic Regression"],
      github: "https://github.com/StaticAccess/Sepsis-Prediction-App",
      live: "https://sepsis-prediction-app.onrender.com/",
      image: "/img/sepsis.png?height=200&width=300",
      link: "/p/comingsoon.html"
     },
    
  ]

  return (
    <SectionWrapper title="Projects" id="projects" ref={ref} isDarkMode={isDarkMode}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="mb-4 relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-105"
              />
            </div>
            <h3 className={`${caveat.className} text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>{tech}</span>
              ))}
            </div>
            <div className="flex space-x-4">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
                <Github className="inline mr-1" size={16} /> Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
                <ExternalLink className="inline mr-1" size={16} /> Live Demo
              </a>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}
                >
                Read More Detail →

              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <a href="/projects" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
          View Full Project Archive →
        </a>
      </div>
    </SectionWrapper>
  )
})
ProjectsSection.displayName = 'ProjectsSection';

const BlogSection = React.forwardRef(({ isDarkMode }:{isDarkMode:boolean}, ref:React.Ref<HTMLElement>) => {
  const posts = [
    {
      title: "My Journey into Software Engineering",
      excerpt: "Reflecting on my first year as a junior developer and the lessons I've learned.",
      date: "2023-05-15",
      link: "/blog/my-journey-into-software-engineering"
    },
    {
      title: "5 React Hooks Every Junior Dev Should Know",
      excerpt: "A beginner-friendly guide to essential React hooks for building dynamic UIs.",
      date: "2023-04-22",
      link: "/blog/5-react-hooks-every-junior-dev-should-know"
    },
    {
      title: "Getting Started with Version Control",
      excerpt: "A comprehensive guide to Git for beginners in software development.",
      date: "2023-03-10",
      link: "/blog/getting-started-with-version-control"
    }
  ]

  return (
    <SectionWrapper title="Blog" id="blog" ref={ref} isDarkMode={isDarkMode}>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <h3 className={`${caveat.className} text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{post.title}</h3>
            <p className="mb-2">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.date}</span>
              <a href={post.link} className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>Read More →</a>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <a href="/blog" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
          View All Blog Posts →
        </a>
      </div>
    </SectionWrapper>
  )
})
BlogSection.displayName = 'BlogSection';

const CertificationsSection = React.forwardRef(({ isDarkMode }:{isDarkMode:boolean}, ref:React.Ref<HTMLElement>) => {
  const [showAll, setShowAll] = useState(false)
  
  const certifications = [
    { name: "PCAP: Programming Essentials in Python", issuer: "OpenEDG Python Institute", date: "2024", link: "https://drive.google.com/file/d/12EWlGMBDl2AESdR_PEJOMFjqrQHX7QiO/view?usp=sharing", logo: "/img/Python_Institute_Logo.png?height=40&width=40" },
    { name: "CCNAv7: Introduction to Networks", issuer: "Cisco Networking Academy", date: "2024", link: "https://drive.google.com/file/d/1PHWt4eBsYp4PIL7-iBEGlLdd2X3hkMxQ/view?usp=drive_link", logo: "/img/cisco-logo.svg" },
    { name: "CCNAv7: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy ", date: "2024", link: "https://drive.google.com/file/d/1vrPydPZEyfND4t4STIm311mQj3vzPxif/view?usp=sharing", logo: "/img/cisco-logo.svg" },
    { name: "CCNAv7: Enterprise Networking, Security, and Automation", issuer: "Cisco Networking Academy", date: "2024", link: "https://drive.google.com/file/d/1FY6JsVLT47t2DnycIsy8bQ5BKMS_sdlt/view?usp=sharing", logo: "/img/cisco-logo.svg" },
    { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "2024", link: "https://drive.google.com/file/d/1wMG4AJclhkFm1UYsrIeGz40zoj6QBL-a/view?usp=sharing", logo: "/img/cisco-logo.svg" },
    { name: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", date: "2024", link: "https://drive.google.com/file/d/1y3qnK5oJvsFDx4mMptj7k3YhAX-9Hufl/view?usp=sharing", logo: "/img/cisco-logo.svg" },
    { name: "Supervised Machine Learning: Regression and Classification", issuer: "Coursera", date: "2024", link: "https://coursera.org/share/7aaa3078bbe0e97f9c743ddea5be4116", logo: "/img/deepl.png?height=40&width=40" },
  
  ]
  
  const visibleCertifications = showAll ? certifications : certifications.slice(0, 5)
  
  return (
    <SectionWrapper title="Certifications" id="certifications" ref={ref} isDarkMode={isDarkMode}>
      <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} overflow-hidden`}>
        <CardContent className="p-6">
          <ScrollArea className={`${showAll ? 'h-[600px]' : 'h-[400px]'} pr-4 transition-all duration-300`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {visibleCertifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`mb-4 pb-4 ${index !== visibleCertifications.length - 1 ? 'border-b' : ''} ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0 relative w-12 h-12 overflow-hidden rounded-full">
                        <Image
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          layout="fill"
                          objectFit="cover"
                          className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`${caveat.className} text-xl font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{cert.name}</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cert.issuer}</p>
                          </div>
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{cert.date}</span>
                          </div>
                        </div>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center text-sm mt-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200`}
                        >
                          <Award className="w-4 h-4 mr-2" />
                          View Certificate
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </ScrollArea>
        </CardContent>
        <div 
          className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-4 px-6 text-center`}
        >
          <div 
            className={`absolute left-0 right-0 h-16 ${isDarkMode ? 'bg-gradient-to-t from-gray-800' : 'bg-gradient-to-t from-white'} -top-16 pointer-events-none`}
          ></div>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-200`}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show All Certifications
              </>
            )}
          </Button>
        </div>
      </Card>
    </SectionWrapper>
  )
}) 
CertificationsSection.displayName = 'CertificationsSection'; 

const ContactSection = React.forwardRef(({ isDarkMode }:{isDarkMode:boolean}, ref:React.Ref<HTMLElement>) => (
  <SectionWrapper title="Contact" id="contact" ref={ref} isDarkMode={isDarkMode}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="mb-6 text-lg">
        I am always open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <Mail className="mr-2 h-5 w-5" />
          <a href="mailto:soubhagyaranjandas2000@gmail.com" className="hover:underline">soubhagyaranjandas2000@gmail.com</a>
        </div>
        <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <Phone className="mr-2 h-5 w-5" />
          <a href="tel:+918328862668" className="hover:underline">+91 8328862668</a>
        </div>
      </div>
      <form className="space-y-4">
        <Input placeholder="Your Name" className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
        <Input type="email" placeholder="Your Email" className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
        <Textarea placeholder="Your Message" className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
        <Button className={`${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} hover:opacity-90`}>
          Send Message
        </Button>
      </form>
    </motion.div>
  </SectionWrapper>
))
ContactSection.displayName = 'ContactSection';
const ProjectDialog = ({ project, onClose, isDarkMode }:{ project: Project | null, onClose: () => void, isDarkMode: boolean }) => {
  if (!project) return null

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className={`${caveat.className} text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p>{project.longDescription}</p>
          <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Challenges</h4>
          <p>{project.challenges}</p>
          <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Learnings</h4>
          <p>{project.learnings}</p>
          <div className="flex space-x-4 mt-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
              <Github className="inline mr-1" size={16} /> View Code
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}>
              <ExternalLink className="inline mr-1" size={16} /> Live Demo
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Project {
  title: string;
  image: string;
  longDescription: string;
  challenges: string;
  learnings: string;
  github: string;
  live: string;
}