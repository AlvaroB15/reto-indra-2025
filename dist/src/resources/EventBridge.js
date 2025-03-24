"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentConfirmationRule = exports.AppointmentEventBus = void 0;
exports.AppointmentEventBus = {
    Type: 'AWS::Events::EventBus',
    Properties: {
        Name: '${self:service}-events-${self:provider.stage}'
    }
};
exports.AppointmentConfirmationRule = {
    Type: 'AWS::Events::Rule',
    Properties: {
        EventBusName: { Ref: 'AppointmentEventBus' },
        EventPattern: {
            source: ['appointment-service'],
            'detail-type': ['AppointmentConfirmed']
        },
        Targets: [
            {
                Id: 'ConfirmationQueue',
                Arn: { 'Fn::GetAtt': ['ConfirmationQueue', 'Arn'] }
            }
        ]
    }
};
//# sourceMappingURL=EventBridge.js.map