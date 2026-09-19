import { User } from '../models';

export interface SessionState {
    isAuthenticated: boolean;
    currentUser: User | null;
    token: string | null;
    expiresAt: string | null;
}

type SessionChangeListener = (state: SessionState) => void;

/**
 * In-Memory Session Store
 * 
 * SECURITY DESIGN DECISION:
 * // MOCK / SECURITY NOTE: Using in-memory session storage instead of localStorage/sessionStorage.
 * // Storing authorization tokens or JWTs in localStorage exposes the application to XSS token theft.
 * // If any third-party script or XSS payload executes, localStorage tokens can be easily stolen via `localStorage.getItem()`.
 * // In-memory JS variables keep session tokens scoped strictly inside module execution memory.
 */
class SessionStore {
    private state: SessionState = {
        isAuthenticated: false,
        currentUser: null,
        token: null,
        expiresAt: null
    };

    private listeners: Set<SessionChangeListener> = new Set();

    public getSession(): SessionState {
        return { ...this.state };
    }

    public getCurrentUser(): User | null {
        return this.state.currentUser;
    }

    public getToken(): string | null {
        return this.state.token;
    }

    public isAuthenticated(): boolean {
        if (!this.state.isAuthenticated || !this.state.token || !this.state.expiresAt) {
            return false;
        }
        // Check token expiration
        const now = new Date().getTime();
        const expiry = new Date(this.state.expiresAt).getTime();
        if (now >= expiry) {
            this.clearSession();
            return false;
        }
        return true;
    }

    public setSession(user: User, token: string, expiresAt: string): void {
        this.state = {
            isAuthenticated: true,
            currentUser: user,
            token,
            expiresAt
        };
        this.notifyListeners();
    }

    public clearSession(): void {
        this.state = {
            isAuthenticated: false,
            currentUser: null,
            token: null,
            expiresAt: null
        };
        this.notifyListeners();
    }

    public subscribe(listener: SessionChangeListener): () => void {
        this.listeners.add(listener);
        // Immediately fire listener with initial state
        listener(this.getSession());
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners(): void {
        const currentState = this.getSession();
        this.listeners.forEach(listener => {
            try {
                listener(currentState);
            } catch (err) {
                console.error('Error in session store listener:', err);
            }
        });
    }
}

export const sessionStore = new SessionStore();
