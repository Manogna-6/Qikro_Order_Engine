type RouteHandler = (params: Record<string, string>) => void;

interface RouteDefinition {
    path: string; // e.g. "orders", "orders/:id", "settlements", "login"
    regex: RegExp;
    paramNames: string[];
    handler: RouteHandler;
    requiresAuth: boolean;
}

class Router {
    private routes: RouteDefinition[] = [];
    private currentPath: string = '';

    constructor() {
        window.addEventListener('hashchange', () => this.handleHashChange());
    }

    public register(path: string, requiresAuth: boolean, handler: RouteHandler): void {
        const paramNames: string[] = [];
        const regexPath = path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        const regex = new RegExp(`^#?/${regexPath}$|^#?${regexPath}$`);

        this.routes.push({
            path,
            regex,
            paramNames,
            handler,
            requiresAuth
        });
    }

    public navigate(path: string): void {
        const cleanPath = path.startsWith('#') ? path : `#${path}`;
        if (window.location.hash !== cleanPath) {
            window.location.hash = cleanPath;
        } else {
            this.handleHashChange();
        }
    }

    public handleHashChange(): void {
        let hash = window.location.hash.slice(1);
        if (!hash || hash === '/' || hash === '') {
            hash = 'orders';
        }

        this.currentPath = hash;

        for (const route of this.routes) {
            const match = hash.match(route.regex);
            if (match) {
                const params: Record<string, string> = {};
                route.paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                route.handler(params);
                return;
            }
        }

        // Default fallback to orders or login
        this.navigate('orders');
    }

    public getCurrentPath(): string {
        return this.currentPath;
    }
}

export const router = new Router();
