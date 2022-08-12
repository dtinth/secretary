import { initializeApp } from 'firebase/app'
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBF85lvMuWKoVD4TXYQ0y-9smN7l1fPr-c',
  authDomain: 'virtual-cloud-assistant.firebaseapp.com',
  databaseURL: 'https://virtual-cloud-assistant.firebaseio.com',
  projectId: 'virtual-cloud-assistant',
  storageBucket: 'virtual-cloud-assistant.appspot.com',
  messagingSenderId: '866670124929',
  appId: '1:866670124929:web:3c2771a60b31da03cd5280',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
setPersistence(auth, inMemoryPersistence)
export const db = getFirestore(app)

export const submissionsRef = collection(db, 'projects/secretary/submissions')
export const conversationsRef = collection(
  db,
  'projects/secretary/conversations',
)
