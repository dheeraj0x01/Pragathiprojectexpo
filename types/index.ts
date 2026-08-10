export type Role = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'COORDINATOR' 
  | 'JUDGE' 
  | 'VOLUNTEER' 
  | 'PARTICIPANT';

export type EventCategory = 
  | 'TECHNICAL' 
  | 'CULTURAL' 
  | 'SPORTS' 
  | 'WORKSHOP' 
  | 'EXPO';

export type EventStatus = 
  | 'DRAFT' 
  | 'PUBLISHED' 
  | 'REGISTRATION_OPEN' 
  | 'REGISTRATION_CLOSED' 
  | 'COMPLETED';

export type RegistrationStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CANCELLED' 
  | 'CHECKED_IN';

export type PaymentStatus = 
  | 'PENDING' 
  | 'SUCCESS' 
  | 'FAILED' 
  | 'MOCK_PAID';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  college: string;
  department?: string | null;
  rollNo?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  bannerUrl?: string | null;
  venue: string;
  eventDate: Date | string;
  maxParticipants: number;
  registrationFee: number;
  minTeamSize: number;
  maxTeamSize: number;
  createdById: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count?: {
    registrations: number;
  };
}

export interface Registration {
  id: string;
  ticketCode: string;
  eventId: string;
  event?: EventItem;
  userId: string;
  user?: User;
  teamName?: string | null;
  teamMembers?: string | null;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  paymentTxnId?: string | null;
  qrCodeUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  checkIns?: CheckIn[];
}

export interface CheckIn {
  id: string;
  registrationId: string;
  registration?: Registration;
  volunteerId: string;
  volunteer?: User;
  scannedAt: Date | string;
  gateLocation: string;
}

export interface DashboardMetrics {
  totalRegistrations: number;
  totalRevenue: number;
  activeEvents: number;
  totalCheckIns: number;
  registrationVelocity: Array<{ date: string; count: number }>;
  categoryDistribution: Array<{ category: string; count: number }>;
  recentRegistrations: Registration[];
}

export interface PaymentGatewayPlaceholderConfig {
  merchantId: string;
  currency: string;
  environment: 'TEST' | 'PRODUCTION';
  onSuccessRedirect: string;
}
