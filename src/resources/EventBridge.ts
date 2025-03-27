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
                Arn: { 'Fn::GetAtt': ['ConfirmationQueue', 'Arn'] },
                // InputPath: '$.detail'
                // InputTransformer: {
                //     InputPathsMap: {
                //         "appointmentId": "$.detail.appointmentId",
                //         "countryISO": "$.detail.countryISO"
                //     },
                //     InputTemplate: JSON.stringify({
                //         detail: {
                //             appointmentId: "<appointmentId>",
                //             countryISO: "<countryISO>"
                //         }
                //     })
                // }
            }
        ]
    }
};

export const EventBridgeSQSPermission = {
    Type: 'AWS::SQS::QueuePolicy',
    Properties: {
        PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        Service: 'events.amazonaws.com'
                    },
                    Action: 'sqs:SendMessage',
                    Resource: {'Fn::GetAtt': ['ConfirmationQueue', 'Arn']}
                }
            ]
        },
        Queues: [
            {Ref: 'ConfirmationQueue'}
        ]
    }
};
