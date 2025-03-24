import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand,
    QueryCommand
} from '@aws-sdk/lib-dynamodb';
import {Appointment} from "../../../domain/entities/Appointment.entity";
import {AppointmentDynamoDBRepository} from "../../../domain/repositories/AppointmentDynamoDB.repository";


export class DynamoDBAppointmentRepository implements AppointmentDynamoDBRepository {
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
        this.tableName = process.env.DYNAMODB_TABLE || '';
        // this.tableName = this.configService.get<string>('DYNAMODB_TABLE');
    }

    async save(appointment: Appointment): Promise<Appointment> {
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

        await this.docClient.send(new PutCommand(params));
        return appointment;
    }

    async update(id: string, status: string): Promise<Appointment | null> {
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
            // ReturnValues: 'ALL_NEW'
        };
        const { Attributes } = await this.docClient.send(new UpdateCommand(params));
        if (!Attributes) return null;
        return new Appointment({
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

    async findById(id: string): Promise<Appointment | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        const { Item } = await this.docClient.send(new GetCommand(params));

        if (!Item) return null;

        return new Appointment({
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

    async findByInsuredId(insuredId: string): Promise<Appointment[]> {
        const params = {
            TableName: this.tableName,
            IndexName: 'insuredId-index',
            KeyConditionExpression: 'insuredId = :insuredId',
            ExpressionAttributeValues: {
                ':insuredId': insuredId
            }
        };

        const { Items } = await this.docClient.send(new QueryCommand(params));

        if (!Items || Items.length === 0) return [];

        return Items.map(item => new Appointment({
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
