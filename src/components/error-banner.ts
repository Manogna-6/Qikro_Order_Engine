export interface ErrorBannerOptions {
    title?: string;
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
}

export function renderErrorBanner(options: ErrorBannerOptions): string {
    return `
    <div 
      role="alert" 
      aria-live="assertive"
      class="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 shadow-sm flex items-start justify-between gap-4 animate-fade-in"
    >
      <div class="flex items-start gap-3">
        <div class="text-rose-600 shrink-0 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-rose-800">
            ${options.title || 'Action Failed'}
          </h4>
          <p class="text-xs text-rose-700 mt-0.5">
            ${options.message}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        ${options.onRetry ? `
          <button
            type="button"
            data-action="error-retry-btn"
            class="px-3 py-1.5 text-xs font-semibold text-rose-800 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors focus:ring-2 focus:ring-rose-500"
          >
            Retry
          </button>
        ` : ''}

        ${options.onDismiss ? `
          <button
            type="button"
            data-action="error-dismiss-btn"
            class="text-rose-500 hover:text-rose-700 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Dismiss error"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;
}
