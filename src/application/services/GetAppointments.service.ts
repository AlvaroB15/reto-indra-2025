import { AppointmentDynamoDBRepository } from '../../domain/repositories/AppointmentDynamoDB.repository';
import { AppointmentResponseDto } from '../dtos/AppointmentResponse.dto';
import { AppointmentMapper } from '../mappers/Appointment.mapper';

export class GetAppointmentsService {
    constructor(
        private readonly appointmentRepository: AppointmentDynamoDBRepository
    ) {}

    async execute(insuredId: string): Promise<AppointmentResponseDto[]> {
        const appointments = await this.appointmentRepository.findByInsuredId(insuredId);
        return AppointmentMapper.toResponseDtoList(appointments);
    }
}
