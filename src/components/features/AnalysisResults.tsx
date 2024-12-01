import type { AnalysisResult } from '../../services/ai'
import {
  Section,
  RiskItem,
  ResultsContainer,
  SectionContent,
  SectionTitle,
  SubsectionTitle,
  Description,
  RiskHeader,
  RiskSeverity
} from './styles/AnalysisResults.styles'

interface AnalysisResultsProps {
  results: AnalysisResult
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  return (
    <ResultsContainer>
      <Section>
        <SectionTitle>Summary</SectionTitle>
        <Description>{results.summary}</Description>
      </Section>

      <Section>
        <SectionTitle>Key Sections</SectionTitle>
        <SectionContent>
          {results.sections.map((section, index) => (
            <div key={index}>
              <SubsectionTitle>{section.title}</SubsectionTitle>
              <Description>{section.content}</Description>
            </div>
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Potential Risks</SectionTitle>
        <SectionContent>
          {results.risks.map((risk, index) => (
            <RiskItem key={index} severity={risk.severity}>
              <RiskHeader>
                <RiskSeverity>{risk.severity} Risk</RiskSeverity>
              </RiskHeader>
              <Description>{risk.description}</Description>
            </RiskItem>
          ))}
        </SectionContent>
      </Section>
    </ResultsContainer>
  )
}
