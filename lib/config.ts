/**
 * ============================================================================
 * PRAGATHI 2K26 - CENTRAL CONFIGURATION & EVENT METADATA
 * SR UNIVERSITY, WARANGAL, TELANGANA
 * ============================================================================
 */

export const PRAGATHI_CONFIG = {
  eventName: "PRAGATHI 2K26",
  tagline: "Where Innovation Meets Impact",
  subtitle: "SR University National Level Project Expo & Innovation Championship",
  university: "SR University",
  universityShort: "SRU",
  location: "Warangal, Telangana, India",
  fullAddress: "Ananthasagar, Hasanparthy, Warangal, Telangana - 506371",
  eventDates: "March 27 - 28, 2026",
  venueName: "SR Innovation Exchange & Central Pavilion",
  hostDepartment: "Center for Innovation, Incubation & Entrepreneurship (SRiX)",
  supportEmail: "pragathi2k26@sru.edu.in",
  helplinePhone: "+91 870 281 8300",
  whatsappSupport: "+91 98490 12345",
  
  stats: [
    { label: "Innovators & Students", value: "1,500+", suffix: "" },
    { label: "Project Prototypes", value: "300+", suffix: "" },
    { label: "Cash Prize Pool", value: "₹5,00,000", suffix: "" },
    { label: "Jury & Investors", value: "40+", suffix: "" },
    { label: "Partner Institutions", value: "80+", suffix: "" },
  ],

  categories: [
    {
      id: "TECHNICAL",
      title: "AI, ML & Software Engineering",
      icon: "Cpu",
      description: "Generative AI, Large Language Models, Cloud Computing, Cybersecurity, and Web/Mobile Applications.",
      badge: "High Impact",
    },
    {
      id: "ROBOTICS",
      title: "Robotics, IoT & Embedded Systems",
      icon: "Bot",
      description: "Autonomous Systems, Drones, Combat Robotics, Smart Automation, and Sensor Networks.",
      badge: "Flagship",
    },
    {
      id: "SUSTAINABLE",
      title: "Clean Tech & EV Mobility",
      icon: "Zap",
      description: "Renewable Energy, Electric Vehicle Tech, Battery Management, and Environmental Sustainability.",
      badge: "Popular",
    },
    {
      id: "HEALTHCARE",
      title: "BioTech & Digital Health",
      icon: "HeartPulse",
      description: "Medical Devices, Diagnostic AI, Health Monitoring, Telemedicine, and Assistive Tech.",
      badge: "Research",
    },
    {
      id: "SMART_CITY",
      title: "Smart Cities & Agritech",
      icon: "Building2",
      description: "Precision Farming, Agri-IoT, Urban Planning, Waste Management, and Smart Water Systems.",
      badge: "Innovate",
    },
  ],

  schedule: [
    {
      day: "Day 1 - March 27, 2026",
      events: [
        { time: "08:30 AM - 09:30 AM", title: "Registration & Desk Check-in", location: "Main Gate Reception" },
        { time: "09:30 AM - 10:30 AM", title: "Grand Inauguration Ceremony", location: "SRU Auditorium" },
        { time: "10:30 AM - 01:00 PM", title: "Expo Booth Allocation & Setup", location: "Central Pavilion" },
        { time: "02:00 PM - 05:00 PM", title: "Jury Evaluation Round 1", location: "Expo Halls A, B & C" },
        { time: "05:30 PM - 07:00 PM", title: "Keynote Talk: Tech Startup Pitching", location: "SRiX Incubation Center" },
      ]
    },
    {
      day: "Day 2 - March 28, 2026",
      events: [
        { time: "09:00 AM - 12:30 PM", title: "Grand Finalist Jury Round", location: "Central Arena" },
        { time: "01:30 PM - 03:30 PM", title: "Public Innovation Viewing & Student Demos", location: "Central Pavilion" },
        { time: "04:00 PM - 05:30 PM", title: "Valedictory & Award Distribution", location: "Open Air Theatre (OAT)" },
      ]
    }
  ],

  coordinators: [
    { name: "Dr. A. Ramesh", role: "Faculty Convener", department: "Dean Innovation & Research", phone: "+91 98490 11111" },
    { name: "Prof. S. Kavitha", role: "Co-Convener", department: "Department of CSE", phone: "+91 98490 22222" },
    { name: "K. Dheeraj Reddi", role: "Student Lead Coordinator", department: "SRU Student Council", phone: "+91 98490 33333" },
  ]
};
