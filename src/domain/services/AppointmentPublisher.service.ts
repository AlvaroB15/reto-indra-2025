import { Appointment } from '../entities/Appointment.entity';

export interface AppointmentPublisherService {
    publishAppointmentCreated(appointment: Appointment): Promise<void>;
}
