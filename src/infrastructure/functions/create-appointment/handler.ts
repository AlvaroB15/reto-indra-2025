import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateAppointmentService } from '../../../application/services/CreateAppointment.service';
import { CreateAppointmentDto } from '../../../application/dtos/CreateAppointment.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {initializeContainer} from "../../di/initialize";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Inicializar el contenedor de dependencias
        const container = initializeContainer();
        const createAppointmentService = container.get<CreateAppointmentService>('CreateAppointmentService');

        // Parsear el cuerpo de la solicitud
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

        // Validar DTO
        const createAppointmentDto = plainToInstance(CreateAppointmentDto, body);
        const errors = await validate(createAppointmentDto);

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

        // Ejecutar el servicio
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
    } catch (error) {
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
