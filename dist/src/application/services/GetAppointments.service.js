"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentsService = void 0;
const Appointment_mapper_1 = require("../mappers/Appointment.mapper");
class GetAppointmentsService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(insuredId) {
        const appointments = await this.appointmentRepository.findByInsuredId(insuredId);
        return Appointment_mapper_1.AppointmentMapper.toResponseDtoList(appointments);
    }
}
exports.GetAppointmentsService = GetAppointmentsService;
//# sourceMappingURL=GetAppointments.service.js.map