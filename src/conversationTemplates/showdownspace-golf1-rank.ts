import { ConversationTemplate } from '../ConversationTemplate'

export const template: ConversationTemplate = {
  converse(c) {
    // user is in top 100, we intend to publish the ranking, so
    // we'll ask them to provide github username
    c.say(
      'Thank you for participating in Code Golf Party #1 application round.',
    )
    c.say(
      'We plan to publish the ranking on our website. We need some extra information from you.',
    )
    c.pause()

    const email = c.data('email') || 'email@example.com'
    const defaultName = c.data('defaultName') || 'First L.'
    c.group(() => {
      c.say(
        `This form is intended for “${email}”. Do not share this link with anyone else, or they will be able to see and update your information.`,
      )
    })

    c.say('How should we display your ranking?')
    const displayMode = c.promptChoice('displayMode', {
      choices: {
        default: `Use my name from Eventpop (“${defaultName}”)`,
        github: 'Link to my GitHub profile',
      },
      defaultChoice: 'default',
    })

    if (displayMode === 'github') {
      c.say('What is your GitHub ID?')
      c.promptIdentity('github', c.IdentityProviders.gitHub)
    }
  },
}
