/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                },
                neutral: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    400: '#94a3b8',
                    600: '#475569',
                    900: '#0f172a',
                },
                // Semantic Order Status Colors
                status: {
                    placed: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
                    accepted: { bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' },
                    packing: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
                    dispatched: { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
                    delivered: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
                    cancelled: { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
                    failed: { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' },
                    returned: { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff' },
                },
                // Settlement Colors
                settlement: {
                    positive: '#16a34a',
                    pending: '#d97706',
                    commission: '#64748b',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            borderRadius: {
                'xl': '12px',
                'lg': '8px',
            }
        },
    },
    plugins: [],
}
