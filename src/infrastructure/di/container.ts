type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
    private static instance: Container;
    private dependencies: Map<string, any> = new Map();

    private constructor() {
    }

    static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    register<T>(token: string, instance: T): void {
        this.dependencies.set(token, instance);
    }

    registerClass<T>(token: string, classRef: Constructor<T>, ...deps: any[]): void {
        const instance = new classRef(...deps);
        this.register(token, instance);
    }

    get<T>(token: string): T {
        const dependency = this.dependencies.get(token);
        if (!dependency) {
            throw new Error(`Dependency ${token} not found in container`);
        }
        return dependency;
    }
}

export const container = Container.getInstance();
