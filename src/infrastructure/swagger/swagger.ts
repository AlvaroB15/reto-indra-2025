import swaggerJsdoc from 'swagger-jsdoc';
import * as fs from 'fs';
import * as path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Medical Appointment API',
            description: 'API for scheduling medical appointments in Peru (PE) and Chile (CL)',
            version: '1.0.0',
            contact: {
                name: 'Development Team',
                email: 'developers@medicalapp.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server'
            },
            {
                url: 'https://{stage}-api.medicalapp.com',
                description: 'Development/Production server',
                variables: {
                    stage: {
                        enum: ['dev', 'prod'],
                        default: 'dev'
                    }
                }
            }
        ],
        components: {
            schemas: {
                AppointmentStatus: {
                    type: 'string',
                    enum: ['pending', 'completed', 'failed']
                },
                CountryISO: {
                    type: 'string',
                    enum: ['PE', 'CL']
                },
                CreateAppointmentDto: {
                    type: 'object',
                    required: ['insuredId', 'scheduleId', 'countryISO'],
                    properties: {
                        insuredId: {
                            type: 'string',
                            description: 'Código del asegurado de 5 dígitos',
                            pattern: '^\\d{5}$',
                            example: '00123'
                        },
                        scheduleId: {
                            type: 'integer',
                            description: 'Identificador del espacio para agendar una cita',
                            example: 100
                        },
                        countryISO: {
                            '$ref': '#/components/schemas/CountryISO',
                            description: 'Identificador de país. Solo puede ser PE o CL',
                            example: 'PE'
                        }
                    }
                },
                AppointmentResponseDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        insuredId: {
                            type: 'string',
                            example: '00123'
                        },
                        scheduleId: {
                            type: 'integer',
                            example: 100
                        },
                        countryISO: {
                            '$ref': '#/components/schemas/CountryISO',
                            example: 'PE'
                        },
                        status: {
                            '$ref': '#/components/schemas/AppointmentStatus',
                            example: 'pending'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-03-24T12:00:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-03-24T12:00:00Z'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation failed'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    property: {
                                        type: 'string',
                                        example: 'insuredId'
                                    },
                                    constraints: {
                                        type: 'object',
                                        example: {
                                            isString: 'insuredId must be a string',
                                            length: 'insuredId must be exactly 5 characters long'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        paths: {
            '/appointments': {
                post: {
                    summary: 'Create a new appointment',
                    description: 'Create a new medical appointment for an insured person',
                    tags: ['appointments'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    '$ref': '#/components/schemas/CreateAppointmentDto'
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Appointment created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        '$ref': '#/components/schemas/AppointmentResponseDto'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Invalid request',
                            content: {
                                'application/json': {
                                    schema: {
                                        '$ref': '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    summary: 'Get appointments by insured ID',
                    description: 'Retrieve all appointments for a specific insured person',
                    tags: ['appointments'],
                    parameters: [
                        {
                            name: 'insuredId',
                            in: 'query',
                            description: 'ID of the insured person (5 digits)',
                            required: true,
                            schema: {
                                type: 'string',
                                pattern: '^\\d{5}$',
                                example: '00123'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'List of appointments',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            '$ref': '#/components/schemas/AppointmentResponseDto'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/**/*.ts']
};

const specs = swaggerJsdoc(options);

// Guardar especificación en archivo YAML o JSON
fs.writeFileSync(
    path.resolve(__dirname, 'swagger.json'),
    JSON.stringify(specs, null, 2)
);

console.log('Swagger documentation generated: swagger.json');
