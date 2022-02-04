// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbZXI23sEbUTxi1YB6gfYnpRMCmSqpGRw',
  authDomain: 'lijepa-i-zdrava.firebaseapp.com',
  projectId: 'lijepa-i-zdrava',
  storageBucket: 'lijepa-i-zdrava.appspot.com',
  messagingSenderId: '368307866979',
  appId: '1:368307866979:web:36a63fceecac9b7fa85756',
  measurementId: 'G-TKT87EGFN2'
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
export const db = getFirestore()
export const analytics = getAnalytics(firebase)
