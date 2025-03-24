import { Appointment } from '../entities/Appointment.entity';

export interface AppointmentDynamoDBRepository {
    save(appointment: Appointment): Promise<Appointment>;
    findById(id: string): Promise<Appointment | null>;
    findByInsuredId(insuredId: string): Promise<Appointment[]>;
    update(id: string, status: string): Promise<Appointment | null>;
}
