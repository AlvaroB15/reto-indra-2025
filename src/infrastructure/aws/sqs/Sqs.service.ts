import {
    SQSClient,
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SendMessageCommand
} from '@aws-sdk/client-sqs';
import {ConfigService} from "../../config/Config.service";
import {AppointmentQueueService} from "../../../domain/services/AppointmentQueue.service";

export class SQSService implements AppointmentQueueService{
    private readonly sqsClient: SQSClient;
    private readonly confirmationQueueUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.sqsClient = new SQSClient({region: 'us-east-1'});
        this.confirmationQueueUrl = this.configService.get<string>('CONFIRMATION_QUEUE_URL');
    }

    async sendToConfirmationQueue(appointmentId: string): Promise<void> {
        const params = {
            QueueUrl: this.confirmationQueueUrl,
            MessageBody: JSON.stringify({
                appointmentId
            })
        };
        await this.sqsClient.send(new SendMessageCommand(params));
    }

    async receiveMessages(queueUrl: string): Promise<any[]> {
        const response = await this.sqsClient.send(
            new ReceiveMessageCommand({
                QueueUrl: queueUrl,
                MaxNumberOfMessages: 10,
                WaitTimeSeconds: 20,
            }),
        );
        return response.Messages || [];
    }

    async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
        await this.sqsClient.send(
            new DeleteMessageCommand({
                QueueUrl: queueUrl,
                ReceiptHandle: receiptHandle,
            }),
        );
    }
}
