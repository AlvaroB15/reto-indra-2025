export enum AppointmentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export enum CountryISO {
    PERU = 'PE',
    CHILE = 'CL'
}

export interface AppointmentModel {
    id: string;
    insuredId: string;
    scheduleId: number;
    countryISO: CountryISO;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
}
