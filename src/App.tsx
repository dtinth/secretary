import { Box, Container, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { ConversationView } from './ConversationView'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { conversationsRef, submissionsRef } from './packlets/firebase'
import { ConversationTemplate } from './ConversationTemplate'

function App() {
  const id = new URLSearchParams(window.location.search).get('token')

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flex="none" borderBottom="1px solid #656463" bgcolor="#090807">
        <Container maxWidth="md">
          <Box py={1}>
            <Typography textColor="#8b8685" fontWeight="bold">
              dtinth’s Secretary
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box flex="1" p={2}>
        <Container maxWidth="md">
          {id ? <ConversationApp id={id} /> : <>No id provided</>}
        </Container>
      </Box>
    </Box>
  )
}

const templates = import.meta.glob('./conversationTemplates/*.ts', {
  eager: true,
})

const ConversationApp: FC<{ id: string }> = (props) => {
  const { isLoading, error, data } = useQuery(
    ['conversation', props.id],
    async () => {
      const conversationDoc = doc(conversationsRef, props.id)
      const submissionDoc = doc(submissionsRef, props.id)
      const conversationSnap = await getDoc(conversationDoc)
      const submissionSnap = await getDoc(submissionDoc)
      return {
        templateName: conversationSnap.data()?.template,
        data: conversationSnap.data()?.data,
        submission: submissionSnap.data()?.data,
        submissionDoc,
      }
    },
  )
  if (isLoading) {
    return <>Loading</>
  }
  if (error) {
    return <>Failed to load form: {String(error)}</>
  }
  if (!data) {
    return <>No data</>
  }
  const template = (
    templates[`./conversationTemplates/${data.templateName}.ts`] as
      | { template: ConversationTemplate }
      | undefined
  )?.template
  if (!template) {
    return <>Template {String(data.templateName)} not found</>
  }
  return (
    <ConversationView
      template={template}
      data={data.data || {}}
      submission={data.submission || {}}
      onSubmit={async (newData) => {
        await setDoc(data.submissionDoc, {
          data: newData,
          timestamp: serverTimestamp(),
        })
        return newData
      }}
    />
  )
}

export default App
