import { AppointmentDynamoDBRepository } from '../../domain/repositories/AppointmentDynamoDB.repository';
import { AppointmentStatus } from '../../domain/entities/Appointment.entity';

export class CompleteAppointmentService {
    constructor(
        private readonly appointmentRepository: AppointmentDynamoDBRepository
    ) {}

    async execute(appointmentId: string): Promise<void> {
        await this.appointmentRepository.update(
            appointmentId,
            AppointmentStatus.COMPLETED
        );
    }
}
