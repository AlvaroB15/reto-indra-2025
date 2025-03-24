export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        this.envConfig = process.env;
    }

    get<T = string>(key: string): T {
        return this.envConfig[key] as unknown as T;
    }
}
