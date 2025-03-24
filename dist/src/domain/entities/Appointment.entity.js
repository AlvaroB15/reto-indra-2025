"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.CountryISO = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["FAILED"] = "failed";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var CountryISO;
(function (CountryISO) {
    CountryISO["PERU"] = "PE";
    CountryISO["CHILE"] = "CL";
})(CountryISO || (exports.CountryISO = CountryISO = {}));
class Appointment {
    constructor(params) {
        this.id = params.id;
        this.insuredId = params.insuredId;
        this.scheduleId = params.scheduleId;
        this.countryISO = params.countryISO;
        this.status = params.status || AppointmentStatus.PENDING;
        this.createdAt = params.createdAt || new Date();
        this.updatedAt = params.updatedAt || new Date();
        this.scheduleDetails = params.scheduleDetails;
    }
    complete() {
        this.status = AppointmentStatus.COMPLETED;
        this.updatedAt = new Date();
    }
    fail() {
        this.status = AppointmentStatus.FAILED;
        this.updatedAt = new Date();
    }
    isPeru() {
        return this.countryISO === CountryISO.PERU;
    }
    isChile() {
        return this.countryISO === CountryISO.CHILE;
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=Appointment.entity.js.map