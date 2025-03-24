import { IsString, IsNumber, IsIn, Length, Matches } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAppointmentDto:
 *       type: object
 *       required:
 *         - insuredId
 *         - scheduleId
 *         - countryISO
 *       properties:
 *         insuredId:
 *           type: string
 *           description: Código del asegurado de 5 dígitos
 *           pattern: ^\\d{5}$
 *           example: '00123'
 */
export class CreateAppointmentDto {
    /**
     * Código del asegurado de 5 dígitos
     * @example 00123
     */
    @IsString()
    @Length(5, 5)
    @Matches(/^\d{5}$/, { message: 'insuredId must be a 5-digit number' })
    insuredId: string;

    /**
     * Identificador del espacio para agendar una cita
     * @example 100
     */
    @IsNumber()
    scheduleId: number;

    /**
     * Identificador de país. Solo puede ser PE o CL
     * @example PE
     */
    @IsString()
    @IsIn(['PE', 'CL'], { message: 'countryISO must be either PE or CL' })
    countryISO: string;
}
