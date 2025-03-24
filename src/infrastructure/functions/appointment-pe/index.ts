const lambda = {
    handler: './dist/src/infrastructure/functions/appointment-pe/handler.handler',
    events: [
        {
            sqs: {
                arn: { 'Fn::GetAtt': ['PeruAppointmentQueue', 'Arn'] },
                batchSize: 10
            }
        }
    ]
};

export default lambda;
