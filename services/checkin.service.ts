import { CheckIn } from "@/types";
import { RegistrationService } from "./registration.service";

let checkInsStore: CheckIn[] = [];

export interface TicketScanResult {
  valid: boolean;
  code: 'SUCCESS' | 'DUPLICATE' | 'INVALID_CODE' | 'EVENT_EXPIRED';
  message: string;
  registration?: any;
  checkInRecord?: CheckIn;
}

export class CheckInService {
  static async verifyAndRecordCheckIn(ticketCode: string, volunteerId: string, gateLocation: string = "Main Gate 1"): Promise<TicketScanResult> {
    const reg = await RegistrationService.getRegistrationByTicketCode(ticketCode);
    if (!reg) {
      return {
        valid: false,
        code: 'INVALID_CODE',
        message: `Invalid or unrecognized ticket QR code: "${ticketCode}". Please ask participant to show valid SRU Pragathi digital pass.`,
      };
    }

    // Check for duplicate entry scan
    const existingCheckIn = checkInsStore.find(c => c.registrationId === reg.id);
    if (existingCheckIn) {
      return {
        valid: false,
        code: 'DUPLICATE',
        message: `Ticket already scanned and checked in at ${new Date(existingCheckIn.scannedAt).toLocaleTimeString()} (${existingCheckIn.gateLocation}).`,
        registration: reg,
        checkInRecord: existingCheckIn,
      };
    }

    // Record valid check-in
    const newCheckIn: CheckIn = {
      id: `chk_${Date.now()}`,
      registrationId: reg.id,
      registration: reg,
      volunteerId,
      scannedAt: new Date().toISOString(),
      gateLocation,
    };

    checkInsStore.unshift(newCheckIn);
    reg.status = "CHECKED_IN";

    return {
      valid: true,
      code: 'SUCCESS',
      message: `Pass Verified! Welcome ${reg.user?.name || 'Participant'} (${reg.event?.title}). Entry granted.`,
      registration: reg,
      checkInRecord: newCheckIn,
    };
  }

  static async getCheckIns(): Promise<CheckIn[]> {
    return checkInsStore;
  }
}
