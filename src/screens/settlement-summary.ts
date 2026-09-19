import { Business } from '../models';
import { api } from '../services/api-client';
import { BusinessSettlementSummary, formatCurrency, roundCurrency } from '../lib/settlement-calculator';
import { renderSettlementCard } from '../components/settlement-card';
import { renderSettlementSkeleton } from '../components/loading-skeleton';
import { renderErrorBanner } from '../components/error-banner';
import { renderEmptyState } from '../components/empty-state';
import { sessionStore } from '../state/session.store';

export class SettlementSummaryScreen {
    private container: HTMLElement;
    private summaries: BusinessSettlementSummary[] = [];
    private businesses: Business[] = [];
    private selectedBusinessId: string = 'all';
    private expandedMap: Map<string, boolean> = new Map();
    private isLoading: boolean = true;
    private errorMessage: string | null = null;
    private successMessage: string | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public async loadData(): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        this.render();

        try {
            const currentUser = sessionStore.getCurrentUser();

            this.businesses = await api.orders.getAllBusinesses();

            const businessFilter = currentUser?.role === 'business_owner'
                ? currentUser.businessId
                : this.selectedBusinessId !== 'all' ? this.selectedBusinessId : undefined;

            this.summaries = await api.orders.getSettlementSummary(businessFilter);
        } catch (err: any) {
            this.errorMessage = err.message || 'Failed to fetch settlement calculation summaries.';
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    public render(): void {
        if (this.isLoading) {
            this.container.innerHTML = renderSettlementSkeleton();
            return;
        }

        const currentUser = sessionStore.getCurrentUser();
        const isAdmin = currentUser?.role === 'admin';

        // Calculate Platform Aggregate Metrics across displayed summaries
        const aggGross = roundCurrency(this.summaries.reduce((sum, s) => sum + s.grossRevenue, 0));
        const aggCommission = roundCurrency(this.summaries.reduce((sum, s) => sum + s.totalCommissionCut, 0));
        const aggNetPayout = roundCurrency(this.summaries.reduce((sum, s) => sum + s.totalNetPayout, 0));
        const aggPending = roundCurrency(this.summaries.reduce((sum, s) => sum + s.pendingPayout, 0));
        const aggSettled = roundCurrency(this.summaries.reduce((sum, s) => sum + s.settledPayout, 0));

        this.container.innerHTML = `
      <div class="space-y-6 max-w-6xl mx-auto">
        <!-- Page Title & Role Selector Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">
              Settlements & Commission Engine
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              ${isAdmin ? 'Platform-wide settlement calculation and payout disbursement engine.' : 'Merchant financial settlements, platform fees, and pending payout ledger.'}
            </p>
          </div>

          ${isAdmin ? `
            <div class="flex items-center gap-2">
              <label for="business-select-filter" class="text-xs font-semibold text-slate-600">Filter Business:</label>
              <select
                id="business-select-filter"
                class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="all" ${this.selectedBusinessId === 'all' ? 'selected' : ''}>All Merchant Businesses (${this.businesses.length})</option>
                ${this.businesses.map(b => `
                  <option value="${b.id}" ${this.selectedBusinessId === b.id ? 'selected' : ''}>
                    ${b.name} (${Math.round(b.commissionRate * 100)}% Fee)
                  </option>
                `).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <!-- Success Toast Notification -->
        ${this.successMessage ? `
          <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in shadow-xs">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              ${this.successMessage}
            </span>
            <button type="button" id="dismiss-success-btn" class="text-emerald-600 hover:text-emerald-900">✕</button>
          </div>
        ` : ''}

        <!-- Error Notification -->
        ${this.errorMessage ? renderErrorBanner({
            title: 'Settlement Service Error',
            message: this.errorMessage,
            onRetry: () => this.loadData()
        }) : ''}

        <!-- Aggregate Financial Ledger Card -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-6 shadow-md">
          <div class="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
            <div>
              <span class="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-semibold block">
                Platform Aggregate Financial Ledger
              </span>
              <h2 class="text-lg font-bold text-white mt-0.5">
                ${isAdmin ? 'Combined Financial Overview' : 'Business Financial Statement'}
              </h2>
            </div>
            <span class="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
              ISO 4217 INR (₹)
            </span>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <span class="text-xs text-slate-400 block mb-1">Gross Sales Revenue</span>
              <span class="text-2xl font-bold font-mono text-white">${formatCurrency(aggGross)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">Excludes delivery logistics</span>
            </div>

            <div>
              <span class="text-xs text-slate-400 block mb-1">Platform Commission Retained</span>
              <span class="text-2xl font-bold font-mono text-slate-300">-${formatCurrency(aggCommission)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">Platform service fees</span>
            </div>

            <div>
              <span class="text-xs text-indigo-300 block mb-1">Net Merchant Earnings</span>
              <span class="text-2xl font-bold font-mono text-emerald-400">${formatCurrency(aggNetPayout)}</span>
              <span class="text-[10px] text-emerald-300/80 block mt-1">Net payable amount</span>
            </div>

            <div>
              <span class="text-xs text-amber-300 block mb-1">Pending Payout Release</span>
              <span class="text-2xl font-bold font-mono text-amber-400">${formatCurrency(aggPending)}</span>
              <span class="text-[10px] text-slate-400 block mt-1">
                Settled: <strong class="text-slate-200 font-mono">${formatCurrency(aggSettled)}</strong>
              </span>
            </div>
          </div>
        </div>

        <!-- Per-Business Settlement Summaries List -->
        ${this.summaries.length === 0 ? renderEmptyState({
            title: 'No Settlement Records Found',
            description: 'No active business orders or settlements match the current filter selection.'
        }) : `
          <div class="space-y-6">
            ${this.summaries.map(s => renderSettlementCard(s, !!this.expandedMap.get(s.businessId))).join('')}
          </div>
        `}
      </div>
    `;

        this.attachEvents();
    }

    private attachEvents(): void {
        // Admin business filter dropdown
        const select = this.container.querySelector('#business-select-filter') as HTMLSelectElement;
        if (select) {
            select.addEventListener('change', (e) => {
                this.selectedBusinessId = (e.target as HTMLSelectElement).value;
                this.loadData();
            });
        }

        // Dismiss success toast
        const dismissSuccess = this.container.querySelector('#dismiss-success-btn');
        if (dismissSuccess) {
            dismissSuccess.addEventListener('click', () => {
                this.successMessage = null;
                this.render();
            });
        }

        // Toggle expandable itemized order breakdown table
        const toggleBtns = this.container.querySelectorAll('[data-action="toggle-breakdown"]');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bId = (e.currentTarget as HTMLElement).getAttribute('data-business-id');
                if (bId) {
                    const current = !!this.expandedMap.get(bId);
                    this.expandedMap.set(bId, !current);
                    this.render();
                }
            });
        });

        // Mark Settled Action Button
        const markSettledBtns = this.container.querySelectorAll('[data-action="mark-settled"]');
        markSettledBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const bId = (e.currentTarget as HTMLElement).getAttribute('data-business-id');
                if (bId) {
                    await this.executeMarkSettled(bId);
                }
            });
        });
    }

    private async executeMarkSettled(businessId: string): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        this.render();

        try {
            const res = await api.orders.markSettled(businessId);
            this.successMessage = `Successfully settled ${res.settledCount} orders releasing ${formatCurrency(res.totalAmountSettled)} to business payout account.`;
            await this.loadData();
        } catch (err: any) {
            this.errorMessage = err.message || 'Failed to process payout settlement release.';
            this.isLoading = false;
            this.render();
        }
    }
}
