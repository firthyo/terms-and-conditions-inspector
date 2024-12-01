import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

interface Section {
  title: string
  content: string
}

interface Risk {
  severity: 'high' | 'medium' | 'low'
  description: string
}

// Helper function to handle API calls
async function makeAIRequest(prompt: string) {
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log('Raw AI response:', text)
    return text
  } catch (error) {
    console.error('AI API error:', error)
    throw error
  }
}

// Analyze privacy policy section
export async function analyzePrivacyPolicy(content: string): Promise<Section> {
  const prompt = `Analyze the privacy policy aspects of this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "title": "Privacy Policy",
  "content": "Clear description of how personal data is collected, used, and stored."
}

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    try {
      const parsed = JSON.parse(text)
      if (!parsed.title || !parsed.content) {
        throw new Error('Invalid response structure')
      }
      return parsed
    } catch (parseError) {
      console.error('Error parsing privacy policy response:', parseError)
      console.error('Raw text:', text)
      throw parseError
    }
  } catch (error) {
    console.error('Privacy policy analysis error:', error)
    return {
      title: "Privacy Policy",
      content: "Error analyzing privacy policy. Check console for details."
    }
  }
}

// Analyze data sharing section
export async function analyzeDataSharing(content: string): Promise<Section> {
  const prompt = `Analyze the data sharing aspects of this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "title": "Data Sharing",
  "content": "Clear description of third-party sharing policies"
}

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    try {
      const parsed = JSON.parse(text)
      if (!parsed.title || !parsed.content) {
        throw new Error('Invalid response structure')
      }
      return parsed
    } catch (parseError) {
      console.error('Error parsing data sharing response:', parseError)
      console.error('Raw text:', text)
      throw parseError
    }
  } catch (error) {
    console.error('Data sharing analysis error:', error)
    return {
      title: "Data Sharing",
      content: "Error analyzing data sharing. Check console for details."
    }
  }
}

// Analyze user responsibilities section
export async function analyzeUserResponsibilities(content: string): Promise<Section> {
  const prompt = `Analyze the user responsibilities in this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "title": "User Responsibilities",
  "content": "Clear description of what users must comply with"
}

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    try {
      const parsed = JSON.parse(text)
      if (!parsed.title || !parsed.content) {
        throw new Error('Invalid response structure')
      }
      return parsed
    } catch (parseError) {
      console.error('Error parsing user responsibilities response:', parseError)
      console.error('Raw text:', text)
      throw parseError
    }
  } catch (error) {
    console.error('User responsibilities analysis error:', error)
    return {
      title: "User Responsibilities",
      content: "Error analyzing user responsibilities. Check console for details."
    }
  }
}

// Analyze risks
export async function analyzeRisks(content: string): Promise<Risk[]> {
  const prompt = `Analyze the risks in this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "risks": [
    {
      "severity": "high",
      "description": "Specific description of a high-priority risk"
    },
    {
      "severity": "medium",
      "description": "Specific description of a medium-priority risk"
    },
    {
      "severity": "low",
      "description": "Specific description of a low-priority risk"
    }
  ]
}

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    try {
      const parsed = JSON.parse(text)
      if (!parsed.risks || !Array.isArray(parsed.risks)) {
        throw new Error('Invalid response structure - missing risks array')
      }

      const validRisks = parsed.risks.filter((risk : any) =>
        risk.severity &&
        risk.description &&
        ['high', 'medium', 'low'].includes(risk.severity.toLowerCase())
      )

      if (validRisks.length === 0) {
        throw new Error('No valid risks in response')
      }

      return validRisks
    } catch (parseError) {
      console.error('Error parsing risks response:', parseError)
      console.error('Raw text:', text)
      throw parseError
    }
  } catch (error) {
    console.error('Risk analysis error:', error)
    return [{
      severity: 'high',
      description: 'Error analyzing risks. Check console for details.'
    }]
  }
}

// Generate document summary
export async function generateSummary(content: string): Promise<string> {
  const prompt = `Provide a brief, clear summary of this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "summary": "A concise 2-3 sentence summary of the main points and purpose of this document"
}

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    try {
      const parsed = JSON.parse(text)
      if (!parsed.summary) {
        throw new Error('Invalid response structure')
      }
      return parsed.summary
    } catch (parseError) {
      console.error('Error parsing summary response:', parseError)
      console.error('Raw text:', text)
      throw parseError
    }
  } catch (error) {
    console.error('Summary generation error:', error)
    return "Error generating summary. Check console for details."
  }
}

// Main analysis function that combines all sections
export async function analyzeDocument(content: string) {
  // Validate input
  if (!content || content.trim().length === 0) {
    throw new Error('Empty content provided')
  }

  console.log('Starting document analysis...')

  try {
    const [summary, privacy, sharing, responsibilities, risks] = await Promise.all([
      generateSummary(content),
      analyzePrivacyPolicy(content),
      analyzeDataSharing(content),
      analyzeUserResponsibilities(content),
      analyzeRisks(content)
    ])

    console.log('Analysis completed successfully', { summary, privacy, sharing, responsibilities, risks })

    return {
      summary,
      sections: [privacy, sharing, responsibilities],
      risks
    }
  } catch (error) {
    console.error('Error in document analysis:', error)
    throw error
  }
}

export async function queryDocument(content: string, query: string): Promise<string> {
  const prompt = `
    Based on the following Terms and Conditions document, please answer this question:
    ${query}

    Document:
    ${content}
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error querying document:', error)
    throw error
  }
}
