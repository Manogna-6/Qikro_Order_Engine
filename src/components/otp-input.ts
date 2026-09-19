export interface OtpInputOptions {
    onComplete: (otp: string) => void;
    onResend: () => void;
    disabled?: boolean;
}

export class OtpInputComponent {
    private container: HTMLElement;
    private options: OtpInputOptions;
    private inputs: HTMLInputElement[] = [];
    private resendTimer: number = 60;
    private timerInterval: number | null = null;
    private isResendDisabled: boolean = true;

    constructor(container: HTMLElement, options: OtpInputOptions) {
        this.container = container;
        this.options = options;
        this.render();
        this.startResendTimer();
    }

    public render(): void {
        this.container.innerHTML = `
      <div class="space-y-4" aria-label="OTP verification form">
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
          Enter 6-Digit Verification Code
        </label>
        
        <div class="flex items-center justify-center gap-2 sm:gap-3" id="otp-digit-container" role="group" aria-label="6-digit OTP fields">
          ${[0, 1, 2, 3, 4, 5].map(i => `
            <input
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="${i}"
              aria-label="Digit ${i + 1} of 6"
              class="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white border border-slate-200 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 transition-all outline-none"
              ${this.options.disabled ? 'disabled' : ''}
            />
          `).join('')}
        </div>

        <div class="flex items-center justify-between text-xs pt-2 text-slate-600">
          <span id="otp-timer-label" class="flex items-center gap-1 font-medium">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Resend available in: <strong id="resend-timer-val" class="text-indigo-600">${this.resendTimer}s</strong>
          </span>

          <button
            type="button"
            id="otp-resend-btn"
            class="text-indigo-600 hover:text-indigo-700 font-semibold disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
            disabled
          >
            Resend Code
          </button>
        </div>
      </div>
    `;

        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        this.inputs = Array.from(this.container.querySelectorAll('input[data-index]'));
        const resendBtn = this.container.querySelector('#otp-resend-btn') as HTMLButtonElement;

        if (resendBtn) {
            resendBtn.addEventListener('click', () => {
                if (!this.isResendDisabled) {
                    this.options.onResend();
                    this.resetTimer();
                }
            });
        }

        this.inputs.forEach((input, idx) => {
            // Auto-advance & backspace
            input.addEventListener('input', (e) => {
                const val = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
                (e.target as HTMLInputElement).value = val;

                if (val && idx < 5) {
                    this.inputs[idx + 1].focus();
                }

                this.checkCompletion();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    if (!input.value && idx > 0) {
                        this.inputs[idx - 1].focus();
                        this.inputs[idx - 1].value = '';
                    }
                } else if (e.key === 'ArrowLeft' && idx > 0) {
                    this.inputs[idx - 1].focus();
                } else if (e.key === 'ArrowRight' && idx < 5) {
                    this.inputs[idx + 1].focus();
                }
            });

            // Clipboard Paste Support
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = (e.clipboardData?.getData('text') || '').replace(/[^0-9]/g, '').slice(0, 6);
                if (pastedData) {
                    pastedData.split('').forEach((char, i) => {
                        if (this.inputs[i]) {
                            this.inputs[i].value = char;
                        }
                    });
                    if (pastedData.length === 6) {
                        this.inputs[5].focus();
                    } else if (this.inputs[pastedData.length]) {
                        this.inputs[pastedData.length].focus();
                    }
                    this.checkCompletion();
                }
            });
        });
    }

    private checkCompletion(): void {
        const code = this.inputs.map(i => i.value).join('');
        if (code.length === 6) {
            this.options.onComplete(code);
        }
    }

    public focusFirst(): void {
        if (this.inputs[0]) {
            this.inputs[0].focus();
        }
    }

    public clear(): void {
        this.inputs.forEach(i => i.value = '');
        this.focusFirst();
    }

    private startResendTimer(): void {
        this.resendTimer = 60;
        this.isResendDisabled = true;
        this.updateTimerUI();

        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = window.setInterval(() => {
            this.resendTimer -= 1;
            if (this.resendTimer <= 0) {
                if (this.timerInterval) clearInterval(this.timerInterval);
                this.isResendDisabled = false;
            }
            this.updateTimerUI();
        }, 1000);
    }

    private resetTimer(): void {
        this.startResendTimer();
    }

    private updateTimerUI(): void {
        const valEl = this.container.querySelector('#resend-timer-val');
        const btn = this.container.querySelector('#otp-resend-btn') as HTMLButtonElement;

        if (valEl) {
            valEl.textContent = `${this.resendTimer}s`;
        }

        if (btn) {
            btn.disabled = this.isResendDisabled;
        }
    }

    public destroy(): void {
        if (this.timerInterval) clearInterval(this.timerInterval);
    }
}
