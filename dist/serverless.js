"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_appointment_1 = __importDefault(require("src/infrastructure/functions/create-appointment"));
const get_appointments_1 = __importDefault(require("src/infrastructure/functions/get-appointments"));
const appointment_pe_1 = __importDefault(require("src/infrastructure/functions/appointment-pe"));
const appointment_cl_1 = __importDefault(require("src/infrastructure/functions/appointment-cl"));
const confirmation_1 = __importDefault(require("src/infrastructure/functions/confirmation"));
const Dynamo_1 = __importDefault(require("@resources/Dynamo"));
const Sns_1 = require("@resources/Sns");
const Sqs_1 = require("@resources/Sqs");
const EventBridge_1 = require("@resources/EventBridge");
const serverlessConfiguration = {
    org: "alvarob15",
    service: "reto-indra-2025",
    app: "reto-indra-2025",
    frameworkVersion: "4",
    plugins: [
        "serverless-offline",
    ],
    provider: {
        name: "aws",
        runtime: "nodejs20.x",
        stage: "dev",
        logRetentionInDays: 7,
        memorySize: 256,
        timeout: 10,
        environment: {
            NODE_ENV: '${opt:stage, "dev"}',
            DYNAMODB_TABLE: '${self:service}-appointments-${self:provider.stage}',
            SNS_TOPIC_ARN: { Ref: 'AppointmentTopic' },
            SQS_PE_URL: { 'Fn::GetAtt': ['PeruAppointmentQueue', 'QueueUrl'] },
            SQS_CL_URL: { 'Fn::GetAtt': ['ChileAppointmentQueue', 'QueueUrl'] },
            EVENT_BUS_NAME: { Ref: 'AppointmentEventBus' },
            CONFIRMATION_QUEUE_URL: { 'Fn::GetAtt': ['ConfirmationQueue', 'QueueUrl'] },
            DB_HOST: '${self:custom.mysql.host}',
            DB_PORT: '${self:custom.mysql.port}',
            DB_USERNAME: '${self:custom.mysql.username}',
            DB_PASSWORD: '${self:custom.mysql.password}',
            DB_DATABASE_PE: '${self:custom.mysql.database_pe}',
            DB_DATABASE_CL: '${self:custom.mysql.database_cl}',
            SSL_CA_CERTIFICATE: '${self:custom.mysql.ssl_ca_certificate}',
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        iam: {
            role: {
                name: "role_aws_prueba_tecnica_indra_2025",
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "s3:PutObject",
                            "s3:DeleteObject",
                            "s3:GetObject",
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "secretsmanager:GetSecretValue"
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:DescribeTable",
                            "dynamodb:Query",
                            "dynamodb:GetItem",
                            "dynamodb:Scan",
                            "dynamodb:PutItem"
                        ],
                        Resource: [
                            "arn:aws:dynamodb:us-east-1:*:table/${self:service}-appointments-${self:provider.stage}",
                        ]
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "execute-api:Invoke"
                        ],
                        Resource: "arn:aws:execute-api:*:*:*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "sns:Publish"
                        ],
                        Resource: [
                            { "Fn::Join": [":", ["arn:aws:sns", { "Ref": "AWS::Region" }, { "Ref": "AWS::AccountId" }, "${self:service}-appointments-${self:provider.stage}"]] }
                        ]
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "sqs:SendMessage",
                            "sqs:ReceiveMessage",
                            "sqs:DeleteMessage",
                            "sqs:GetQueueAttributes"
                        ],
                        Resource: [
                            { "Fn::GetAtt": ["PeruAppointmentQueue", "Arn"] },
                            { "Fn::GetAtt": ["ChileAppointmentQueue", "Arn"] },
                            { "Fn::GetAtt": ["ConfirmationQueue", "Arn"] }
                        ]
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "events:PutEvents"
                        ],
                        Resource: [
                            { "Fn::GetAtt": ["AppointmentEventBus", "Arn"] }
                        ]
                    }
                ],
            }
        }
    },
    resources: {
        Resources: {
            AppointmentTable: Dynamo_1.default,
            AppointmentTopic: Sns_1.AppointmentTopic,
            PeruSNSSubscription: Sns_1.PeruSNSSubscription,
            ChileSNSSubscription: Sns_1.ChileSNSSubscription,
            PeruAppointmentQueue: Sqs_1.PeruAppointmentQueue,
            ChileAppointmentQueue: Sqs_1.ChileAppointmentQueue,
            PeruQueuePolicy: Sqs_1.PeruQueuePolicy,
            ChileQueuePolicy: Sqs_1.ChileQueuePolicy,
            AppointmentEventBus: EventBridge_1.AppointmentEventBus,
            AppointmentConfirmationRule: EventBridge_1.AppointmentConfirmationRule,
            ConfirmationQueue: Sqs_1.ConfirmationQueue,
            ConfirmationQueuePolicy: Sqs_1.ConfirmationQueuePolicy,
        }
    },
    functions: { createAppointment: create_appointment_1.default, getAppointments: get_appointments_1.default, appointmentPe: appointment_pe_1.default, appointmentCl: appointment_cl_1.default, confirmationHandler: confirmation_1.default },
    custom: {
        "serverless-offline": {
            httpPort: 3000
        },
        dynamodb: {
            stages: ["dev"],
            start: {
                port: 8000,
                inMemory: true,
                migrate: true,
            }
        },
        mysql: {
            host: '${ssm:/RETO_INDRA/MYSQL/HOST}',
            port: '${ssm:/RETO_INDRA/MYSQL/PORT}',
            username: '${ssm:/RETO_INDRA/MYSQL/USER}',
            password: '${ssm:/RETO_INDRA/MYSQL/PASSWORD}',
            database_pe: '${ssm:/RETO_INDRA/MYSQL/TABLE_PE}',
            database_cl: '${ssm:/RETO_INDRA/MYSQL/TABLE_CL}',
            ssl_ca_certificate: '${ssm:/RETO_INDRA/MYSQL/CA_CERTIFICATE}',
        },
        build: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node20",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 20
        },
        package: {
            individually: true,
            patterns: [
                '!node_modules/**',
                '!.serverless/**',
                '!.vscode/**',
                'src/**',
                '!.git/**',
                'dist/**',
                'package.json'
            ]
        }
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map