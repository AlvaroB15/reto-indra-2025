import {SQSEvent, SQSHandler} from 'aws-lambda';
import {MySQLAppointmentPeruRepository} from '../../mysql/AppointmentPeru.repository';
import {EventBridgeService} from '../../aws/eventbridge/Eventbridge.service';
import {Appointment, CountryISO} from '../../../domain/entities/Appointment.entity';
import {initializeContainer} from "../../di/initialize";

export const handler: SQSHandler = async (event: SQSEvent) => {
    // Inicializar el contenedor de dependencias
    const container = initializeContainer();
    const peruRepository = container.get<MySQLAppointmentPeruRepository>('MySQLAppointmentPeruRepository');
    const eventBridgeService = container.get<EventBridgeService>('EventBridgeService');

    try {
        for (const record of event.Records) {
            const message = JSON.parse(record.body);

            // Si el mensaje viene de SNS, hay que procesarlo adicionalmente
            const appointmentData = record.eventSource === 'aws:sqs'
                ? JSON.parse(message.Message)
                : message;

            // Construir objeto de cita
            const appointment = new Appointment({
                id: appointmentData.id,
                insuredId: appointmentData.insuredId,
                scheduleId: appointmentData.scheduleId,
                countryISO: appointmentData.countryISO,
                status: appointmentData.status,
                createdAt: new Date(appointmentData.createdAt),
                updatedAt: new Date(appointmentData.updatedAt),
                scheduleDetails: appointmentData.scheduleDetails || {}
            });

            // Guardar en la base de datos de Perú
            await peruRepository.saveAppointment(appointment);

            // Publicar evento de confirmación a EventBridge
            await eventBridgeService.publishAppointmentConfirmed(
                appointment.id,
                CountryISO.PERU
            );
        }
    } catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
};
