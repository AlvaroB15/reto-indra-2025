"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const CreateAppointment_dto_1 = require("../../../application/dtos/CreateAppointment.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const initialize_1 = require("../../di/initialize");
const handler = async (event) => {
    try {
        const container = (0, initialize_1.initializeContainer)();
        const createAppointmentService = container.get('CreateAppointmentService');
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: 'Request body is required'
                })
            };
        }
        const body = JSON.parse(event.body);
        const createAppointmentDto = (0, class_transformer_1.plainToInstance)(CreateAppointment_dto_1.CreateAppointmentDto, body);
        const errors = await (0, class_validator_1.validate)(createAppointmentDto);
        if (errors.length > 0) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: 'Validation failed',
                    errors: errors.map(err => ({
                        property: err.property,
                        constraints: err.constraints
                    }))
                })
            };
        }
        const result = await createAppointmentService.execute(createAppointmentDto);
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(result)
        };
    }
    catch (error) {
        console.error('Error creating appointment:', error);
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