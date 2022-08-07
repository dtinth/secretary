import { TextField } from '@mui/joy'
import { ReactNode } from 'react'
import { DataReference } from './DataReference'

export namespace FormControls {
  export interface Control<Data = any> {
    render(options: RenderOptions): ReactNode
  }

  export interface RenderOptions {
    id: string
    select: (ref: DataReference<any, any>) => any
    update: (ref: DataReference<any, any>, updater: (value: any) => any) => void
  }

  export function text<Data = any>(
    ref: DataReference<Data, string>,
    controlOptions: {
      multiline?: boolean
    } = {},
  ): Control<Data> {
    return {
      render: (options) => {
        if (controlOptions.multiline) {
          // Joy UI does not have multiline text field yet?
          // Just use a plain old <textarea> for now.
          return (
            <textarea
              value={options.select(ref)}
              onChange={(e) => {
                const newValue = e.target.value
                options.update(ref, () => newValue)
              }}
            />
          )
        }
        return (
          <TextField
            fullWidth
            id={options.id}
            value={options.select(ref)}
            onChange={(e) => {
              const newValue = e.target.value
              options.update(ref, () => newValue)
            }}
          />
        )
      },
    }
  }
}
