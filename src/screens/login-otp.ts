import { api } from '../services/api-client';
import { router } from '../lib/router';
import { OtpInputComponent } from '../components/otp-input';
import { renderErrorBanner } from '../components/error-banner';

export class LoginOtpScreen {
  private container: HTMLElement;
  private currentStep: 'phone' | 'otp' = 'phone';
  private phone: string = '';
  private isLoading: boolean = false;
  private errorMessage: string | null = null;
  private mockOtpReceived: string | null = null;
  private otpInputInstance: OtpInputComponent | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(): void {
    this.container.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-2xl shadow-lg mb-4">
            ⚡
          </div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Qikro Order Platform
          </h1>
          <p class="text-xs text-slate-500 mt-1">
            Platform Authentication, Order Lifecycle & Settlement Engine
          </p>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10 relative overflow-hidden">
            
            ${this.errorMessage ? renderErrorBanner({
      title: 'Authentication Error',
      message: this.errorMessage,
      onDismiss: () => {
        this.errorMessage = null;
        this.render();
      }
    }) : ''}

            ${this.currentStep === 'phone' ? this.renderPhoneStep() : this.renderOtpStep()}

            <!-- Demo Quick Test Shortcuts -->
            <div class="mt-8 pt-6 border-t border-slate-100">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block text-center mb-3">
                Quick Test Accounts (Click to Fill)
              </span>
              <div class="space-y-2">
                <button
                  type="button"
                  data-demo-phone="+919876543210"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>🏪 Rajesh (Merchant - Gourmet Bistro)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919876543210</span>
                </button>

                <button
                  type="button"
                  data-demo-phone="+919999999999"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>🛡️ Aarav (Super Admin)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919999999999</span>
                </button>

                <button
                  type="button"
                  data-demo-phone="+919123456789"
                  class="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>👤 Priya (Customer)</span>
                  <span class="font-mono text-[11px] text-indigo-600">+919123456789</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private renderPhoneStep(): string {
    return `
      <form id="phone-form" class="space-y-5">
        <div>
          <label for="phone-input" class="block text-xs font-semibold text-slate-700 mb-2">
            Mobile Phone Number
          </label>
          <div class="relative rounded-lg shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-xs border-r border-slate-200 pr-2">
              🇮🇳 +91
            </div>
            <input
              type="tel"
              id="phone-input"
              value="${this.phone.replace('+91', '')}"
              placeholder="9876543210"
              required
              class="w-full pl-16 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all outline-none font-mono"
            />
          </div>
          <p class="text-[11px] text-slate-500 mt-1">
            Enter your 10-digit mobile number to receive a 6-digit verification code.
          </p>
        </div>

        <button
          type="submit"
          id="submit-phone-btn"
          ${this.isLoading ? 'disabled' : ''}
          class="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          ${this.isLoading ? `
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Sending OTP Code...
          ` : 'Send 6-Digit OTP Code'}
        </button>
      </form>
    `;
  }

  private renderOtpStep(): string {
    return `
      <div class="space-y-6">
        <div class="text-center">
          <span class="text-xs text-slate-500 font-medium block">Verification code sent to</span>
          <strong class="text-sm font-mono text-slate-900">${this.phone}</strong>
          <button type="button" id="change-phone-btn" class="text-xs text-indigo-600 hover:underline ms-2 font-semibold">
            Change Number
          </button>
        </div>

        <!-- MOCK Helper Callout Note for Demo Testers -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center animate-fade-in">
          <span class="text-xs font-semibold text-indigo-900 block">
            🔑 Mock OTP Code for Testing:
          </span>
          <code class="text-base font-bold text-indigo-700 font-mono tracking-widest block mt-0.5">
            ${this.mockOtpReceived || '123456'}
          </code>
        </div>

        <!-- OTP Input Component Mount Container -->
        <div id="otp-input-mount"></div>

        ${this.isLoading ? `
          <div class="text-center text-xs text-slate-500 flex items-center justify-center gap-2 py-2">
            <svg class="animate-spin h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Verifying code & establishing JWT session...
          </div>
        ` : ''}
      </div>
    `;
  }

  private attachEvents(): void {
    // Demo phone shortcut buttons
    const demoBtns = this.container.querySelectorAll('[data-demo-phone]');
    demoBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const phone = (e.currentTarget as HTMLElement).getAttribute('data-demo-phone') || '';
        this.phone = phone;
        this.requestOtpSubmit();
      });
    });

    if (this.currentStep === 'phone') {
      const form = this.container.querySelector('#phone-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = this.container.querySelector('#phone-input') as HTMLInputElement;
          if (input) {
            const rawVal = input.value.trim();
            this.phone = rawVal.startsWith('+91') ? rawVal : `+91${rawVal}`;
            this.requestOtpSubmit();
          }
        });
      }
    } else if (this.currentStep === 'otp') {
      const changePhoneBtn = this.container.querySelector('#change-phone-btn');
      if (changePhoneBtn) {
        changePhoneBtn.addEventListener('click', () => {
          this.currentStep = 'phone';
          this.errorMessage = null;
          this.render();
        });
      }

      // Mount OTP Input Component
      const mountEl = this.container.querySelector('#otp-input-mount') as HTMLElement;
      if (mountEl) {
        this.otpInputInstance = new OtpInputComponent(mountEl, {
          onComplete: (code: string) => this.verifyOtpSubmit(code),
          onResend: () => this.requestOtpSubmit(),
          disabled: this.isLoading
        });
        this.otpInputInstance.focusFirst();
      }
    }
  }

  private async requestOtpSubmit(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.render();

    try {
      const res = await api.auth.requestOtp(this.phone);
      this.mockOtpReceived = res.mockOtp || '123456';
      this.currentStep = 'otp';
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to request OTP code.';
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  private async verifyOtpSubmit(otpCode: string): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.render();

    try {
      await api.auth.verifyOtp(this.phone, otpCode);
      // Auth success -> redirect to order engine
      router.navigate('orders');
    } catch (err: any) {
      this.errorMessage = err.message || 'Verification failed.';
      this.isLoading = false;
      this.render();
    }
  }
}
