"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Appointment_entity_1 = require("../../../domain/entities/Appointment.entity");
const initialize_1 = require("../../di/initialize");
const handler = async (event) => {
    const container = (0, initialize_1.initializeContainer)();
    const chileRepository = container.get('MySQLAppointmentChileRepository');
    const eventBridgeService = container.get('EventBridgeService');
    try {
        for (const record of event.Records) {
            const message = JSON.parse(record.body);
            const appointmentData = record.eventSource === 'aws:sns'
                ? JSON.parse(message.Message)
                : message;
            const appointment = new Appointment_entity_1.Appointment({
                id: appointmentData.id,
                insuredId: appointmentData.insuredId,
                scheduleId: appointmentData.scheduleId,
                countryISO: appointmentData.countryISO,
                status: appointmentData.status,
                createdAt: new Date(appointmentData.createdAt),
                updatedAt: new Date(appointmentData.updatedAt)
            });
            await chileRepository.saveAppointment(appointment);
            await eventBridgeService.publishAppointmentConfirmed(appointment.id, Appointment_entity_1.CountryISO.CHILE);
        }
    }
    catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map