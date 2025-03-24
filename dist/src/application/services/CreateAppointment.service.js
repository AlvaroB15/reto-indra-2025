"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentService = void 0;
const Appointment_mapper_1 = require("../mappers/Appointment.mapper");
class CreateAppointmentService {
    constructor(appointmentDynamoRepository, appointmentPublisherSnsService) {
        this.appointmentDynamoRepository = appointmentDynamoRepository;
        this.appointmentPublisherSnsService = appointmentPublisherSnsService;
    }
    async execute(dto) {
        const appointment = Appointment_mapper_1.AppointmentMapper.toDomain(dto);
        const savedAppointment = await this.appointmentDynamoRepository.save(appointment);
        console.log('savedAppointment');
        console.log(savedAppointment);
        await this.appointmentPublisherSnsService.publishAppointmentCreated(savedAppointment);
        return Appointment_mapper_1.AppointmentMapper.toResponseDto(savedAppointment);
    }
}
exports.CreateAppointmentService = CreateAppointmentService;
//# sourceMappingURL=CreateAppointment.service.js.map