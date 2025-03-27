import { SQSEvent, SQSHandler } from 'aws-lambda';
import { CompleteAppointmentService } from '../../../application/services/CompleteAppointment.service';
import {initializeContainer} from "../../di/initialize";

export const handler: SQSHandler = async (event: SQSEvent) => {

    const container = initializeContainer();
    const completeAppointmentService = container.get<CompleteAppointmentService>('CompleteAppointmentService');

    try {
        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            let appointmentId;

            // Detectar formato del mensaje
            if (body.detail && body.detail.appointmentId) {
                // Formato directo de EventBridge
                appointmentId = body.detail.appointmentId;
            } else if (body.Message) {
                // Formato que podría venir a través de SNS
                const message = JSON.parse(body.Message);
                appointmentId = message.detail ? message.detail.appointmentId : message.appointmentId;
            } else {
                // Otro formato (tal vez directo)
                appointmentId = body.appointmentId;
            }

            if (!appointmentId) throw new Error('Formato de mensaje no válido - falta appointmentId');
            // Actualizar estado de la cita a 'completed' en DynamoDB
            await completeAppointmentService.execute(appointmentId);
        }
    } catch (error) {
        console.error('Error completing appointments:', error);
        throw error;
    }
};
