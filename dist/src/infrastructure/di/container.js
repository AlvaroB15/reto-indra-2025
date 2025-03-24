"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.Container = void 0;
class Container {
    constructor() {
        this.dependencies = new Map();
    }
    static getInstance() {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
    register(token, instance) {
        this.dependencies.set(token, instance);
    }
    registerClass(token, classRef, ...deps) {
        const instance = new classRef(...deps);
        this.register(token, instance);
    }
    get(token) {
        const dependency = this.dependencies.get(token);
        if (!dependency) {
            throw new Error(`Dependency ${token} not found in container`);
        }
        return dependency;
    }
}
exports.Container = Container;
exports.container = Container.getInstance();
//# sourceMappingURL=container.js.map