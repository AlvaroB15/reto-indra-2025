"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const initialize_1 = require("../../di/initialize");
const handler = async (event) => {
    try {
        const container = (0, initialize_1.initializeContainer)();
        const getAppointmentsService = container.get('GetAppointmentsService');
        const insuredId = event.queryStringParameters?.insuredId;
        if (!insuredId) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: 'Missing required parameter: insuredId'
                })
            };
        }
        if (!/^\d{5}$/.test(insuredId)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: 'Invalid insuredId format. It must be a 5-digit number.'
                })
            };
        }
        const appointments = await getAppointmentsService.execute(insuredId);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(appointments)
        };
    }
    catch (error) {
        console.error('Error getting appointments:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=handler.js.map