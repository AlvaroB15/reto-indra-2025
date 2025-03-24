"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQSService = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
class SQSService {
    constructor(configService) {
        this.configService = configService;
        this.sqsClient = new client_sqs_1.SQSClient({ region: 'us-east-1' });
        this.confirmationQueueUrl = this.configService.get('CONFIRMATION_QUEUE_URL');
    }
    async sendToConfirmationQueue(appointmentId) {
        const params = {
            QueueUrl: this.confirmationQueueUrl,
            MessageBody: JSON.stringify({
                appointmentId
            })
        };
        await this.sqsClient.send(new client_sqs_1.SendMessageCommand(params));
    }
    async receiveMessages(queueUrl) {
        const response = await this.sqsClient.send(new client_sqs_1.ReceiveMessageCommand({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
        }));
        return response.Messages || [];
    }
    async deleteMessage(queueUrl, receiptHandle) {
        await this.sqsClient.send(new client_sqs_1.DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        }));
    }
}
exports.SQSService = SQSService;
//# sourceMappingURL=Sqs.service.js.map