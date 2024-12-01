import { useState } from 'react'
import { Theme, Heading, Card } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './styles/globals.css'
import { FileUpload } from './components/features/FileUpload'
import { AnalysisResults } from './components/features/AnalysisResults'
import { DocumentSearch } from './components/features/DocumentSearch'
import { analyzeDocument } from './services/ai'
import type { AnalysisResult } from './services/ai'
import {
  AppContainer,
  HeaderContainer,
  HeaderContent,
  MainContainer,
  ContentWrapper,
  CardContainer,
  CardContent,
  HeadingWrapper,
  ComponentWrapper,
  LoadingContainer,
  LoadingContent,
  ResultsContainer
} from './styles/AppStyles'

function App() {
  const [documentContent, setDocumentContent] = useState('')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileContent = async (content: string) => {
    setDocumentContent(content)
    setIsAnalyzing(true)
    try {
      const results = await analyzeDocument(content)
      setAnalysisResults(results)
    } catch (error) {
      console.error('Error analyzing document:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Theme appearance="light" accentColor="blue" radius="large">
      <AppContainer>
        <HeaderContainer>
          <HeaderContent>
            <Heading size="6" className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Terms & Conditions Analyzer
            </Heading>
          </HeaderContent>
        </HeaderContainer>

        <MainContainer>
          <ContentWrapper>
            <CardContainer>
              <Card>
                <CardContent>
                  <HeadingWrapper>
                    <Heading size="4" weight="medium">
                      Upload Document
                    </Heading>
                  </HeadingWrapper>
                  <ComponentWrapper>
                    <FileUpload onFileContent={handleFileContent} />
                  </ComponentWrapper>
                </CardContent>
              </Card>
            </CardContainer>

            {isAnalyzing && (
              <LoadingContainer>
                <LoadingContent>
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Analyzing your document...</p>
                </LoadingContent>
              </LoadingContainer>
            )}

            {analysisResults && !isAnalyzing && (
              <ResultsContainer>
                <CardContainer>
                  <Card>
                    <CardContent>
                      <HeadingWrapper>
                        <Heading size="4" weight="medium">
                          Analysis Results
                        </Heading>
                      </HeadingWrapper>
                      <ComponentWrapper>
                        <AnalysisResults results={analysisResults} />
                      </ComponentWrapper>
                    </CardContent>
                  </Card>
                </CardContainer>

                <CardContainer>
                  <Card>
                    <CardContent>
                      <HeadingWrapper>
                        <Heading size="4" weight="medium">
                          Ask Questions
                        </Heading>
                      </HeadingWrapper>
                      <ComponentWrapper>
                        <DocumentSearch documentContent={documentContent} />
                      </ComponentWrapper>
                    </CardContent>
                  </Card>
                </CardContainer>
              </ResultsContainer>
            )}
          </ContentWrapper>
        </MainContainer>
      </AppContainer>
    </Theme>
  )
}

export default App
