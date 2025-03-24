import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetAppointmentsService } from '../../../application/services/GetAppointments.service';
import {initializeContainer} from "../../di/initialize";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Inicializar el contenedor de dependencias
        const container = initializeContainer();
        const getAppointmentsService = container.get<GetAppointmentsService>('GetAppointmentsService');

        // Extraer el parámetro insuredId
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

        // Validar formato del insuredId (5 dígitos)
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

        // Ejecutar el servicio
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
    } catch (error) {
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
