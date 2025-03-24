"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNSService = void 0;
const client_sns_1 = require("@aws-sdk/client-sns");
class SNSService {
    constructor(configService) {
        this.configService = configService;
        this.snsClient = new client_sns_1.SNSClient({ region: 'us-east-1' });
        this.topicArn = this.configService.get('SNS_TOPIC_ARN');
    }
    async publishAppointmentCreated(appointment) {
        console.log('appointment');
        console.log(appointment);
        const message = JSON.stringify({
            id: appointment.id,
            insuredId: appointment.insuredId,
            scheduleId: appointment.scheduleId,
            countryISO: appointment.countryISO,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt
        });
        console.log('message publishAppointmentCreated');
        console.log(message);
        const params = {
            TopicArn: this.topicArn,
            Message: message,
            MessageAttributes: {
                countryISO: {
                    DataType: 'String',
                    StringValue: appointment.countryISO
                }
            }
        };
        await this.snsClient.send(new client_sns_1.PublishCommand(params));
    }
    async publishAppointmentConfirmed(_appointmentId, _countryISO) {
        return;
    }
}
exports.SNSService = SNSService;
//# sourceMappingURL=Sns.service.js.map