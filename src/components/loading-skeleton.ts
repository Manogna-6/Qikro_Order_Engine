export function renderOrderListSkeleton(count: number = 6): string {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading orders">
      ${Array.from({ length: count }).map(() => `
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 animate-pulse-subtle">
          <div class="flex items-center justify-between">
            <div class="h-4 w-24 bg-slate-200 rounded"></div>
            <div class="h-5 w-20 bg-slate-200 rounded-full"></div>
          </div>
          <div class="space-y-2">
            <div class="h-5 w-3/4 bg-slate-200 rounded"></div>
            <div class="h-3 w-1/2 bg-slate-150 bg-slate-200 rounded"></div>
          </div>
          <div class="h-16 bg-slate-100 rounded-lg"></div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div class="h-6 w-20 bg-slate-200 rounded"></div>
            <div class="h-8 w-24 bg-indigo-100 rounded-lg"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderOrderDetailSkeleton(): string {
    return `
    <div class="space-y-6 animate-pulse-subtle max-w-5xl mx-auto">
      <div class="h-6 w-48 bg-slate-200 rounded"></div>
      <div class="h-32 bg-white border border-slate-200 rounded-xl p-6"></div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="h-64 bg-white border border-slate-200 rounded-xl p-6"></div>
        </div>
        <div class="space-y-6">
          <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
          <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderSettlementSkeleton(): string {
    return `
    <div class="space-y-6 animate-pulse-subtle max-w-5xl mx-auto">
      <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
      <div class="h-48 bg-white border border-slate-200 rounded-xl p-6"></div>
    </div>
  `;
}
