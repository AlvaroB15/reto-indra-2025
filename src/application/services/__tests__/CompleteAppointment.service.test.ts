import { CompleteAppointmentService } from '../CompleteAppointment.service';
import {AppointmentDynamoDBRepository} from "../../../domain/repositories/AppointmentDynamoDB.repository";
import {Appointment, AppointmentStatus, CountryISO} from "../../../domain/entities/Appointment.entity";

describe('CompleteAppointmentService', () => {
    let service: CompleteAppointmentService;
    let mockRepository: jest.Mocked<AppointmentDynamoDBRepository>;

    beforeEach(() => {
        // Crear mock para el repositorio
        mockRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findByInsuredId: jest.fn(),
            update: jest.fn()
        };

        // Inicializar el servicio con el mock
        service = new CompleteAppointmentService(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe actualizar el estado de una cita a completado', async () => {
        // Preparar datos de prueba
        const appointmentId = 'test-appointment-id';
        const updatedAppointment = new Appointment({
            id: appointmentId,
            insuredId: '00123',
            scheduleId: 100,
            countryISO: CountryISO.PERU,
            status: AppointmentStatus.COMPLETED,
            createdAt: new Date('2025-03-24T12:00:00Z'),
            updatedAt: new Date('2025-03-24T14:00:00Z')
        });

        // Configurar el comportamiento del mock
        mockRepository.update.mockResolvedValue(updatedAppointment);

        // Ejecutar el servicio
        await service.execute(appointmentId);

        // Verificaciones
        expect(mockRepository.update).toHaveBeenCalledWith(
            appointmentId,
            AppointmentStatus.COMPLETED
        );
    });

    it('debe manejar errores al actualizar la cita', async () => {
        // Preparar datos de prueba
        const appointmentId = 'test-appointment-id';

        // Configurar el mock para lanzar un error
        const errorMsg = 'Error al actualizar en DynamoDB';
        mockRepository.update.mockRejectedValue(new Error(errorMsg));

        // Verificar que el error se propaga correctamente
        await expect(service.execute(appointmentId)).rejects.toThrow(errorMsg);
    });
});
