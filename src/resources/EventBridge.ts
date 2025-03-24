export const AppointmentEventBus = {
    Type: 'AWS::Events::EventBus',
    Properties: {
        Name: '${self:service}-events-${self:provider.stage}'
    }
};

export const AppointmentConfirmationRule = {
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
