import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export namespace IdentityProviders {
  export const gitHub: IdentityProvider = {
    name: 'GitHub',
    signIn: async () => {
      const result = await signInWithPopup(auth, new GithubAuthProvider())
      return {
        displayName: result.user.displayName || '',
        uid: result.user.uid,
        idToken: await result.user.getIdToken(),
      }
    },
  }
}

export type IdentityProvider = {
  name: string
  signIn: () => Promise<Identity>
}

export type Identity = {
  displayName: string
  uid: string
  idToken: string
}
