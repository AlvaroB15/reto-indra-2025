export const PeruAppointmentQueue = {
        Type: 'AWS::SQS::Queue',
        Properties: {
            QueueName: '${self:service}-pe-${self:provider.stage}',
            VisibilityTimeout: 60,
            MessageRetentionPeriod: 345600 // 4 días
        }
    };

export const ChileAppointmentQueue = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        QueueName: '${self:service}-cl-${self:provider.stage}',
        VisibilityTimeout: 60,
        MessageRetentionPeriod: 345600 // 4 días
    }
};

export const PeruQueuePolicy = {
    Type: 'AWS::SQS::QueuePolicy',
    Properties: {
        PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: '*',
                    Action: 'sqs:SendMessage',
                    Resource: { 'Fn::GetAtt': ['PeruAppointmentQueue', 'Arn'] },
                    Condition: {
                        ArnEquals: {
                            'aws:SourceArn': { Ref: 'AppointmentTopic' }
                        }
                    }
                }
            ]
        },
        Queues: [
            { Ref: 'PeruAppointmentQueue' }
        ]
    }
};

export const ChileQueuePolicy = {
    Type: 'AWS::SQS::QueuePolicy',
    Properties: {
        PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: '*',
                    Action: 'sqs:SendMessage',
                    Resource: { 'Fn::GetAtt': ['ChileAppointmentQueue', 'Arn'] },
                    Condition: {
                        ArnEquals: {
                            'aws:SourceArn': { Ref: 'AppointmentTopic' }
                        }
                    }
                }
            ]
        },
        Queues: [
            { Ref: 'ChileAppointmentQueue' }
        ]
    }
};

// CONFIRMATION
export const ConfirmationQueue = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        QueueName: '${self:service}-confirmation-${self:provider.stage}',
        VisibilityTimeout: 60,
        MessageRetentionPeriod: 345600 // 4 días
    }
};

export const ConfirmationQueuePolicy = {
    Type: 'AWS::SQS::QueuePolicy',
    Properties: {
        PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: '*',
                    Action: 'sqs:SendMessage',
                    Resource: { 'Fn::GetAtt': ['ConfirmationQueue', 'Arn'] },
                    Condition: {
                        ArnEquals: {
                            'aws:SourceArn': { Ref: 'AppointmentConfirmationRule' }
                        }
                    }
                }
            ]
        },
        Queues: [
            { Ref: 'ConfirmationQueue' }
        ]
    }
};
