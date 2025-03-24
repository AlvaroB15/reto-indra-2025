"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteAppointmentService = void 0;
const Appointment_entity_1 = require("../../domain/entities/Appointment.entity");
class CompleteAppointmentService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId) {
        await this.appointmentRepository.update(appointmentId, Appointment_entity_1.AppointmentStatus.COMPLETED);
    }
}
exports.CompleteAppointmentService = CompleteAppointmentService;
//# sourceMappingURL=CompleteAppointment.service.js.map