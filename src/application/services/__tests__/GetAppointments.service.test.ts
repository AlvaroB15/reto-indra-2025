import { GetAppointmentsService } from "../GetAppointments.service";
import {AppointmentDynamoDBRepository} from "../../../domain/repositories/AppointmentDynamoDB.repository";
import {Appointment, AppointmentStatus, CountryISO} from "../../../domain/entities/Appointment.entity";

describe('GetAppointmentsService', () => {
    let service: GetAppointmentsService;
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
        service = new GetAppointmentsService(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debe retornar una lista de citas para un asegurado', async () => {
        // Preparar datos de prueba
        const insuredId = '00123';
        const appointments = [
            new Appointment({
                id: 'test-uuid-1',
                insuredId,
                scheduleId: 100,
                countryISO: CountryISO.PERU,
                status: AppointmentStatus.PENDING,
                createdAt: new Date('2025-03-24T12:00:00Z'),
                updatedAt: new Date('2025-03-24T12:00:00Z')
            }),
            new Appointment({
                id: 'test-uuid-2',
                insuredId,
                scheduleId: 101,
                countryISO: CountryISO.CHILE,
                status: AppointmentStatus.COMPLETED,
                createdAt: new Date('2025-03-23T10:00:00Z'),
                updatedAt: new Date('2025-03-23T12:30:00Z')
            })
        ];

        // Configurar el comportamiento del mock
        mockRepository.findByInsuredId.mockResolvedValue(appointments);

        // Ejecutar el servicio
        const result = await service.execute(insuredId);

        // Verificaciones
        expect(mockRepository.findByInsuredId).toHaveBeenCalledWith(insuredId);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('test-uuid-1');
        expect(result[1].id).toBe('test-uuid-2');
    });

    it('debe retornar una lista vacía si no hay citas', async () => {
        // Preparar datos de prueba
        const insuredId = '00123';

        // Configurar el comportamiento del mock
        mockRepository.findByInsuredId.mockResolvedValue([]);

        // Ejecutar el servicio
        const result = await service.execute(insuredId);

        // Verificaciones
        expect(mockRepository.findByInsuredId).toHaveBeenCalledWith(insuredId);
        expect(result).toEqual([]);
    });
});
