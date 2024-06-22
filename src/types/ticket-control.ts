export type TicketControl = {
  id: string;
  year: number;
  month: number;
  day: number;
  lastRegisterTicket?: number;
  lastRegisterTicketTimestamp?: Date;
  lastEntryTicket?: number;
  lastEntryTicketTimestamp?: Date;
  lastWaitingTimeMinutes: number;
};
