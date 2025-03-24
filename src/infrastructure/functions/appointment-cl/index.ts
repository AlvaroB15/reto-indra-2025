
const lambda = {
    handler: './dist/src/infrastructure/functions/appointment-cl/handler.handler',
    events: [
        {
            sqs: {
                arn: { 'Fn::GetAtt': ['ChileAppointmentQueue', 'Arn'] },
                batchSize: 10
            }
        }
    ]
};

export default lambda;
