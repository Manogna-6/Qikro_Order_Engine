import { Order, OrderStatus } from '../models';
import { getHappyPathSequence, getStatusMeta } from '../lib/order-state-machine';

export function renderStatusStepper(order: Order): string {
  const currentStatus = order.status;
  const isException = ['cancelled', 'failed', 'returned'].includes(currentStatus);
  const happySequence = getHappyPathSequence();
  const currentMeta = getStatusMeta(currentStatus);

  // Map history timestamps by status
  const historyMap = new Map<OrderStatus, string>();
  order.statusHistory.forEach(h => historyMap.set(h.status, h.timestamp));

  if (isException) {
    // Render Exception Stepper View
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h3 class="font-semibold text-slate-900 text-base">Order Progress Timeline</h3>
            <p class="text-xs text-slate-500">Tracking lifecycle for order #${order.id}</p>
          </div>
          <span class="px-3 py-1 text-xs font-semibold rounded-full border ${currentMeta.badgeStyle}">
            ${currentMeta.label}
          </span>
        </div>

        <div class="space-y-6">
          <!-- Prior happy path history items before exception -->
          <ol class="relative border-s border-slate-200 ms-3 space-y-6">
            ${order.statusHistory.map((history, idx) => {
      const meta = getStatusMeta(history.status);
      const isLast = idx === order.statusHistory.length - 1;
      const isExceptionStep = ['cancelled', 'failed', 'returned'].includes(history.status);

      const formattedDate = new Date(history.timestamp).toLocaleString('en-IN', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      return `
                <li class="ms-6">
                  <span class="absolute -start-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white ${isExceptionStep
          ? meta.bgClass + ' ' + meta.textClass + ' border ' + meta.borderClass
          : 'bg-indigo-600 text-white'
        }">
                    ${isExceptionStep ? `
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    ` : `
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                      </svg>
                    `}
                  </span>
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 class="font-semibold text-slate-900 ${isLast ? meta.textClass : ''}">
                      ${meta.label}
                    </h4>
                    <time class="text-xs text-slate-400 font-mono">${formattedDate}</time>
                  </div>
                  <p class="text-xs text-slate-600 mt-1">${history.note || meta.description}</p>
                </li>
              `;
    }).join('')}
          </ol>

          <!-- Exception State Callout Banner -->
          <div class="p-4 rounded-lg border ${currentMeta.bgClass} ${currentMeta.borderClass} flex items-start gap-3 mt-4">
            <div class="${currentMeta.textClass} shrink-0 mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-sm ${currentMeta.textClass}">
                Order ${currentMeta.label}
              </h4>
              <p class="text-xs text-slate-700 mt-0.5">
                ${currentMeta.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Standard Happy Path Stepper View
  const activeIndex = happySequence.indexOf(currentStatus as OrderStatus);

  return `
    <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 class="font-semibold text-slate-900 text-base">Order Progress</h3>
          <p class="text-xs text-slate-500">Live order state machine tracking</p>
        </div>
        <span class="px-3 py-1 text-xs font-semibold rounded-full border ${currentMeta.badgeStyle}">
          ${currentMeta.label}
        </span>
      </div>

      <!-- Desktop Stepper (Horizontal) -->
      <div class="hidden md:block">
        <ol class="grid grid-cols-5 gap-2 relative">
          ${happySequence.map((step, idx) => {
    const isCompleted = idx < activeIndex;
    const isActive = idx === activeIndex;
    const meta = getStatusMeta(step);
    const timestamp = historyMap.get(step);
    const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';

    return `
              <li class="flex flex-col items-center text-center relative group">
                <!-- Line connector -->
                ${idx < 4 ? `
                  <div class="absolute top-4 left-1/2 right-0 w-full h-0.5 -z-0 ${idx < activeIndex ? 'bg-indigo-600' : 'bg-slate-200'
        }"></div>
                ` : ''}

                <!-- Step Circle Node -->
                <div class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all ${isCompleted
        ? 'bg-indigo-600 text-white shadow'
        : isActive
          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md'
          : 'bg-slate-100 text-slate-400 border border-slate-200'
      }">
                  ${isCompleted ? `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  ` : `
                    <span class="text-xs font-bold">${idx + 1}</span>
                  `}
                </div>

                <!-- Step Label & Time -->
                <div class="mt-3">
                  <p class="text-xs font-semibold ${isActive ? 'text-indigo-600 font-bold' : isCompleted ? 'text-slate-900' : 'text-slate-400'
      }">
                    ${meta.label}
                  </p>
                  ${formattedTime ? `
                    <span class="text-[10px] text-slate-400 font-mono block mt-0.5">${formattedTime}</span>
                  ` : `
                    <span class="text-[10px] text-slate-300 block mt-0.5">Pending</span>
                  `}
                </div>
              </li>
            `;
  }).join('')}
        </ol>
      </div>

      <!-- Mobile Timeline Stepper (Vertical) -->
      <div class="block md:hidden">
        <ol class="relative border-s border-indigo-200 ms-3 space-y-6">
          ${happySequence.map((step, idx) => {
    const isCompleted = idx < activeIndex;
    const isActive = idx === activeIndex;
    const meta = getStatusMeta(step);
    const timestamp = historyMap.get(step);
    const formattedTime = timestamp ? new Date(timestamp).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

    return `
              <li class="ms-6">
                <span class="absolute -start-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white ${isCompleted
        ? 'bg-indigo-600 text-white'
        : isActive
          ? 'bg-indigo-600 text-white ring-indigo-100 ring-4'
          : 'bg-slate-100 text-slate-400 border border-slate-200'
      }">
                  ${isCompleted ? `
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  ` : `
                    <span class="text-[10px] font-bold">${idx + 1}</span>
                  `}
                </span>
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-xs ${isActive ? 'text-indigo-600 font-bold' : isCompleted ? 'text-slate-900' : 'text-slate-400'}">
                    ${meta.label}
                  </h4>
                  <time class="text-[10px] text-slate-400 font-mono">${formattedTime || 'Pending'}</time>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5">${meta.description}</p>
              </li>
            `;
  }).join('')}
        </ol>
      </div>
    </div>
  `;
}
