import styled from 'styled-components'

export const DropzoneContainer = styled.div`
  border: 2px dashed hsl(var(--border));
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  width: 100%;

  &:hover {
    border-color: hsl(var(--primary));
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  margin-top: 1rem;
  resize: vertical;
`

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`

export const Divider = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`

export const SupportedFormats = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-top: 0.5rem;
`
