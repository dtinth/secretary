import { IdentityProvider, IdentityProviders } from './packlets/identity'

export interface ConversationTemplate {
  converse(conversation: Conversation): void | boolean
}

export interface Conversation {
  data(key: string): any
  get(key: string): any
  say(message: string): void
  pause(): void
  group(f: () => void): void

  promptText(
    key: string,
    options?: {
      placeholder: string
      multiline?: boolean
      defaultValue?: string
    },
  ): string

  promptChoice<C extends object>(
    key: string,
    options: {
      choices: C
      defaultChoice: keyof C
    },
  ): keyof C
  promptChoice<C extends object>(
    key: string,
    options: {
      choices: C
    },
  ): keyof C | undefined

  promptIdentity(key: string, provider: IdentityProvider): void
  IdentityProviders: typeof IdentityProviders
}
