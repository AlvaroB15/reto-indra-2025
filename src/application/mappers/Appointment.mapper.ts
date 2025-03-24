import { Appointment, CountryISO, AppointmentStatus } from '../../domain/entities/Appointment.entity';
import { CreateAppointmentDto } from '../dtos/CreateAppointment.dto';
import { AppointmentResponseDto } from '../dtos/AppointmentResponse.dto';
import { v4 as uuidv4 } from 'uuid';

export class AppointmentMapper {
    static toDomain(dto: CreateAppointmentDto): Appointment {
        return new Appointment({
            id: uuidv4(),
            insuredId: dto.insuredId,
            scheduleId: dto.scheduleId,
            countryISO: dto.countryISO as CountryISO,
            status: AppointmentStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    static toResponseDto(entity: Appointment): AppointmentResponseDto {
        const dto = new AppointmentResponseDto();
        dto.id = entity.id;
        dto.insuredId = entity.insuredId;
        dto.scheduleId = entity.scheduleId;
        dto.countryISO = entity.countryISO;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static toResponseDtoList(entities: Appointment[]): AppointmentResponseDto[] {
        return entities.map(entity => this.toResponseDto(entity));
    }
}
