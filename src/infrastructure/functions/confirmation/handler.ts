import { SQSEvent, SQSHandler } from 'aws-lambda';
// import { CompleteAppointmentService } from '../../../application/services/complete-appointment.service';
import { CompleteAppointmentService } from '../../../application/services/CompleteAppointment.service';
import {initializeContainer} from "../../di/initialize";

export const handler: SQSHandler = async (event: SQSEvent) => {

    // Inicializar el contenedor de dependencias
    const container = initializeContainer();
    const completeAppointmentService = container.get<CompleteAppointmentService>('CompleteAppointmentService');

    try {
        for (const record of event.Records) {
            const message = JSON.parse(record.body);
            const appointmentId = message.detail.appointmentId;

            // Actualizar estado de la cita a 'completed' en DynamoDB
            await completeAppointmentService.execute(appointmentId);
        }
    } catch (error) {
        console.error('Error completing appointments:', error);
        throw error;
    }
};
