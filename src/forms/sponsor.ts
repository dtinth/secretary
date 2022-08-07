import { Form } from '../Form'

export interface Sponsor {
  /** Sponsor’s name */
  name: string

  /** Banner image, size: 1200x480 */
  image: string

  /** URL to link to when clicking on banner */
  url: string

  /** Message to display below the banner */
  message: string

  /** Links to display below the banner, max 4 items */
  links: Array<{
    name: string
    url: string
  }>
}

export const form: Form<Sponsor> = (f) => {
  f.title('Sponsor Submission Form')
  f.say('Thanks for sponsoring our events! Please answer a few questions.')

  f.control({
    label: 'What name would you like to use?',
    control: f.FormControls.text(f.ref.child('name')),
  })

  f.control({
    label: 'We’ll display a banner, can you provide us the URL?',
    description:
      'Upload a banner image for your sponsor, must be 1200x480 pixels.',
    control: f.FormControls.text(f.ref.child('image')),
  })

  f.control({
    label: 'When clicking on the banner image, where should it link to?',
    control: f.FormControls.text(f.ref.child('url')),
  })

  f.heading('Links')
  f.say('You can add up to 4 links.')
  const links = f.ref.child('links')
  f.keyed('links', () => {
    for (const [i, link] of (f.select(links) || []).entries()) {
      const linkRef = links.child(i)
      f.group(`Link ${i + 1}`, () => {
        f.control({
          label: `Title`,
          control: f.FormControls.text(linkRef.child('name')),
        })
        f.control({
          label: `URL`,
          control: f.FormControls.text(linkRef.child('url')),
        })
      })
    }
    if ((f.select(links) || []).length < 4) {
      f.button({
        label: 'Add link',
        onClick: () => {
          f.push(f.ref.child('links'), {
            name: '',
            url: '',
          })
        },
      })
    }
  })
}
