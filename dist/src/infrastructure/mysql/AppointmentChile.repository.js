"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLAppointmentChileRepository = void 0;
const typeorm_1 = require("typeorm");
class MySQLAppointmentChileRepository {
    constructor(configService) {
        this.configService = configService;
        this.dataSource = new typeorm_1.DataSource({
            type: 'mysql',
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_DATABASE_CL'),
            synchronize: false,
            ssl: {
                ca: process.env.SSL_CA_CERTIFICATE,
                rejectUnauthorized: true
            },
            driver: require('mysql2')
        });
    }
    async initialize() {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }
        await this.ensureTableExists();
    }
    async ensureTableExists() {
        try {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
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
        }
        catch (error) {
            console.error('Error creating appointments table:', error);
            throw error;
        }
    }
    async saveAppointment(appointment) {
        await this.initialize();
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
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
}
exports.MySQLAppointmentChileRepository = MySQLAppointmentChileRepository;
//# sourceMappingURL=AppointmentChile.repository.js.map