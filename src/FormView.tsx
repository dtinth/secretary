import { Box, Button, Typography } from '@mui/joy'
import { FormControls } from './FormControls'
import { Form } from './Form'
import { FC, Fragment, ReactNode, useId, useState } from 'react'
import { DataReference } from './DataReference'

export function FormView(props: { form: Form }) {
  const [state, setState] = useState<any>({
    name: 'wtf',
  })
  let elements: JSX.Element[] = []

  const select = (ref: DataReference<any, any>) => ref.accessor.read(state)
  const update = (
    ref: DataReference<any, any>,
    updater: (base: any) => any,
  ) => {
    setState((state: any) => ref.accessor.write(state, updater))
  }
  const push = (ref: DataReference<any, any[]>, value: any) => {
    setState((state: any) =>
      ref.accessor.write(state, (old) => {
        return [...(old || []), value]
      }),
    )
  }

  props.form({
    FormControls: FormControls,
    ref: DataReference.root(),
    select,
    update,
    push,
    title: (title) => {
      elements.push(
        <Typography level="display2" key={elements.length}>
          {title}
        </Typography>,
      )
    },
    control: (options) => {
      elements.push(
        <Box key={elements.length} mt={4}>
          <IdProvider>
            {(id) => (
              <>
                <Typography level="body1" fontWeight="bold">
                  <label htmlFor={id}>{options.label}</label>
                </Typography>
                {!!options.description && (
                  <Typography level="body2">{options.description}</Typography>
                )}
                <Box mt={1}>
                  {!!options.control &&
                    options.control.render({ id, select, update })}
                </Box>
              </>
            )}
          </IdProvider>
        </Box>,
      )
    },
    group: (title, f) => {
      const oldElements = elements
      try {
        elements = []
        f()
        oldElements.push(
          <Box
            key={oldElements.length}
            mt={4}
            border="1px solid #656463"
            borderRadius="8px"
            p={2}
          >
            <Typography level="h3">{title}</Typography>
            {elements}
          </Box>,
        )
      } finally {
        elements = oldElements
      }
    },
    keyed: (key: string, f) => {
      const oldElements = elements
      try {
        elements = []
        f()
        oldElements.push(<Fragment key={key}>{elements}</Fragment>)
      } finally {
        elements = oldElements
      }
    },
    heading(text) {
      elements.push(
        <Typography level="h2" key={elements.length} mt={6}>
          {text}
        </Typography>,
      )
    },
    say(text) {
      elements.push(
        <Typography level="body1" key={elements.length} mt={4}>
          {text}
        </Typography>,
      )
    },
    button(options) {
      elements.push(
        <Box key={elements.length} mt={4}>
          <Button onClick={options.onClick}>{options.label}</Button>
        </Box>,
      )
    },
  })
  return <Box>{elements}</Box>
}

const IdProvider: FC<{ children: (id: string) => ReactNode }> = (props) => {
  const id = useId()
  return <>{props.children(id)}</>
}
