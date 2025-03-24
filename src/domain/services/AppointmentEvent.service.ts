export interface AppointmentEventService {
    publishAppointmentConfirmed(appointmentId: string, countryISO: string): Promise<void>;
}
