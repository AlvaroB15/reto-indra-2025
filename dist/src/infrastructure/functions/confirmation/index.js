"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda = {
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
exports.default = lambda;
//# sourceMappingURL=index.js.map