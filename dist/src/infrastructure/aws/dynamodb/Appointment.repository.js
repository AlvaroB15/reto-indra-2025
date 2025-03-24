"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBAppointmentRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const Appointment_entity_1 = require("../../../domain/entities/Appointment.entity");
class DynamoDBAppointmentRepository {
    constructor() {
        const client = new client_dynamodb_1.DynamoDBClient({});
        this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
        this.tableName = process.env.DYNAMODB_TABLE || '';
    }
    async save(appointment) {
        const params = {
            TableName: this.tableName,
            Item: {
                id: appointment.id,
                insuredId: appointment.insuredId,
                scheduleId: appointment.scheduleId,
                countryISO: appointment.countryISO,
                status: appointment.status,
                createdAt: appointment.createdAt.toISOString(),
                updatedAt: appointment.updatedAt.toISOString(),
                scheduleDetails: appointment.scheduleDetails || null
            }
        };
        await this.docClient.send(new lib_dynamodb_1.PutCommand(params));
        return appointment;
    }
    async update(id, status) {
        const params = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':status': status,
                ':updatedAt': new Date().toISOString()
            },
        };
        const { Attributes } = await this.docClient.send(new lib_dynamodb_1.UpdateCommand(params));
        if (!Attributes)
            return null;
        return new Appointment_entity_1.Appointment({
            id: Attributes.id,
            insuredId: Attributes.insuredId,
            scheduleId: Attributes.scheduleId,
            countryISO: Attributes.countryISO,
            status: Attributes.status,
            createdAt: new Date(Attributes.createdAt),
            updatedAt: new Date(Attributes.updatedAt),
            scheduleDetails: Attributes.scheduleDetails
        });
    }
    async findById(id) {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };
        const { Item } = await this.docClient.send(new lib_dynamodb_1.GetCommand(params));
        if (!Item)
            return null;
        return new Appointment_entity_1.Appointment({
            id: Item.id,
            insuredId: Item.insuredId,
            scheduleId: Item.scheduleId,
            countryISO: Item.countryISO,
            status: Item.status,
            createdAt: new Date(Item.createdAt),
            updatedAt: new Date(Item.updatedAt),
            scheduleDetails: Item.scheduleDetails
        });
    }
    async findByInsuredId(insuredId) {
        const params = {
            TableName: this.tableName,
            IndexName: 'insuredId-index',
            KeyConditionExpression: 'insuredId = :insuredId',
            ExpressionAttributeValues: {
                ':insuredId': insuredId
            }
        };
        const { Items } = await this.docClient.send(new lib_dynamodb_1.QueryCommand(params));
        if (!Items || Items.length === 0)
            return [];
        return Items.map(item => new Appointment_entity_1.Appointment({
            id: item.id,
            insuredId: item.insuredId,
            scheduleId: item.scheduleId,
            countryISO: item.countryISO,
            status: item.status,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            scheduleDetails: item.scheduleDetails
        }));
    }
}
exports.DynamoDBAppointmentRepository = DynamoDBAppointmentRepository;
//# sourceMappingURL=Appointment.repository.js.map