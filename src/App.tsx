import { Box, Container, Typography } from '@mui/joy'
import { useState } from 'react'
import { FormView } from './FormView'
import { form } from './forms/sponsor'

function App() {
  const [count, setCount] = useState(0)

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
          <FormView form={form} />
        </Container>
      </Box>
    </Box>
  )
}

export default App
