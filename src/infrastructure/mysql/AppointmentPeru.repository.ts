import {DataSource} from 'typeorm';
import {Appointment} from '../../domain/entities/Appointment.entity';
import {ConfigService} from "../config/Config.service";
import {AppointmentMysqlRepository} from "../../domain/repositories/AppointmentMysql.repository";


export class MySQLAppointmentPeruRepository implements AppointmentMysqlRepository{
    private dataSource: DataSource;
    private connectionPromise: Promise<DataSource> | null = null;

    constructor(private readonly configService: ConfigService) {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE_PE'),
            synchronize: false,
            ssl: {
                // Certificado CA directamente como string desde variable de entorno
                ca: process.env.SSL_CA_CERTIFICATE,
                rejectUnauthorized: true
            },
            driver: require('mysql2')
        });
    }

    private getConnection(): Promise<DataSource> {
        if (!this.connectionPromise) {
            this.connectionPromise = this.dataSource.initialize()
                .then(async (ds) => {
                    await this.ensureTableExists();
                    return ds;
                })
                .catch(error => {
                    this.connectionPromise = null;
                    throw error;
                });
        }
        return this.connectionPromise;
    }

    private async ensureTableExists(): Promise<void> {
        try {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();

            // Crear la tabla si no existe
            await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS appointments (
                    id VARCHAR(36) PRIMARY KEY,
                    insured_id VARCHAR(5) NOT NULL,
                    schedule_id INT NOT NULL,
                    status VARCHAR(20) NOT NULL,
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME NOT NULL,
                    INDEX idx_insured_id (insured_id)
                );
            `);

            await queryRunner.release();
        } catch (error) {
            console.error('Error creating appointments table:', error);
            throw error;
        }
    }



    async saveAppointment(appointment: Appointment): Promise<void> {
        await this.getConnection();

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query(`
                INSERT INTO appointments (id, insured_id, schedule_id, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                appointment.id,
                appointment.insuredId,
                appointment.scheduleId,
                appointment.status,
                appointment.createdAt,
                appointment.updatedAt
            ]);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
