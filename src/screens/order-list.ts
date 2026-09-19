import { Order, OrderStatus } from '../models';
import { api } from '../services/api-client';
import { renderOrderCard } from '../components/order-card';
import { renderOrderListSkeleton } from '../components/loading-skeleton';
import { renderEmptyState } from '../components/empty-state';
import { renderErrorBanner } from '../components/error-banner';
import { sessionStore } from '../state/session.store';

export class OrderListScreen {
    private container: HTMLElement;
    private orders: Order[] = [];
    private isLoading: boolean = true;
    private errorMessage: string | null = null;
    private selectedStatus: OrderStatus | 'all' | 'exception' = 'all';
    private searchQuery: string = '';

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public async loadData(): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        this.render();

        try {
            const currentUser = sessionStore.getCurrentUser();
            const businessFilter = currentUser?.role === 'business_owner' ? currentUser.businessId : undefined;

            const filterStatus = this.selectedStatus === 'exception' ? undefined : this.selectedStatus;

            const result = await api.orders.getOrders({
                page: 1,
                limit: 50,
                statusFilter: filterStatus as OrderStatus | 'all',
                search: this.searchQuery,
                businessFilter
            });

            let items = result.items;

            // Handle custom exception filter aggregation
            if (this.selectedStatus === 'exception') {
                items = items.filter(o => ['cancelled', 'failed', 'returned'].includes(o.status));
            }

            this.orders = items;
        } catch (err: any) {
            this.errorMessage = err.message || 'Failed to fetch order list.';
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    public render(): void {
        const currentUser = sessionStore.getCurrentUser();

        this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-slate-900 tracking-tight">
              Order Lifecycle Engine
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              ${currentUser?.role === 'business_owner' ? 'Managing orders for your registered business.' : 'Real-time monitoring across all system order state transitions.'}
            </p>
          </div>

          <button
            type="button"
            id="refresh-orders-btn"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh Feed
          </button>
        </div>

        <!-- Filter & Search Toolbar Bar -->
        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
          <!-- Status Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Order status filters">
            ${this.renderFilterPill('all', 'All Orders')}
            ${this.renderFilterPill('placed', 'Placed')}
            ${this.renderFilterPill('accepted', 'Accepted')}
            ${this.renderFilterPill('packing', 'Packing')}
            ${this.renderFilterPill('dispatched', 'Dispatched')}
            ${this.renderFilterPill('delivered', 'Delivered')}
            ${this.renderFilterPill('exception', '⚠️ Exception States')}
          </div>

          <!-- Search Bar -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <input
              type="search"
              id="order-search-input"
              value="${this.searchQuery}"
              placeholder="Search by Order ID (e.g. #ORD-1001), Customer Name, or Phone Number..."
              class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all outline-none"
            />
          </div>
        </div>

        <!-- Error State Announcement -->
        ${this.errorMessage ? renderErrorBanner({
            title: 'Order Feed Error',
            message: this.errorMessage,
            onRetry: () => this.loadData()
        }) : ''}

        <!-- Loaded Content vs Loading Skeleton vs Empty State -->
        ${this.isLoading ? renderOrderListSkeleton(6) : this.renderOrderGrid()}
      </div>
    `;

        this.attachEvents();
    }

    private renderFilterPill(status: OrderStatus | 'all' | 'exception', label: string): string {
        const isSelected = this.selectedStatus === status;
        return `
      <button
        type="button"
        data-filter-status="${status}"
        role="tab"
        aria-selected="${isSelected}"
        class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${isSelected
                ? status === 'exception'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }"
      >
        ${label}
      </button>
    `;
    }

    private renderOrderGrid(): string {
        if (this.orders.length === 0) {
            return renderEmptyState({
                title: 'No Orders Found',
                description: this.searchQuery
                    ? `No order records matched your query "${this.searchQuery}". Try clearing filters.`
                    : `There are currently no orders in status '${this.selectedStatus}'.`,
                actionText: 'Reset Search Filters',
                actionHandler: () => {
                    this.selectedStatus = 'all';
                    this.searchQuery = '';
                    this.loadData();
                }
            });
        }

        return `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${this.orders.map(order => renderOrderCard(order)).join('')}
      </div>
    `;
    }

    private attachEvents(): void {
        // Filter pill buttons
        const filterBtns = this.container.querySelectorAll('[data-filter-status]');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = (e.currentTarget as HTMLElement).getAttribute('data-filter-status') as any;
                this.selectedStatus = status;
                this.loadData();
            });
        });

        // Refresh feed button
        const refreshBtn = this.container.querySelector('#refresh-orders-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadData());
        }

        // Search input with debounce
        const searchInput = this.container.querySelector('#order-search-input') as HTMLInputElement;
        if (searchInput) {
            let timeout: any;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                this.searchQuery = (e.target as HTMLInputElement).value;
                timeout = setTimeout(() => this.loadData(), 300);
            });
        }

        // Empty state action button
        const emptyBtn = this.container.querySelector('[data-action="empty-state-btn"]');
        if (emptyBtn) {
            emptyBtn.addEventListener('click', () => {
                this.selectedStatus = 'all';
                this.searchQuery = '';
                this.loadData();
            });
        }
    }
}
