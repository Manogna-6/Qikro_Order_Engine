import { User } from '../models';
import { sessionStore } from '../state/session.store';
import { api } from '../services/api-client';
import { router } from '../lib/router';

export class AppShellComponent {
  private container: HTMLElement;
  private currentUser: User | null = null;
  private isMobileMenuOpen: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.currentUser = sessionStore.getCurrentUser();
  }

  public updateState(_path: string): void {
    this.currentUser = sessionStore.getCurrentUser();
    this.renderHeader();
  }

  public render(contentHtml: string): void {
    this.currentUser = sessionStore.getCurrentUser();

    this.container.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col">
        <!-- Persistent Navigation Header -->
        <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <!-- Left: Brand Logo & Title -->
            <div class="flex items-center gap-6">
              <a href="#orders" class="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
                <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  ⚡
                </div>
                <div>
                  <span class="font-bold text-slate-900 text-base tracking-tight block">Qikro Engine</span>
                  <span class="text-[10px] text-indigo-600 font-mono font-semibold uppercase tracking-wider block -mt-1">Core Platform</span>
                </div>
              </a>

              <!-- Desktop Navigation Links -->
              <nav class="hidden md:flex items-center gap-1 ms-4" aria-label="Main Navigation">
                <a
                  href="#orders"
                  class="px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${this.isOrdersActive()
        ? 'bg-indigo-50 text-indigo-700 font-bold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }"
                  ${this.isOrdersActive() ? 'aria-current="page"' : ''}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z"/></svg>
                  Orders Engine
                </a>

                <a
                  href="#settlements"
                  class="px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${this.isSettlementsActive()
        ? 'bg-indigo-50 text-indigo-700 font-bold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }"
                  ${this.isSettlementsActive() ? 'aria-current="page"' : ''}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  Settlements & Payouts
                </a>
              </nav>
            </div>

            <!-- Right: Role Badge & User Profile & Logout -->
            <div class="hidden md:flex items-center gap-4">
              <!-- Role Badge -->
              <span class="px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${this.currentUser?.role === 'admin'
        ? 'bg-purple-100 text-purple-800 border border-purple-200'
        : this.currentUser?.role === 'business_owner'
          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
      }">
                ${this.currentUser?.role === 'admin' ? '🛡️ Admin' : this.currentUser?.role === 'business_owner' ? '🏪 Merchant' : '👤 Customer'}
              </span>

              <!-- User Details -->
              <div class="flex items-center gap-2.5 border-s border-slate-200 ps-4">
                <img
                  src="${this.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}"
                  alt="${this.currentUser?.name || 'User'}"
                  class="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div class="text-start">
                  <span class="text-xs font-semibold text-slate-900 block leading-tight">
                    ${this.currentUser?.name || 'Authorized User'}
                  </span>
                  <span class="text-[10px] text-slate-500 font-mono block">
                    ${this.currentUser?.phone || ''}
                  </span>
                </div>
              </div>

              <!-- Single Logout Point -->
              <button
                type="button"
                id="app-shell-logout-btn"
                class="ms-2 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors focus:ring-2 focus:ring-rose-500 focus:outline-none"
                aria-label="Logout of session"
              >
                Logout
              </button>
            </div>

            <!-- Mobile Hamburger Toggle -->
            <div class="md:hidden flex items-center gap-2">
              <button
                type="button"
                id="mobile-menu-toggle"
                class="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle navigation menu"
                aria-expanded="${this.isMobileMenuOpen}"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${this.isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Dropdown Navigation Menu -->
          ${this.isMobileMenuOpen ? `
            <div class="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-4 space-y-3">
              <nav class="flex flex-col gap-1">
                <a
                  href="#orders"
                  class="px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${this.isOrdersActive() ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
        }"
                >
                  Orders Engine
                </a>
                <a
                  href="#settlements"
                  class="px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${this.isSettlementsActive() ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
        }"
                >
                  Settlements & Payouts
                </a>
              </nav>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    src="${this.currentUser?.avatarUrl || ''}"
                    alt=""
                    class="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span class="text-xs font-semibold text-slate-900 block">${this.currentUser?.name}</span>
                    <span class="text-[10px] text-slate-500 font-mono">${this.currentUser?.phone}</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="mobile-logout-btn"
                  class="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ` : ''}
        </header>

        <!-- Main Content Body -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="app-main-content">
          ${contentHtml}
        </main>
      </div>
    `;

    this.attachEvents();
  }

  private isOrdersActive(): boolean {
    const hash = window.location.hash;
    return hash === '' || hash === '#' || hash.startsWith('#orders');
  }

  private isSettlementsActive(): boolean {
    return window.location.hash.startsWith('#settlements');
  }

  private renderHeader(): void {
    const mainEl = this.container.querySelector('#app-main-content');
    if (mainEl) {
      const content = mainEl.innerHTML;
      this.render(content);
    }
  }

  private attachEvents(): void {
    const logoutBtn = this.container.querySelector('#app-shell-logout-btn');
    const mobileLogoutBtn = this.container.querySelector('#mobile-logout-btn');
    const toggleBtn = this.container.querySelector('#mobile-menu-toggle');

    const handleLogout = async () => {
      await api.auth.logout();
      router.navigate('login');
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const mainEl = this.container.querySelector('#app-main-content');
        if (mainEl) {
          this.render(mainEl.innerHTML);
        }
      });
    }
  }
}
