"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChileSNSSubscription = exports.PeruSNSSubscription = exports.AppointmentTopic = void 0;
exports.AppointmentTopic = {
    Type: 'AWS::SNS::Topic',
    Properties: {
        TopicName: '${self:service}-appointments-${self:provider.stage}',
        Tags: [
            { Key: 'service', Value: '${self:service}' }
        ]
    }
};
exports.PeruSNSSubscription = {
    Type: 'AWS::SNS::Subscription',
    Properties: {
        TopicArn: { Ref: 'AppointmentTopic' },
        Protocol: 'sqs',
        Endpoint: { 'Fn::GetAtt': ['PeruAppointmentQueue', 'Arn'] },
        FilterPolicy: {
            countryISO: ['PE']
        }
    }
};
exports.ChileSNSSubscription = {
    Type: 'AWS::SNS::Subscription',
    Properties: {
        TopicArn: { Ref: 'AppointmentTopic' },
        Protocol: 'sqs',
        Endpoint: { 'Fn::GetAtt': ['ChileAppointmentQueue', 'Arn'] },
        FilterPolicy: {
            countryISO: ['CL']
        }
    }
};
//# sourceMappingURL=Sns.js.map