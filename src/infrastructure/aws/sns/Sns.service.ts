import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import {ConfigService} from "../../config/Config.service";
import {Appointment} from "../../../domain/entities/Appointment.entity";
import {AppointmentPublisherService} from "../../../domain/services/AppointmentPublisher.service";

export class SNSService implements AppointmentPublisherService {
    private readonly snsClient: SNSClient;
    private readonly topicArn: string;

    constructor(private readonly configService: ConfigService) {
        this.snsClient = new SNSClient({ region: 'us-east-1' });
        this.topicArn = this.configService.get<string>('SNS_TOPIC_ARN');
    }

    async publishAppointmentCreated(appointment: Appointment): Promise<void> {
        const message = JSON.stringify({
            id: appointment.id,
            insuredId: appointment.insuredId,
            scheduleId: appointment.scheduleId,
            countryISO: appointment.countryISO,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt
        });

        const params = {
            TopicArn: this.topicArn,
            Message: message,
            MessageAttributes: {
                countryISO: {
                    DataType: 'String',
                    StringValue: appointment.countryISO
                    // StringValue: JSON.stringify(appointment)
                }
            }
        };

        await this.snsClient.send(new PublishCommand(params));
    }

    async publishAppointmentConfirmed(_appointmentId: string, _countryISO: string): Promise<void> {
        // Esta función no se utiliza para SNS, pero se implementa por la interfaz
        // La confirmación se maneja a través de EventBridge
        return;
    }
}
