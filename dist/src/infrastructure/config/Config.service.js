"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
class ConfigService {
    constructor() {
        this.envConfig = process.env;
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=Config.service.js.map