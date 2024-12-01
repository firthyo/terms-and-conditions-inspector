# Terms & Conditions Analyzer

An AI-powered web application inspired by Joan Is Awful from Black Mirror. It helps users analyze Terms and Conditions—upload documents, get summaries, identify potential risks, and ask questions to better understand the content.

## Features

- Document upload (PDF and text files) and text paste functionality
- AI-powered document analysis
- Key section summaries
- Risk identification and severity assessment
- Natural language document querying

## Technology Stack

- React with TypeScript
- styled-components for styling
- Google's Generative AI (Gemini) for document analysis
- Tailwind CSS for utility classes
- shadcn/ui for UI components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Upload a document using the file upload area or paste text directly
2. Wait for the AI analysis to complete
3. View the document summary, key sections, and identified risks
4. Use the search functionality to ask specific questions about the document


