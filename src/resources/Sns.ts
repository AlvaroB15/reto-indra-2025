export const AppointmentTopic = {
    Type: 'AWS::SNS::Topic',
    Properties: {
        TopicName: '${self:service}-appointments-${self:provider.stage}',
        Tags: [
            {Key: 'service', Value: '${self:service}'}
        ]
    }
};

export const PeruSNSSubscription = {
    Type: 'AWS::SNS::Subscription',
    Properties: {
        TopicArn: {Ref: 'AppointmentTopic'},
        Protocol: 'sqs',
        Endpoint: {'Fn::GetAtt': ['PeruAppointmentQueue', 'Arn']},
        FilterPolicy: {
            countryISO: ['PE']
        }
    }
};

export const ChileSNSSubscription = {
    Type: 'AWS::SNS::Subscription',
    Properties: {
        TopicArn: {Ref: 'AppointmentTopic'},
        Protocol: 'sqs',
        Endpoint: {'Fn::GetAtt': ['ChileAppointmentQueue', 'Arn']},
        FilterPolicy: {
            countryISO: ['CL']
        }
    }
};
