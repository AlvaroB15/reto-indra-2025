import { Appointment } from '../entities/Appointment.entity';

export interface AppointmentCreatedEvent {
    appointment: Appointment;
}

export interface AppointmentConfirmedEvent {
    appointmentId: string;
    countryISO: string;
}
