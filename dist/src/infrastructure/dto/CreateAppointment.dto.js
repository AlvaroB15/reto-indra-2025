"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const Appointment_model_1 = require("../../domain/models/Appointment.model");
const swagger_1 = require("@nestjs/swagger");
class CreateAppointmentDto {
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the insured (5 digits)',
        example: '00123'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 5),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "insuredId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the schedule',
        example: 100
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The country ISO code (PE or CL)',
        enum: Appointment_model_1.CountryISO,
        example: 'PE'
    }),
    (0, class_validator_1.IsEnum)(Appointment_model_1.CountryISO),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "countryISO", void 0);
//# sourceMappingURL=CreateAppointment.dto.js.map