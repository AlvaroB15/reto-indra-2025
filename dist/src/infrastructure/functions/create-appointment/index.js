"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda = {
    handler: './dist/src/infrastructure/functions/create-appointment/handler.handler',
    events: [
        {
            http: {
                path: '/appointments',
                method: 'post',
                cors: true
            }
        }
    ]
};
exports.default = lambda;
//# sourceMappingURL=index.js.map