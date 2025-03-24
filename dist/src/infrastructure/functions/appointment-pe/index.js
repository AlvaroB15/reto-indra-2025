"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = lambda;
//# sourceMappingURL=index.js.map