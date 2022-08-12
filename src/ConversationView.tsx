import { Box, Button, Radio, RadioGroup, TextField, Typography } from '@mui/joy'
import { useMutation } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Conversation, ConversationTemplate } from './ConversationTemplate'
import { IdentityProviders } from './packlets/identity'

export const ConversationView: FC<{
  template: ConversationTemplate
  data: Record<string, any>
  submission: Record<string, any>
  onSubmit: (data: Record<string, any>) => Promise<Record<string, any>>
}> = (props) => {
  const [state, setState] = useState<Record<string, any>>(props.submission)
  const mutation = useMutation(
    (data: typeof state) => {
      return props.onSubmit(data)
    },
    {
      onSuccess(data, variables, context) {
        setState(data)
        alert('Submission successful. Thanks!')
      },
      onError(error, variables, context) {
        alert('Submission failed. Please try again.\n\n' + String(error))
      },
    },
  )

  let elements: JSX.Element[] = []
  const hr = () => (
    <Box key={elements.length} py={2}>
      <Box borderTop={1} borderColor="#656463" />
    </Box>
  )

  const conversation: Conversation = {
    say: (text) => {
      elements.push(
        <Box key={elements.length}>
          <Typography level="body1" fontSize="20px">
            {text}
          </Typography>
        </Box>,
      )
    },
    data(key) {
      return props.data[key]
    },
    get(key) {
      return state[key]
    },
    pause: () => {
      elements.push(hr())
    },
    group(f) {
      const prevElements = elements
      elements = []
      const nextElements = elements
      try {
        f()
      } finally {
        elements = prevElements
        elements.push(
          <Box
            key={elements.length}
            p={4}
            bgcolor="#252423"
            borderRadius="lg"
            border={1}
            borderColor="#656463"
            display="flex"
            flexDirection="column"
            gap={4}
          >
            {nextElements}
          </Box>,
        )
      }
    },
    promptChoice(key, options) {
      const value =
        state[key] ??
        ('defaultChoice' in options ? options.defaultChoice : undefined)
      const setValue = (value: string) => {
        setState((state) => ({ ...state, [key]: value }))
      }
      elements.push(
        <Box key={elements.length} pl={4}>
          <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
            {Object.entries(options.choices).map(([key, value]) => (
              <Radio
                color="success"
                value={key}
                label={value}
                sx={{
                  fontSize: '24px',
                  '--Radio-size': '24px',
                  '--joy-palette-success-outlinedBorder': '#d7fc70',
                  '--joy-palette-success-outlinedColor': '#d7fc70',
                  '--joy-palette-success-outlinedHoverBg': '#d7fc7011',
                  '--joy-palette-success-outlinedHoverBorder': '#d7fc70',
                }}
              />
            ))}
          </RadioGroup>
        </Box>,
      )
      return value
    },
    promptText(key, options = {} as any) {
      const value = state[key] ?? options.defaultValue ?? ''
      const setValue = (value: string) => {
        setState((state) => ({ ...state, [key]: value }))
      }
      elements.push(
        <Box key={elements.length} pl={4}>
          <TextField
            fullWidth
            placeholder={options.placeholder}
            size="lg"
            componentsProps={{ input: { style: { fontSize: '24px' } } }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>,
      )
      return value
    },
    promptIdentity(key: string, provider) {
      if (state[key]) {
        const name =
          state[key]?.displayName || state[key]?.uid || 'Unknown User'
        elements.push(
          <Box key={elements.length} pl={4}>
            <Button
              size="lg"
              sx={{ fontSize: '24px' }}
              variant="outlined"
              onClick={() => {
                if (confirm('Do you want to sign out?')) {
                  setState(({ [key]: _yank, ...state }) => state)
                }
              }}
            >
              {name}
            </Button>
          </Box>,
        )
      } else {
        elements.push(
          <Box key={elements.length} pl={4}>
            <Button
              size="lg"
              sx={{ fontSize: '24px' }}
              onClick={async () => {
                try {
                  const identity = await provider.signIn()
                  setState((state) => ({ ...state, [key]: identity }))
                } catch (error) {
                  console.error(error)
                  alert(`Unable to sign in: ${error}`)
                }
              }}
            >
              Authenticate with {provider.name}
            </Button>
          </Box>,
        )
      }
    },
    IdentityProviders: IdentityProviders,
  }

  if (state.submitted) {
    conversation.say('You have already submitted this form.')
    elements.push(
      <Box key={elements.length} pl={4}>
        <Button
          sx={{ fontSize: '24px' }}
          size="lg"
          onClick={() => setState((state) => ({ ...state, submitted: false }))}
        >
          Edit my submission
        </Button>
      </Box>,
    )
  } else {
    const valid = props.template.converse(conversation)
    elements.push(hr())

    let submit: JSX.Element
    if (mutation.isLoading) {
      submit = (
        <Button sx={{ fontSize: '24px' }} size="lg" disabled>
          Saving…
        </Button>
      )
    } else {
      submit = (
        <Button
          sx={{ fontSize: '24px' }}
          size="lg"
          onClick={(e) =>
            mutation.mutate(!e.altKey ? { ...state, submitted: true } : state)
          }
        >
          Save
        </Button>
      )
    }
    elements.push(
      <Box key={elements.length} pl={4}>
        {submit}
      </Box>,
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      py={4}
      letterSpacing={'0.01em'}
    >
      {elements}
    </Box>
  )
}
