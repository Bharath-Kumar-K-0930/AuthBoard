export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                galactic: {
                    dark: '#0B1220', // Background
                    card: '#111A2E', // Card / Panel
                    blue: '#38BDF8', // Primary Accent
                    secondary: '#22D3EE', // Secondary Accent
                    border: '#1E2A44', // Border
                    text: '#E5E7EB', // Text Primary
                    silver: '#94A3B8', // Text Muted
                    success: '#22C55E', // Success
                    error: '#EF4444', // Error
                }
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
