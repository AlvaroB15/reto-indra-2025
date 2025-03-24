/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *         insuredId:
 *           type: string
 *           example: '00123'
 *         scheduleId:
 *           type: integer
 *           example: 100
 *         countryISO:
 *           $ref: '#/components/schemas/CountryISO'
 *           example: 'PE'
 *         status:
 *           $ref: '#/components/schemas/AppointmentStatus'
 *           example: 'pending'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2025-03-24T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2025-03-24T12:00:00Z'
 */

export class AppointmentResponseDto {

    /**
     * Identificador único de la cita
     * @example 123e4567-e89b-12d3-a456-426614174000
     */
    id: string;

    /**
     * Código del asegurado
     * @example 00123
     */
    insuredId: string;

    /**
     * Identificador del espacio para agendar una cita
     * @example 100
     */
    scheduleId: number;

    /**
     * Identificador de país (PE o CL)
     * @example PE
     */
    countryISO: string;

    /**
     * Estado actual de la cita (pending, completed, failed)
     * @example pending
     */
    status: string;

    /**
     * Fecha de creación de la cita
     * @example 2025-03-24T12:00:00Z
     */
    createdAt: Date;

    /**
     * Fecha de última actualización de la cita
     * @example 2025-03-24T12:00:00Z
     */
    updatedAt: Date;
}
