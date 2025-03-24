import { Appointment } from '../entities/Appointment.entity';

export interface AppointmentMysqlRepository {
    saveAppointment(appointment: Appointment): Promise<void>
}
