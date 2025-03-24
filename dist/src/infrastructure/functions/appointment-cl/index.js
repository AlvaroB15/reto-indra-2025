"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = lambda;
//# sourceMappingURL=index.js.map