"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationHandler = exports.appointmentCl = exports.appointmentPe = exports.getAppointments = exports.createAppointment = void 0;
var create_appointment_1 = require("./create-appointment");
Object.defineProperty(exports, "createAppointment", { enumerable: true, get: function () { return __importDefault(create_appointment_1).default; } });
var get_appointments_1 = require("./get-appointments");
Object.defineProperty(exports, "getAppointments", { enumerable: true, get: function () { return __importDefault(get_appointments_1).default; } });
var appointment_pe_1 = require("./appointment-pe");
Object.defineProperty(exports, "appointmentPe", { enumerable: true, get: function () { return __importDefault(appointment_pe_1).default; } });
var appointment_cl_1 = require("./appointment-cl");
Object.defineProperty(exports, "appointmentCl", { enumerable: true, get: function () { return __importDefault(appointment_cl_1).default; } });
var confirmation_1 = require("./confirmation");
Object.defineProperty(exports, "confirmationHandler", { enumerable: true, get: function () { return __importDefault(confirmation_1).default; } });
//# sourceMappingURL=index.js.map