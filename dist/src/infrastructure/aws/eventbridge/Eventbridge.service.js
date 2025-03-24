"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeService = void 0;
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
class EventBridgeService {
    constructor(configService) {
        this.configService = configService;
        this.client = new client_eventbridge_1.EventBridgeClient({ region: 'us-east-1' });
        this.eventBusName = this.configService.get('EVENT_BUS_NAME');
    }
    async publishAppointmentConfirmed(appointmentId, countryISO) {
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
        await this.client.send(new client_eventbridge_1.PutEventsCommand(params));
    }
}
exports.EventBridgeService = EventBridgeService;
//# sourceMappingURL=Eventbridge.service.js.map