import { Container, container } from './container';
import { DynamoDBAppointmentRepository } from '../aws/dynamodb/Appointment.repository';
import { MySQLAppointmentPeruRepository } from '../mysql/AppointmentPeru.repository';
import { MySQLAppointmentChileRepository } from '../mysql/AppointmentChile.repository';
import { SNSService } from '../aws/sns/Sns.service';
import { EventBridgeService } from '../aws/eventbridge/Eventbridge.service';
import { SQSService } from '../aws/sqs/Sqs.service';
import { CreateAppointmentService } from '../../application/services/CreateAppointment.service';
import { GetAppointmentsService } from '../../application/services/GetAppointments.service';
import { CompleteAppointmentService } from '../../application/services/CompleteAppointment.service';
import { ConfigService } from '../config/Config.service';

export function initializeContainer(): Container {
    // Configuración
    const configService = new ConfigService();
    container.register('ConfigService', configService);

    // Repositorios
    const dynamoRepository = new DynamoDBAppointmentRepository(configService);
    container.register('AppointmentRepository', dynamoRepository);

    const peruRepository = new MySQLAppointmentPeruRepository(configService);
    container.register('MySQLAppointmentPeruRepository', peruRepository);

    const chileRepository = new MySQLAppointmentChileRepository(configService);
    container.register('MySQLAppointmentChileRepository', chileRepository);

    // Servicios de AWS
    const snsService = new SNSService(configService);
    container.register('AppointmentPublisherService', snsService);
    container.register('SNSService', snsService);

    const eventBridgeService = new EventBridgeService(configService);
    container.register('EventBridgeService', eventBridgeService);

    const sqsService = new SQSService(configService);
    container.register('SQSService', sqsService);

    // Servicios de Aplicación
    const createAppointmentService = new CreateAppointmentService(
        dynamoRepository,
        snsService
    );
    container.register('CreateAppointmentService', createAppointmentService);

    const getAppointmentsService = new GetAppointmentsService(dynamoRepository);
    container.register('GetAppointmentsService', getAppointmentsService);

    const completeAppointmentService = new CompleteAppointmentService(dynamoRepository);
    container.register('CompleteAppointmentService', completeAppointmentService);

    return container;
}
