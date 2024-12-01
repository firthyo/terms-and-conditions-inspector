import styled from 'styled-components'

export const Section = styled.section`
  margin-bottom: 2rem;
`

export const RiskItem = styled.div<{ severity: 'high' | 'medium' | 'low' }>`
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
  background-color: ${({ severity }) => {
    switch (severity) {
      case 'high':
        return 'hsl(var(--destructive) / 0.1)'
      case 'medium':
        return 'hsl(var(--warning) / 0.1)'
      case 'low':
        return 'hsl(var(--muted) / 0.1)'
    }
  }};
`

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

export const SubsectionTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.5rem;
`

export const Description = styled.p`
  color: var(--muted-foreground);
`

export const RiskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const RiskSeverity = styled.span`
  font-weight: 500;
  text-transform: capitalize;
`
