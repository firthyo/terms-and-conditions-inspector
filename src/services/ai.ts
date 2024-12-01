import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export interface Section {
  title: string
  content: string
}

export interface Risk {
  severity: 'high' | 'medium' | 'low'
  description: string
  tags: string[]
}

export interface AnalysisResult {
  summary: string
  sections: Section[]
  risks: Risk[]
}

// Rate limiting configuration
const RATE_LIMITS = {
  requestsPerMinute: 2,
  requestsPerDay: 50,
  delayBetweenRequests: 30000, // 30 seconds between requests
}

let requestCount = 0
let lastRequestTime = 0

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to handle rate-limited API calls
async function makeAIRequest(prompt: string) {
  // Check if we need to wait
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime

  if (timeSinceLastRequest < RATE_LIMITS.delayBetweenRequests) {
    const waitTime = RATE_LIMITS.delayBetweenRequests - timeSinceLastRequest
    console.log(`Waiting ${waitTime}ms before next request...`)
    await delay(waitTime)
  }

  try {
    requestCount++
    lastRequestTime = Date.now()
    console.log(`Making request ${requestCount}/${RATE_LIMITS.requestsPerDay}`)

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log('Raw AI response:', text)
    return text
  } catch (error: any) {
    if (error.message?.includes('429')) {
      console.log('Rate limit hit, waiting longer...')
      await delay(RATE_LIMITS.delayBetweenRequests * 2)
      return makeAIRequest(prompt) // Retry once
    }
    throw error
  }
}

// Sequential analysis function
async function analyzeSequentially(content: string) {
  console.log('Starting sequential analysis...')

  // Generate summary
  console.log('Generating summary...')
  const summary = await generateSummary(content)
  await delay(RATE_LIMITS.delayBetweenRequests)

  // Analyze privacy policy
  console.log('Analyzing privacy policy...')
  const privacy = await analyzePrivacyPolicy(content)
  await delay(RATE_LIMITS.delayBetweenRequests)

  // Analyze data sharing
  console.log('Analyzing data sharing...')
  const sharing = await analyzeDataSharing(content)
  await delay(RATE_LIMITS.delayBetweenRequests)

  // Analyze user responsibilities
  console.log('Analyzing user responsibilities...')
  const responsibilities = await analyzeUserResponsibilities(content)
  await delay(RATE_LIMITS.delayBetweenRequests)

  // Analyze risks
  console.log('Analyzing risks...')
  const risks = await analyzeRisks(content)



  return { summary, privacy, sharing, responsibilities, risks }
}

// Analysis functions remain the same, just using the rate-limited makeAIRequest
export async function analyzePrivacyPolicy(content: string): Promise<Section> {
  const prompt = `You are a legal document analyzer specializing in privacy policies. Analyze the privacy-related aspects of this terms and conditions document.

Focus on:
- How personal data is collected
- How data is stored and protected
- What the data is used for
- User privacy rights
- Data retention policies


Return your analysis as a JSON object with this EXACT format:
{
  "title": "Privacy Policy",
  "content": "A clear, detailed summary of all privacy-related aspects. For example: 'The service collects email and usage data, stores it securely using encryption, and retains it for 12 months. Data is used for service improvement and personalization. Users can request data deletion.'"
}

Important: Provide specific details from the document, not generic statements. If no privacy information is found, explain what's missing.

Document to analyze:
${content}`

  let text: string
  try {
    text = await makeAIRequest(prompt)
    console.log('Privacy policy raw response:', text)

    // Try to clean the response in case it contains text before or after the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.title || !parsed.content || typeof parsed.title !== 'string' || typeof parsed.content !== 'string') {
      console.error('Invalid privacy policy response structure:', parsed)
      throw new Error('Invalid response structure - missing title or content')
    }

    return {
      title: parsed.title,
      content: parsed.content
    }
  } catch (error) {
    console.error('Privacy policy analysis error:', error)
    if (error instanceof SyntaxError) {
      console.error('Raw response that failed to parse:', error)
    }
    // Return a fallback response when analysis fails
    return {
      title: 'Privacy Policy',
      content: 'Unable to analyze privacy policy due to an error. Please try again or review the document manually.'
    }
  }
}

export async function analyzeDataSharing(content: string): Promise<Section> {
  const prompt = `Analyze the data sharing aspects of this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "title": "Data Sharing",
  "content": "Clear description of third-party sharing policies"
}

Document to analyze:
${content}`

  let text: string
  try {
    text = await makeAIRequest(prompt)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.title || !parsed.content) {
      throw new Error('Invalid response structure')
    }
    return parsed
  } catch (error) {
    console.error('Data sharing analysis error:', error)
    if (error instanceof SyntaxError) {
      console.error('Raw response that failed to parse:', error)
    }
    // Return a fallback response when analysis fails
    return {
      title: 'Data Sharing',
      content: 'Unable to analyze data sharing due to an error. Please try again or review the document manually.'
    }
  }
}

