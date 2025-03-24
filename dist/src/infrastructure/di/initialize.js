"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeContainer = initializeContainer;
const container_1 = require("./container");
const Appointment_repository_1 = require("../aws/dynamodb/Appointment.repository");
const AppointmentPeru_repository_1 = require("../mysql/AppointmentPeru.repository");
const AppointmentChile_repository_1 = require("../mysql/AppointmentChile.repository");
const Sns_service_1 = require("../aws/sns/Sns.service");
const Eventbridge_service_1 = require("../aws/eventbridge/Eventbridge.service");
const Sqs_service_1 = require("../aws/sqs/Sqs.service");
const CreateAppointment_service_1 = require("../../application/services/CreateAppointment.service");
const GetAppointments_service_1 = require("../../application/services/GetAppointments.service");
const CompleteAppointment_service_1 = require("../../application/services/CompleteAppointment.service");
const Config_service_1 = require("../config/Config.service");
function initializeContainer() {
    const configService = new Config_service_1.ConfigService();
    container_1.container.register('ConfigService', configService);
    const dynamoRepository = new Appointment_repository_1.DynamoDBAppointmentRepository();
    container_1.container.register('AppointmentRepository', dynamoRepository);
    const peruRepository = new AppointmentPeru_repository_1.MySQLAppointmentPeruRepository(configService);
    container_1.container.register('MySQLAppointmentPeruRepository', peruRepository);
    const chileRepository = new AppointmentChile_repository_1.MySQLAppointmentChileRepository(configService);
    container_1.container.register('MySQLAppointmentChileRepository', chileRepository);
    const snsService = new Sns_service_1.SNSService(configService);
    container_1.container.register('AppointmentPublisherService', snsService);
    container_1.container.register('SNSService', snsService);
    const eventBridgeService = new Eventbridge_service_1.EventBridgeService(configService);
    container_1.container.register('EventBridgeService', eventBridgeService);
    const sqsService = new Sqs_service_1.SQSService(configService);
    container_1.container.register('SQSService', sqsService);
    const createAppointmentService = new CreateAppointment_service_1.CreateAppointmentService(dynamoRepository, snsService);
    container_1.container.register('CreateAppointmentService', createAppointmentService);
    const getAppointmentsService = new GetAppointments_service_1.GetAppointmentsService(dynamoRepository);
    container_1.container.register('GetAppointmentsService', getAppointmentsService);
    const completeAppointmentService = new CompleteAppointment_service_1.CompleteAppointmentService(dynamoRepository);
    container_1.container.register('CompleteAppointmentService', completeAppointmentService);
    return container_1.container;
}
//# sourceMappingURL=initialize.js.map