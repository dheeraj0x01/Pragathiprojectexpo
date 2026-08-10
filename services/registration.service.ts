import { Registration, RegistrationStatus, PaymentStatus } from "@/types";
import { generateQRCodeDataUrl, generateTicketCode } from "@/lib/qr";
import { INITIAL_MOCK_EVENTS } from "./event.service";
import { MOCK_USERS } from "@/lib/auth";

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: "reg_01",
    ticketCode: "SRU-PRG26-HACK-89A12",
    eventId: "evt_hack_01",
    event: INITIAL_MOCK_EVENTS[0],
    userId: "usr_part_06",
    user: MOCK_USERS[5],
    teamName: "Algorithmic Titans",
    teamMembers: JSON.stringify(["Priya Patel", "Vikram Reddy", "Sneha Rao"]),
    status: "CONFIRMED",
    paymentStatus: "MOCK_PAID",
    paymentTxnId: "TXN_SRU_98472918",
    qrCodeUrl: "",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "reg_02",
    ticketCode: "SRU-PRG26-ROBO-44B90",
    eventId: "evt_robo_02",
    event: INITIAL_MOCK_EVENTS[1],
    userId: "usr_part_06",
    user: MOCK_USERS[5],
    teamName: "IronClad Botics",
    teamMembers: JSON.stringify(["Priya Patel", "Karthik M"]),
    status: "CONFIRMED",
    paymentStatus: "MOCK_PAID",
    paymentTxnId: "TXN_SRU_10293847",
    qrCodeUrl: "",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

let registrationsStore: Registration[] = [...INITIAL_REGISTRATIONS];

export class RegistrationService {
  static async getRegistrations(eventId?: string, userId?: string): Promise<Registration[]> {
    let list = [...registrationsStore];
    if (eventId) {
      list = list.filter(r => r.eventId === eventId);
    }
    if (userId) {
      list = list.filter(r => r.userId === userId);
    }

    // Attach QR code data URLs dynamically
    for (const reg of list) {
      if (!reg.qrCodeUrl) {
        reg.qrCodeUrl = await generateQRCodeDataUrl(reg.ticketCode);
      }
    }
    return list;
  }

  static async getRegistrationByTicketCode(ticketCode: string): Promise<Registration | null> {
    const reg = registrationsStore.find(r => r.ticketCode.toUpperCase() === ticketCode.trim().toUpperCase());
    if (!reg) return null;
    if (!reg.qrCodeUrl) {
      reg.qrCodeUrl = await generateQRCodeDataUrl(reg.ticketCode);
    }
    return reg;
  }

  static async createRegistration(data: {
    eventId: string;
    userId: string;
    teamName?: string;
    teamMembers?: string[];
    paymentTxnId?: string;
  }): Promise<Registration> {
    const ticketCode = generateTicketCode(data.eventId, data.userId);
    const qrCodeUrl = await generateQRCodeDataUrl(ticketCode);
    const matchedEvent = INITIAL_MOCK_EVENTS.find(e => e.id === data.eventId);

    const newReg: Registration = {
      id: `reg_${Date.now()}`,
      ticketCode,
      eventId: data.eventId,
      event: matchedEvent,
      userId: data.userId,
      user: MOCK_USERS.find(u => u.id === data.userId) || MOCK_USERS[5],
      teamName: data.teamName || null,
      teamMembers: data.teamMembers ? JSON.stringify(data.teamMembers) : null,
      status: "CONFIRMED",
      paymentStatus: "MOCK_PAID",
      paymentTxnId: data.paymentTxnId || `TXN_SRU_${Date.now()}`,
      qrCodeUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    registrationsStore.unshift(newReg);
    return newReg;
  }
}
