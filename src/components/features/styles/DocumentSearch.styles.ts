import styled from 'styled-components'

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
  }
`

export const SearchButton = styled.button`
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ResultBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  background-color: hsl(var(--muted));
  white-space: pre-wrap;
  width: 100%;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const SearchRow = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: center;
`
