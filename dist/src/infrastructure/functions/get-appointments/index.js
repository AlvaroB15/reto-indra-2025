"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lambda = {
    handler: './dist/src/infrastructure/functions/get-appointments/handler.handler',
    events: [
        {
            http: {
                path: '/appointments',
                method: 'get',
                cors: true,
                request: {
                    parameters: {
                        querystrings: {
                            insuredId: true
                        }
                    }
                }
            }
        }
    ]
};
exports.default = lambda;
//# sourceMappingURL=index.js.map