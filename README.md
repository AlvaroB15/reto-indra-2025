Documentación de Uso - Sistema de Citas Médicas
Introducción
Esta aplicación es un sistema serverless para la gestión de citas médicas que opera en Perú (PE) y Chile (CL). Está construida utilizando:

AWS Lambda
API Gateway
DynamoDB
SNS
SQS
EventBridge
MySQL

El sistema utiliza una arquitectura orientada a eventos para procesar citas médicas en diferentes países, siguiendo principios de arquitectura hexagonal/limpia.
Arquitectura del Sistema
Componentes Principales:

API REST: Endpoints para crear y consultar citas médicas
Almacenamiento Central: DynamoDB para registro unificado de citas
Sistema de Publicación/Suscripción: SNS para distribuir citas según el país
Colas de Mensajes: SQS para procesamiento asíncrono por país
Bus de Eventos: EventBridge para manejar confirmaciones
Bases de Datos Regionales: MySQL para almacenamiento específico por país

Flujo de Datos:

Se crea una cita a través del API Gateway
La cita se guarda en DynamoDB
Se publica un evento en SNS con el país correspondiente
La cita es encolada en SQS según el país (PE o CL)
Lambdas específicas por país procesan la cita y la guardan en MySQL
Se publica un evento de confirmación en EventBridge
La cita se marca como completada en DynamoDB
