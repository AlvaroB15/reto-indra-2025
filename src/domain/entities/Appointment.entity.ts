export enum AppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

export enum CountryISO {
    PERU = 'PE',
    CHILE = 'CL'
}

export interface AppointmentSchedule {
    scheduleId: number;
    centerId?: number;
    specialtyId?: number;
    medicId?: number;
    date?: string;
}

export class Appointment {
    id: string;
    insuredId: string;
    scheduleId: number;
    countryISO: CountryISO;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
    scheduleDetails?: AppointmentSchedule;

    constructor(params: {
        id: string;
        insuredId: string;
        scheduleId: number;
        countryISO: CountryISO;
        status?: AppointmentStatus;
        createdAt?: Date;
        updatedAt?: Date;
        scheduleDetails?: AppointmentSchedule;
    }) {
        this.id = params.id;
        this.insuredId = params.insuredId;
        this.scheduleId = params.scheduleId;
        this.countryISO = params.countryISO;
        this.status = params.status || AppointmentStatus.PENDING;
        this.createdAt = params.createdAt || new Date();
        this.updatedAt = params.updatedAt || new Date();
        this.scheduleDetails = params.scheduleDetails;
    }
}
