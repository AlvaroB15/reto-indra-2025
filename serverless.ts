import type {AWS} from "@serverless/typescript";
//Functions
import createAppointment from "src/infrastructure/functions/create-appointment";
import getAppointments from "src/infrastructure/functions/get-appointments";
import appointmentPe from "src/infrastructure/functions/appointment-pe";
import appointmentCl from "src/infrastructure/functions/appointment-cl";
import confirmationHandler from "src/infrastructure/functions/confirmation";

//Resources
import AppointmentTable from "@resources/Dynamo";
import {
    AppointmentTopic,
    PeruSNSSubscription,
    ChileSNSSubscription
} from "@resources/Sns";
import {
    PeruAppointmentQueue,
    ChileAppointmentQueue,
    PeruQueuePolicy,
    ChileQueuePolicy,
    ConfirmationQueue,
    ConfirmationQueuePolicy
} from "@resources/Sqs";
import {
    AppointmentEventBus,
    AppointmentConfirmationRule,
    EventBridgeSQSPermission
} from "@resources/EventBridge";

const serverlessConfiguration: AWS = {
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
            SNS_TOPIC_ARN: {Ref: 'AppointmentTopic'},
            SQS_PE_URL: {'Fn::GetAtt': ['PeruAppointmentQueue', 'QueueUrl']},
            SQS_CL_URL: {'Fn::GetAtt': ['ChileAppointmentQueue', 'QueueUrl']},
            EVENT_BUS_NAME: {Ref: 'AppointmentEventBus'},
            CONFIRMATION_QUEUE_URL: {'Fn::GetAtt': ['ConfirmationQueue', 'QueueUrl']},
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
                            "dynamodb:PutItem",
                            "dynamodb:UpdateItem",
                        ],
                        Resource: [
                            "arn:aws:dynamodb:us-east-1:*:table/${self:service}-appointments-${self:provider.stage}",
                            "arn:aws:dynamodb:us-east-1:*:table/${self:service}-appointments-${self:provider.stage}/index/*"
                        ]
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "execute-api:Invoke"
                        ],
                        Resource: "arn:aws:execute-api:*:*:*"
                    },
                    // Permisos SNS corregidos
                    {
                        Effect: "Allow",
                        Action: [
                            "sns:Publish"
                        ],
                        Resource: [
                            {"Fn::Join": [":", ["arn:aws:sns", {"Ref": "AWS::Region"}, {"Ref": "AWS::AccountId"}, "${self:service}-appointments-${self:provider.stage}"]]}
                        ]
                    },
                    // Permisos SQS
                    {
                        Effect: "Allow",
                        Action: [
                            "sqs:SendMessage",
                            "sqs:ReceiveMessage",
                            "sqs:DeleteMessage",
                            "sqs:GetQueueAttributes"
                        ],
                        Resource: [
                            {"Fn::GetAtt": ["PeruAppointmentQueue", "Arn"]},
                            {"Fn::GetAtt": ["ChileAppointmentQueue", "Arn"]},
                            {"Fn::GetAtt": ["ConfirmationQueue", "Arn"]}
                        ]
                    },
                    // Permisos EventBridge
                    {
                        Effect: "Allow",
                        Action: [
                            "events:PutEvents",
                            "events:PutRule",
                            "events:PutTargets",
                            "events:DescribeRule",
                            "events:ListRules",
                            "events:ListTargetsByRule"
                        ],
                        Resource: [
                            {"Fn::GetAtt": ["AppointmentEventBus", "Arn"]},
                            {"Fn::Join": [":", ["arn:aws:events", {"Ref": "AWS::Region"}, {"Ref": "AWS::AccountId"}, "rule/${self:service}-events-${self:provider.stage}/*"]]}
                        ]
                    }
                ],
            }
        }
    },
    resources: {
        Resources: {
            AppointmentTable,
            AppointmentTopic,
            PeruSNSSubscription,
            ChileSNSSubscription,
            PeruAppointmentQueue,
            ChileAppointmentQueue,
            PeruQueuePolicy,
            ChileQueuePolicy,
            AppointmentEventBus,
            AppointmentConfirmationRule,
            ConfirmationQueue,
            ConfirmationQueuePolicy,
            EventBridgeSQSPermission
        }
    },
    functions: {createAppointment, getAppointments, appointmentPe, appointmentCl, confirmationHandler},
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
            define: {"require.resolve": undefined},
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
