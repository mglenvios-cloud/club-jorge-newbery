export interface Facility {
  id: string;
  tenantId: string;
  name: string;
  sport: string;
  surface?: string | null;
  pricePerHour: number;
  isLightingAvailable: boolean;
  lightingPriceExtra: number;
  status: string; // ACTIVE, MAINTENANCE, INACTIVE
  openingHours: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CourtBooking {
  id: string;
  tenantId: string;
  facilityId: string;
  memberId: string;
  memberName: string;
  memberDni: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  totalPrice: number;
  paymentStatus: string; // PENDING, PAID, CANCELLED
  status: string; // CONFIRMED, CANCELLED
  createdAt: string | Date;
  facility?: Facility;
}

export interface CreateFacilityInput {
  name: string;
  sport: string;
  surface?: string;
  pricePerHour: number;
  isLightingAvailable?: boolean;
  lightingPriceExtra?: number;
  openingHours?: string;
}

export interface CreateBookingInput {
  facilityId: string;
  memberId: string;
  memberName: string;
  memberDni: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}
