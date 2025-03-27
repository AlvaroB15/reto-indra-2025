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

#### Endpoints
- POST - https://xwygngmis9.execute-api.us-east-1.amazonaws.com/dev/appointments
```json
{
  "insuredId": "12345",
  "scheduleId": 100,
  "countryISO": "PE"
}
```
- GET - https://xwygngmis9.execute-api.us-east-1.amazonaws.com/dev/appointments?insuredId=12345

Credenciales para el Mysql (solo entrar 1 que tiene limitaciones, y da el to many connections)
Como dato adicional, te pide un certificado, deben descargarlo y adjuntarlo
```json
Host=reto-indra-pe-alvaro15unmsm-5ed7.j.aivencloud.com
DB=defaultdb
USER=avnadmin
PASSWORD=AVNS_jJbLsQXq68i20AGgnOW
CA certificate

-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUVoNiD7Fp8YYarbBZLlfUghyX/RYwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1ODBiM2I1ZDYtMDkwYi00YzZiLWI5ZWYtNWEwNTA2OGZi
Zjg0IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMzI0MTAwNTM1WhcNMzUwMzIyMTAw
NTM1WjBAMT4wPAYDVQQDDDU4MGIzYjVkNi0wOTBiLTRjNmItYjllZi01YTA1MDY4
ZmJmODQgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBANKDr+foJKIRpxoHCUwAKg1U2kT/CpiKmzH0CHliBt59qnUwMMHgXNqC
gp0DkDK0mzupAcW29aZOoLacDspIi2tcbgGMMFLBozZ6pUlLv1S/b4s3CcF+1I/c
Ra2XFMAFGTXB5SezJjvBkQxasPYJwI7HatoOgxbZisIqIbm3FMSwWoNQHQCpO2ec
VXXc3swwuOLOW0whZy4AHng7IaH5QEPiMcy3sP0J5D4vAfmHnu/t/UElSCco4pux
y2iX8Dj5xvirenzvLPkKELywLKFrvmpmjBGZZSVFRgB1/tGWIzr8dh3SxsgajZa8
WCTWIF4VeYOXo/d3A8pD3/D4ptSC10wbhG+vo4tt4ypH6wUMn4gQnFLVdIS4SURI
Mac6Tfs7clVaDLo94VzKCxSEknlLMt87IybXJDW+P/Fy3r8gsH+TgLxIFbCp8OSW
AsnZbzSf2ygYJRwYDPVBlBgGaNmyzym/sZoSA6xj5+D+Km9jNZ5JFVH//U38g8aU
qKZM/kuAxQIDAQABoz8wPTAdBgNVHQ4EFgQU5fYqfya+vrch9AZVq/HIQ4zTbOMw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
ADB/rJ1/EDfqpkjftwjDzqsuwN47ZDDa4kPS3tDvw6ipysABaHKRR+co++uoVfXS
/F63fy00uv0DOdzsxsXpYziOc/9wZJrIEkFSZpcEY1yc1xkxYTpHTx/a95YocXQQ
IsG5y5MccGG3lA4ETg8MgqUOOhR/Z13+IG+YubNHA5aGNv4fvw5nAQ/AFYyZxgCO
1vQ0qm6GDZyjltQ3gFcXBMX23BgjdQyRE9JyX9gfY4wZqHlsDCvlwdm4mDe2Ar+B
OIEhWf3nNW33KNfU8XHZXOWaDuPogqXyWK2fvsQsM2r8FW2aJc7Yw9suu32w0Cny
5gVmosiABGac3I8Jj6AYNr44ub31+emlspEwRfSx4d8V2xKhri9RoV5ukPLeJ85p
7b4OdxS221HiFyuTQJo1dacWlfCcxVNEen1kIjEeBv7gYVyOoXkD6JMUjTAthVlo
puet/Hi4GcLnKuRhgNxiWqsvvQLWCTDYq2xJw1KFE6/Yt8AQHGesh7yIKRuNMIcS
Fg==
-----END CERTIFICATE-----

```
