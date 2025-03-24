const ResourceDynamo = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
        TableName: '${self:provider.environment.DYNAMODB_TABLE}',
        BillingMode: 'PAY_PER_REQUEST',
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'insuredId', AttributeType: 'S' }
        ],
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'insuredId-index',
                KeySchema: [
                    { AttributeName: 'insuredId', KeyType: 'HASH' }
                ],
                Projection: {
                    ProjectionType: 'ALL'
                }
            }
        ]
    }
}

export default ResourceDynamo;
