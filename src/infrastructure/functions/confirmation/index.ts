const lambda =  {
    handler: './dist/src/infrastructure/functions/confirmation/handler.handler',
    events: [
        {
            sqs: {
                arn: { 'Fn::GetAtt': ['ConfirmationQueue', 'Arn'] },
                batchSize: 10
            }
        }
    ]
};

export default lambda;
