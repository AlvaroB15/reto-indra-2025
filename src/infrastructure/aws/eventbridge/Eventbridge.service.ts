import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import {ConfigService} from "../../config/Config.service";
import {AppointmentEventService} from "../../../domain/services/AppointmentEvent.service";

export class EventBridgeService implements AppointmentEventService {
    private readonly client: EventBridgeClient;
    private readonly eventBusName: string;

    constructor(private readonly configService: ConfigService) {
        this.client = new EventBridgeClient({ region: 'us-east-1' });
        this.eventBusName = this.configService.get<string>('EVENT_BUS_NAME');
    }

    async publishAppointmentConfirmed(appointmentId: string, countryISO: string): Promise<void> {
        const params = {
            Entries: [
                {
                    Source: 'appointment-service',
                    DetailType: 'AppointmentConfirmed',
                    Detail: JSON.stringify({
                        appointmentId,
                        countryISO
                    }),
                    EventBusName: this.eventBusName
                }
            ]
        };

        try {
            const result = await this.client.send(new PutEventsCommand(params));
            if (result.FailedEntryCount && result.FailedEntryCount > 0) {
                console.error('Error al publicar eventos:', JSON.stringify(result.Entries));
            }
        } catch (error) {
            console.error('Error al publicar en EventBridge:', error);
            throw error;
        }
    }
}
