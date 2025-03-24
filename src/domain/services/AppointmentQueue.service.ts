export interface AppointmentQueueService {
    sendToConfirmationQueue(appointmentId: string): Promise<void>;
    receiveMessages(queueUrl: string): Promise<any[]>;
    deleteMessage(queueUrl: string, receiptHandle: string): Promise<void>;
}
