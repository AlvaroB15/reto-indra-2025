"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Appointment_entity_1 = require("../../../domain/entities/Appointment.entity");
const initialize_1 = require("../../di/initialize");
const handler = async (event) => {
    const container = (0, initialize_1.initializeContainer)();
    const peruRepository = container.get('MySQLAppointmentPeruRepository');
    const eventBridgeService = container.get('EventBridgeService');
    try {
        for (const record of event.Records) {
            console.log('record');
            console.log(record);
            const message = JSON.parse(record.body);
            console.log('message SQS');
            console.log(message);
            const appointmentData = record.eventSource === 'aws:sqs'
                ? JSON.parse(message.Message)
                : message;
            console.log('appointmentData SQS');
            console.log(appointmentData);
            const appointment = new Appointment_entity_1.Appointment({
                id: appointmentData.id,
                insuredId: appointmentData.insuredId,
                scheduleId: appointmentData.scheduleId,
                countryISO: appointmentData.countryISO,
                status: appointmentData.status,
                createdAt: new Date(appointmentData.createdAt),
                updatedAt: new Date(appointmentData.updatedAt),
                scheduleDetails: appointmentData.scheduleDetails || {}
            });
            console.log('appointment SQS ya parseado');
            console.log(appointment);
            await peruRepository.saveAppointment(appointment);
            await eventBridgeService.publishAppointmentConfirmed(appointment.id, Appointment_entity_1.CountryISO.PERU);
        }
    }
    catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map