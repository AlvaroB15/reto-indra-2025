"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentMapper = void 0;
const Appointment_entity_1 = require("../../domain/entities/Appointment.entity");
const AppointmentResponse_dto_1 = require("../dtos/AppointmentResponse.dto");
const uuid_1 = require("uuid");
class AppointmentMapper {
    static toDomain(dto) {
        return new Appointment_entity_1.Appointment({
            id: (0, uuid_1.v4)(),
            insuredId: dto.insuredId,
            scheduleId: dto.scheduleId,
            countryISO: dto.countryISO,
            status: Appointment_entity_1.AppointmentStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    static toResponseDto(entity) {
        const dto = new AppointmentResponse_dto_1.AppointmentResponseDto();
        dto.id = entity.id;
        dto.insuredId = entity.insuredId;
        dto.scheduleId = entity.scheduleId;
        dto.countryISO = entity.countryISO;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
    static toResponseDtoList(entities) {
        return entities.map(entity => this.toResponseDto(entity));
    }
}
exports.AppointmentMapper = AppointmentMapper;
//# sourceMappingURL=Appointment.mapper.js.map