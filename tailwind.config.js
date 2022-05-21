module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    daisyui: {
        themes: [
            {
                partsInc: {
                    primary: '#e52727',
                    secondary: '#f6d860',
                    accent: '#37cdbe',
                    neutral: '#3d4451',
                    'base-100': '#ffffff'
                }
            },
            'cupcake'
        ]
    },
    plugins: [require('daisyui')]
}
