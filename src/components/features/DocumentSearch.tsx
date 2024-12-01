import { useState } from 'react'
import { queryDocument } from '../../services/ai'
import {
  SearchInput,
  SearchButton,
  ResultBox,
  SearchContainer,
  SearchRow
} from './styles/DocumentSearch.styles'

interface DocumentSearchProps {
  documentContent: string
}

export function DocumentSearch({ documentContent }: DocumentSearchProps) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await queryDocument(documentContent, query)
      setResult(response)
    } catch (error) {
      console.error('Error querying document:', error)
      setResult('Sorry, there was an error processing your query. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SearchContainer>
      <SearchRow>
        <SearchInput
          type="text"
          placeholder="Ask a question about the document..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <SearchButton onClick={handleSearch} disabled={isLoading || !query.trim()}>
          {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchRow>
      {result && <ResultBox>{result}</ResultBox>}
    </SearchContainer>
  )
}
