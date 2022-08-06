import { Box, Button, Container, Typography } from '@mui/joy'
import { useState } from 'react'

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
          <Typography level="display2">Chart name</Typography>
          <Typography level="h1">Meow</Typography>
          <Typography level="body1">okay</Typography>
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default App