export async function analyzeUserResponsibilities(content: string): Promise<Section> {
  const prompt = `Analyze the user responsibilities in this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "title": "User Responsibilities",
  "content": "Clear description of what users must comply with"
}

Document to analyze:
${content}`

  let text: string
  try {
    text = await makeAIRequest(prompt)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.title || !parsed.content) {
      throw new Error('Invalid response structure')
    }
    return parsed
  } catch (error) {
    console.error('User responsibilities analysis error:', error)
    if (error instanceof SyntaxError) {
      console.error('Raw response that failed to parse:', error)
    }
    // Return a fallback response when analysis fails
    return {
      title: 'User Responsibilities',
      content: 'Unable to analyze user responsibilities due to an error. Please try again or review the document manually.'
    }
  }
}

export async function analyzeRisks(content: string): Promise<Risk[]> {
  const prompt = `You are a legal document analyzer specializing in risk assessment. Analyze the risks and potential liabilities in this terms and conditions document.

Focus on identifying risks related to:
- User obligations and responsibilities
- Service limitations and disclaimers
- Liability and indemnification
- Account termination conditions
- Intellectual property violations

Return your analysis as a JSON object with this EXACT format:
{
  "risks": [
    {
      "severity": "high|medium|low",
      "description": "Detailed description of the risk"
    }
  ]
}

Important: 
- Each risk must have both severity and description
- Severity must be exactly "high", "medium", or "low"
- Provide specific details from the document, not generic statements
- If no risks are found, explain what types of risks are typically covered

Document to analyze:
${content}`

  try {
    const text = await makeAIRequest(prompt)
    console.log('Risks raw response:', text)

    // Try to clean the response in case it contains text before or after the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.risks || !Array.isArray(parsed.risks)) {
      console.error('Invalid risks response structure:', parsed)
      throw new Error('Invalid response structure - missing risks array')
    }

    const validRisks = parsed.risks.filter((risk: any) => {
      const isValid = risk.severity &&
        risk.description &&
        ['high', 'medium', 'low'].includes(risk.severity.toLowerCase())

      if (!isValid) {
        console.error('Invalid risk object:', risk)
      }
      return isValid
    })

    if (validRisks.length === 0) {
      console.error('No valid risks found in response')
      throw new Error('No valid risks in response')
    }

    return validRisks.map((risk : any )=> ({
      ...risk,
      tags: ['ai-identified']
    }))
  } catch (error) {
    console.error('Risk analysis error:', error)
    if (error instanceof SyntaxError) {
      console.error('Failed to parse AI response')
    }
    // Return a fallback response when analysis fails
    return [
      {
        severity: 'high',
        description: 'Unable to analyze risks due to an error. Please try again or review the document manually.',
        tags: ['error', 'analysis-failed']
      }
    ]
  }
}

export async function generateSummary(content: string): Promise<string> {
  const prompt = `Provide a brief, clear summary of this terms and conditions document.
Return ONLY a JSON object in this exact format:
{
  "summary": "A concise 2-3 sentence summary of the main points and purpose of this document"
}

Document to analyze:
${content}`

  let text: string
  try {
    text = await makeAIRequest(prompt)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    if (!parsed.summary) {
      throw new Error('Invalid response structure')
    }
    return parsed.summary
  } catch (error) {
    console.error('Summary generation error:', error)
    if (error instanceof SyntaxError) {
      console.error('Raw response that failed to parse:', error)
    }
    // Return a fallback response when analysis fails
    return 'Unable to generate summary due to an error. Please try again or review the document manually.'
  }
}

// Main analysis function
export async function analyzeDocument(content: string): Promise<AnalysisResult> {
  if (!content || content.trim().length === 0) {
    throw new Error('Empty content provided')
  }

  console.log('Starting document analysis...')

  try {
    // Always use sequential analysis to respect rate limits
    const result = await analyzeSequentially(content)

    console.log('Analysis completed successfully', result)

    return {
      summary: result.summary,
      sections: [result.privacy, result.sharing, result.responsibilities],
      risks: result.risks
    }
  } catch (error) {
    console.error('Error in document analysis:', error)
    return {
      summary: "Analysis failed: " + (error as Error).message,
      sections: [
        { title: "Error", content: "Failed to analyze document. Please try again later." }
      ],
      risks: [
        { severity: "high", description: "Analysis incomplete due to technical issues.", tags: ['error', 'analysis-failed'] }
      ]
    }
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
    const text = await makeAIRequest(prompt)
    return text
  } catch (error) {
    console.error('Error querying document:', error)
    return "Error: Unable to process query due to rate limits. Please try again later."
  }
}
