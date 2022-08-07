import { DataReference } from './DataReference'
import { FormControls } from './FormControls'

export interface Form<Data = any> {
  (builder: FormBuilder<Data>): void
}

export interface FormBuilder<Data = any> {
  ref: DataReference<Data, Data>
  select<T>(ref: DataReference<Data, T>): T
  update<T>(ref: DataReference<Data, T>, updater: (value: T) => T): void
  push<T>(ref: DataReference<Data, T[] | undefined>, value: T): void
  title(title: string): void
  heading(text: string): void
  say(text: string): void
  control(options: FormControlOptions<Data>): void
  button(options: ButtonOptions): void
  group(title: string, f: () => void): void
  keyed(key: string, f: () => void): void
  FormControls: typeof FormControls
}

export interface FormControlOptions<Data = any> {
  label: string
  description?: string
  control?: FormControls.Control<Data>
}

export interface ButtonOptions {
  label: string
  onClick: () => void
}
