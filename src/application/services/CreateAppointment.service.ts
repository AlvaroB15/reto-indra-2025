import { AppointmentDynamoDBRepository } from '../../domain/repositories/AppointmentDynamoDB.repository';
import { CreateAppointmentDto } from '../dtos/CreateAppointment.dto';
import { AppointmentMapper } from '../mappers/Appointment.mapper';
import { AppointmentResponseDto } from '../dtos/AppointmentResponse.dto';
import { AppointmentPublisherService } from '../../domain/services/AppointmentPublisher.service';

export class CreateAppointmentService {
    constructor(
        private readonly appointmentDynamoRepository: AppointmentDynamoDBRepository,
        private readonly appointmentPublisherSnsService: AppointmentPublisherService
    ) {}

    async execute(dto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
        // Mapear DTO a entidad de dominio
        const appointment = AppointmentMapper.toDomain(dto);

        // Guardar en DynamoDB
        const savedAppointment = await this.appointmentDynamoRepository.save(appointment);

        // Publicar evento al SNS
        await this.appointmentPublisherSnsService.publishAppointmentCreated(savedAppointment);

        // Mapear entidad a DTO de respuesta
        return AppointmentMapper.toResponseDto(savedAppointment);
    }
}
