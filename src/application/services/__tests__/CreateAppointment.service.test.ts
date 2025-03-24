import { CreateAppointmentService } from '../CreateAppointment.service';
import { AppointmentDynamoDBRepository } from '../../../domain/repositories/AppointmentDynamoDB.repository';
import { AppointmentPublisherService } from '../../../domain/services/AppointmentPublisher.service';
import { CreateAppointmentDto } from '../../dtos/CreateAppointment.dto';
import { Appointment, CountryISO, AppointmentStatus } from '../../../domain/entities/Appointment.entity';
import { v4 as uuidv4 } from 'uuid';

// Mock UUID para tener un ID predecible en las pruebas
jest.mock('uuid');
(uuidv4 as jest.Mock).mockReturnValue('test-uuid-1234');

describe('CreateAppointmentService', () => {
    let service: CreateAppointmentService;
    let mockRepository: jest.Mocked<AppointmentDynamoDBRepository>;
    let mockPublisher: jest.Mocked<AppointmentPublisherService>;

    beforeEach(() => {
        // Crear mocks para las dependencias
        mockRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findByInsuredId: jest.fn(),
            update: jest.fn()
        };

        mockPublisher = {
            publishAppointmentCreated: jest.fn(),
            publishAppointmentConfirmed: jest.fn()
        };

        // Inicializar el servicio con los mocks
        service = new CreateAppointmentService(mockRepository, mockPublisher);

        // Configurar la fecha para que sea constante en las pruebas
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-03-24T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it('debe crear una cita correctamente', async () => {
        // Preparar datos de prueba
        const dto: CreateAppointmentDto = {
            insuredId: '00123',
            scheduleId: 100,
            countryISO: 'PE'
        };

        const expectedAppointment = new Appointment({
            id: 'test-uuid-1234',
            insuredId: '00123',
            scheduleId: 100,
            countryISO: CountryISO.PERU,
            status: AppointmentStatus.PENDING,
            createdAt: new Date('2025-03-24T12:00:00Z'),
            updatedAt: new Date('2025-03-24T12:00:00Z')
        });

        // Configurar el comportamiento del mock del repositorio
        mockRepository.save.mockResolvedValue(expectedAppointment);

        // Ejecutar el servicio
        const result = await service.execute(dto);

        // Verificaciones
        expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            id: 'test-uuid-1234',
            insuredId: '00123',
            scheduleId: 100,
            countryISO: 'PE',
            status: 'pending'
        }));

        expect(mockPublisher.publishAppointmentCreated).toHaveBeenCalledWith(expectedAppointment);

        expect(result).toEqual({
            id: 'test-uuid-1234',
            insuredId: '00123',
            scheduleId: 100,
            countryISO: 'PE',
            status: 'pending',
            createdAt: new Date('2025-03-24T12:00:00Z'),
            updatedAt: new Date('2025-03-24T12:00:00Z')
        });
    });

    it('debe manejar errores del repositorio correctamente', async () => {
        // Preparar datos de prueba
        const dto: CreateAppointmentDto = {
            insuredId: '00123',
            scheduleId: 100,
            countryISO: 'PE'
        };

        // Configurar el mock para lanzar un error
        const errorMsg = 'Error al guardar en DynamoDB';
        mockRepository.save.mockRejectedValue(new Error(errorMsg));

        // Verificar que el error se propaga correctamente
        await expect(service.execute(dto)).rejects.toThrow(errorMsg);

        // Verificar que el publisher no se llamó
        expect(mockPublisher.publishAppointmentCreated).not.toHaveBeenCalled();
    });
});
