import { EventItem, EventCategory, EventStatus } from "@/types";

export const INITIAL_MOCK_EVENTS: EventItem[] = [
  {
    id: "evt_hack_01",
    title: "HackPragathi 2026 - 24hr National Hackathon",
    slug: "hackpragathi-2026",
    description: "The flagship 24-hour national hackathon of SR University bringing together top student developers across AI, Blockchain, and IoT to build scalable real-world solutions.",
    category: "TECHNICAL",
    status: "REGISTRATION_OPEN",
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    venue: "SRU Innovation Center - Auditorium 1",
    eventDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    maxParticipants: 300,
    registrationFee: 250,
    minTeamSize: 2,
    maxTeamSize: 4,
    createdById: "usr_superadmin_01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { registrations: 184 },
  },
  {
    id: "evt_robo_02",
    title: "RoboWars Arena - Combat Robotics",
    slug: "robowars-arena",
    description: "High-octane robot warfare competition! Build 15kg wired/wireless combat bots and battle inside the reinforced steel cage.",
    category: "TECHNICAL",
    status: "REGISTRATION_OPEN",
    bannerUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80",
    venue: "SRU Outdoor Sports Complex Ground",
    eventDate: new Date(Date.now() + 86400000 * 6).toISOString(),
    maxParticipants: 60,
    registrationFee: 500,
    minTeamSize: 3,
    maxTeamSize: 5,
    createdById: "usr_admin_02",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { registrations: 42 },
  },
  {
    id: "evt_cult_03",
    title: "BeatDrop - National Dance Competition",
    slug: "beatdrop-dance-comp",
    description: "Showcase your energy, synchronization, and creativity on the grand Pragathi stage. Categories: Hip-hop, Classical Fusion, and Western Group.",
    category: "CULTURAL",
    status: "REGISTRATION_OPEN",
    bannerUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&auto=format&fit=crop&q=80",
    venue: "SRU Open Air Theatre (OAT)",
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    maxParticipants: 200,
    registrationFee: 300,
    minTeamSize: 4,
    maxTeamSize: 12,
    createdById: "usr_superadmin_01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { registrations: 156 },
  },
  {
    id: "evt_ai_04",
    title: "Generative AI Masterclass & Hands-on Workshop",
    slug: "genai-masterclass-workshop",
    description: "Learn how to build LLM agents, RAG systems, and fine-tune models directly with industry experts from top AI research labs.",
    category: "WORKSHOP",
    status: "REGISTRATION_OPEN",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    venue: "Block 3 - Computer Lab 402",
    eventDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    maxParticipants: 120,
    registrationFee: 150,
    minTeamSize: 1,
    maxTeamSize: 1,
    createdById: "usr_admin_02",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { registrations: 98 },
  },
  {
    id: "evt_expo_05",
    title: "Pragathi Tech Expo & Startup Pitching Arena",
    slug: "tech-expo-startup-pitch",
    description: "Display your innovative working prototypes and pitch to venture capitalists, angel investors, and SRU Incubation Center directors.",
    category: "EXPO",
    status: "PUBLISHED",
    bannerUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
    venue: "SRU Central Library Pavilion",
    eventDate: new Date(Date.now() + 86400000 * 8).toISOString(),
    maxParticipants: 50,
    registrationFee: 0,
    minTeamSize: 1,
    maxTeamSize: 3,
    createdById: "usr_superadmin_01",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _count: { registrations: 24 },
  },
];

let eventsStore: EventItem[] = [...INITIAL_MOCK_EVENTS];

export class EventService {
  static async getEvents(category?: EventCategory, status?: EventStatus, search?: string): Promise<EventItem[]> {
    let result = [...eventsStore];
    if (category) {
      result = result.filter(e => e.category === category);
    }
    if (status) {
      result = result.filter(e => e.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
    }
    return result;
  }

  static async getEventById(id: string): Promise<EventItem | null> {
    return eventsStore.find(e => e.id === id || e.slug === id) || null;
  }

  static async createEvent(data: Partial<EventItem>): Promise<EventItem> {
    const newEvent: EventItem = {
      id: `evt_${Date.now()}`,
      title: data.title || "Untitled Event",
      slug: data.slug || `event-${Date.now()}`,
      description: data.description || "",
      category: data.category || "TECHNICAL",
      status: data.status || "DRAFT",
      bannerUrl: data.bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      venue: data.venue || "SRU Campus",
      eventDate: data.eventDate || new Date().toISOString(),
      maxParticipants: Number(data.maxParticipants) || 100,
      registrationFee: Number(data.registrationFee) || 0,
      minTeamSize: Number(data.minTeamSize) || 1,
      maxTeamSize: Number(data.maxTeamSize) || 1,
      createdById: data.createdById || "usr_superadmin_01",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: { registrations: 0 },
    };
    eventsStore.unshift(newEvent);
    return newEvent;
  }

  static async updateEvent(id: string, updates: Partial<EventItem>): Promise<EventItem | null> {
    const idx = eventsStore.findIndex(e => e.id === id);
    if (idx === -1) return null;
    eventsStore[idx] = {
      ...eventsStore[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return eventsStore[idx];
  }

  static async deleteEvent(id: string): Promise<boolean> {
    const lenBefore = eventsStore.length;
    eventsStore = eventsStore.filter(e => e.id !== id);
    return eventsStore.length < lenBefore;
  }
}
