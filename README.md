# Documentación de Uso - Sistema de Citas Médicas
### Introducción
Esta aplicación es un sistema serverless para la gestión de citas médicas que opera en Perú (PE) y Chile (CL). Está construida utilizando:

- AWS Lambda
- API Gateway
- DynamoDB
- SNS
- SQS
- EventBridge
- MySQL

El sistema utiliza una arquitectura orientada a eventos para procesar citas médicas en diferentes países, siguiendo principios de arquitectura hexagonal/limpia.

### Arquitectura del Sistema
### Componentes Principales:

1. LambdasAPI REST: Endpoints para crear y consultar citas médicas
2. Almacenamiento Central: DynamoDB para registro unificado de citas
3. Sistema de Publicación/Suscripción: SNS para distribuir citas según el país
4. Colas de Mensajes: SQS para procesamiento asíncrono por país
5. Bus de Eventos: EventBridge para manejar confirmaciones
6. Bases de Datos Regionales: MySQL para almacenamiento específico por país

### Flujo de Datos:

1. Se crea una cita a través del API Gateway
2. La cita se guarda en DynamoDB
3. Se publica un evento en SNS con el país correspondiente
4. La cita es encolada en SQS según el país (PE o CL)
5. Lambdas específicas por país procesan la cita y la guardan en MySQL
6. Se publica un evento de confirmación en EventBridge
7. La cita se marca como completada en DynamoDB
