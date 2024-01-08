module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff00bf",
          "secondary": "#96d600",
          "accent": "#0088f5",
          "neutral": "#101c0f",
          "base-100": "#1e263a",
          "info": "#00c6ff",
          "success": "#13e835",
          "warning": "#bc5400",
          "error": "#ec002c",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

