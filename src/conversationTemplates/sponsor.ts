import { ConversationTemplate } from '../ConversationTemplate'

export const template: ConversationTemplate = {
  converse(c) {
    c.say('Thank you for sponsoring our events! Please answer a few questions.')
    c.pause()

    c.say('What name would you like to use?')
    c.promptText('name', { placeholder: 'Sponsor name' })

    c.pause()
    c.say('We’ll display a banner, can you provide us the URL?')
    c.promptText('image', { placeholder: 'Banner image URL' })

    c.say('When clicking on the banner image, where should it link to?')
    c.promptText('url', {
      placeholder: 'URL to link to when clicking on banner',
    })

    c.pause()
    c.say('Under the banner, you can also add up to 4 links.')
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        c.say('Do you want to add a link?')
      } else {
        c.say('Do you want to add another link?')
      }
      const addLink = c.promptChoice(`link${i}-use`, {
        choices: {
          yes: 'Yes',
          no: 'No',
        },
        defaultChoice: 'no',
      })
      if (addLink !== 'yes') {
        break
      }
      c.group(() => {
        const title =
          i === 0
            ? '1st link'
            : i === 1
            ? '2nd link'
            : i === 2
            ? '3rd link'
            : 'the last link'
        c.say(`For the ${title}, what is the link text?`)
        c.promptText(`link${i}-text`, { placeholder: 'Link text' })
        c.say(`And what would be the URL?`)
        c.promptText(`link${i}-url`, { placeholder: 'Link URL' })
      })
    }

    c.pause()
    c.say('Under the banner, we’ll also display a message. What should it say?')
    c.promptText('message', {
      placeholder: 'Message to display under banner',
      multiline: true,
    })
  },
}
