import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  DropzoneContainer,
  TextArea,
  UploadContainer,
  Divider,
  SupportedFormats
} from './styles/FileUpload.styles'

interface FileUploadProps {
  onFileContent: (content: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const [text, setText] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const content = reader.result as string
        setText(content)
        onFileContent(content)
      }
      reader.readAsText(file)
    }
  }, [onFileContent])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  })

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setText(content)
    onFileContent(content)
  }

  return (
    <UploadContainer>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag & drop a file here, or click to select a file</p>
        )}
        <SupportedFormats>
          Supported formats: .txt, .pdf
        </SupportedFormats>
      </DropzoneContainer>

      <Divider>or</Divider>

      <TextArea
        placeholder="Paste your terms and conditions text here..."
        value={text}
        onChange={handleTextChange}
      />
    </UploadContainer>
  )
}
