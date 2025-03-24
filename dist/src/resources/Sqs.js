"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationQueuePolicy = exports.ConfirmationQueue = exports.ChileQueuePolicy = exports.PeruQueuePolicy = exports.ChileAppointmentQueue = exports.PeruAppointmentQueue = void 0;
exports.PeruAppointmentQueue = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        QueueName: '${self:service}-pe-${self:provider.stage}',
        VisibilityTimeout: 60,
        MessageRetentionPeriod: 345600
    }
};
exports.ChileAppointmentQueue = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        QueueName: '${self:service}-cl-${self:provider.stage}',
        VisibilityTimeout: 60,
        MessageRetentionPeriod: 345600
    }
};
exports.PeruQueuePolicy = {
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
exports.ChileQueuePolicy = {
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
exports.ConfirmationQueue = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        QueueName: '${self:service}-confirmation-${self:provider.stage}',
        VisibilityTimeout: 60,
        MessageRetentionPeriod: 345600
    }
};
exports.ConfirmationQueuePolicy = {
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
//# sourceMappingURL=Sqs.js.map