export interface EmptyStateOptions {
    title: string;
    description: string;
    iconSvg?: string;
    actionText?: string;
    actionHandler?: () => void;
}

export function renderEmptyState(options: EmptyStateOptions): string {
    const defaultIcon = `
    <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
    </svg>
  `;

    return `
    <div class="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-sm my-8">
      ${options.iconSvg || defaultIcon}
      <h3 class="text-base font-semibold text-slate-900 mb-1">
        ${options.title}
      </h3>
      <p class="text-xs text-slate-500 mb-6">
        ${options.description}
      </p>
      ${options.actionText ? `
        <button
          type="button"
          data-action="empty-state-btn"
          class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500"
        >
          ${options.actionText}
        </button>
      ` : ''}
    </div>
  `;
}
