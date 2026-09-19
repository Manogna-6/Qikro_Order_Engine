import { sessionStore } from '../state/session.store';

export function checkAuthGuard(targetRoute: string): { allowed: boolean; redirect?: string } {
    const isAuth = sessionStore.isAuthenticated();
    const isLoginRoute = targetRoute === 'login' || targetRoute === '#login';

    if (!isAuth && !isLoginRoute) {
        return { allowed: false, redirect: 'login' };
    }

    if (isAuth && isLoginRoute) {
        return { allowed: false, redirect: 'orders' };
    }

    return { allowed: true };
}
