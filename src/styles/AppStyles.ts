import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100vw;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`

export const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`

export const CardContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
`

export const CardContent = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HeadingWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: center;
`

export const ComponentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`
