# Professional CV Builder

A modern, responsive CV builder built with React, Vite, and Tailwind CSS.

## Features

- **Real-time Preview**: See your changes instantly.
- **Multiple Templates**: Choose from various professional designs.
- **AI-Powered Suggestions**: Get help writing your summary and experience bullet points using Google Gemini.
- **Print to PDF**: High-quality PDF export using native browser printing.
- **Customizable Styles**: Adjust fonts, colors, and layout density.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env`.
   - Add your `VITE_GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/).
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is ready for deployment on platforms like Vercel, Netlify, or GitHub Pages. Ensure you set the `VITE_GEMINI_API_KEY` in your deployment dashboard.
