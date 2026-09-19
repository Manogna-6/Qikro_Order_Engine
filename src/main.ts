import { router } from './lib/router';
import { checkAuthGuard } from './lib/route-guard';
import { sessionStore } from './state/session.store';
import { AppShellComponent } from './components/app-shell';
import { LoginOtpScreen } from './screens/login-otp';
import { OrderListScreen } from './screens/order-list';
import { OrderDetailScreen } from './screens/order-detail';
import { SettlementSummaryScreen } from './screens/settlement-summary';

class ApplicationBootstrap {
    private appContainer: HTMLElement;
    private shellComponent: AppShellComponent;

    constructor() {
        const root = document.getElementById('app');
        if (!root) {
            throw new Error('Root #app DOM container missing from index.html');
        }
        this.appContainer = root;
        this.shellComponent = new AppShellComponent(this.appContainer);

        this.initRoutes();
        this.initSessionListener();
    }

    private initRoutes(): void {
        // 1. Login Route (Outside App Shell)
        router.register('login', false, () => {
            const guard = checkAuthGuard('login');
            if (!guard.allowed && guard.redirect) {
                router.navigate(guard.redirect);
                return;
            }
            const loginScreen = new LoginOtpScreen(this.appContainer);
            loginScreen.render();
        });

        // 2. Orders List Route (Inside App Shell)
        router.register('orders', true, () => {
            const guard = checkAuthGuard('orders');
            if (!guard.allowed && guard.redirect) {
                router.navigate(guard.redirect);
                return;
            }

            // Render App Shell layout wrapper
            this.shellComponent.render('<div id="screen-mount"></div>');
            const mount = document.getElementById('screen-mount');
            if (mount) {
                const orderListScreen = new OrderListScreen(mount);
                orderListScreen.loadData();
            }
        });

        // 3. Order Detail Route (Inside App Shell)
        router.register('orders/:id', true, (params) => {
            const guard = checkAuthGuard('orders');
            if (!guard.allowed && guard.redirect) {
                router.navigate(guard.redirect);
                return;
            }

            const orderId = params.id;
            this.shellComponent.render('<div id="screen-mount"></div>');
            const mount = document.getElementById('screen-mount');
            if (mount) {
                const orderDetailScreen = new OrderDetailScreen(mount, orderId);
                orderDetailScreen.loadData();
            }
        });

        // 4. Settlement Summary Route (Inside App Shell)
        router.register('settlements', true, () => {
            const guard = checkAuthGuard('settlements');
            if (!guard.allowed && guard.redirect) {
                router.navigate(guard.redirect);
                return;
            }

            this.shellComponent.render('<div id="screen-mount"></div>');
            const mount = document.getElementById('screen-mount');
            if (mount) {
                const settlementScreen = new SettlementSummaryScreen(mount);
                settlementScreen.loadData();
            }
        });
    }

    private initSessionListener(): void {
        // Re-evaluate routes when session store changes (login/logout)
        sessionStore.subscribe(() => {
            const currentHash = window.location.hash.slice(1) || 'orders';
            const guard = checkAuthGuard(currentHash);
            if (!guard.allowed && guard.redirect) {
                router.navigate(guard.redirect);
            }
        });
    }

    public start(): void {
        router.handleHashChange();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new ApplicationBootstrap();
    app.start();
});
