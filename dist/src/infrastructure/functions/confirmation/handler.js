"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const initialize_1 = require("../../di/initialize");
const handler = async (event) => {
    const container = (0, initialize_1.initializeContainer)();
    const completeAppointmentService = container.get('CompleteAppointmentService');
    try {
        for (const record of event.Records) {
            console.log('record');
            console.log(record);
            const message = JSON.parse(record.body);
            const appointmentId = message.detail.appointmentId;
            await completeAppointmentService.execute(appointmentId);
        }
    }
    catch (error) {
        console.error('Error completing appointments:', error);
        throw error;
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map