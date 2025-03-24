import { Appointment } from '../entities/Appointment.entity';

export interface AppointmentService {
    processAppointment(appointment: Appointment): Promise<void>;
    completeAppointment(appointmentId: string): Promise<void>;
}
