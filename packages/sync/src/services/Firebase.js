const initializeApp = require('firebase/app').initializeApp
const { getFirestore } = require('firebase/firestore/lite')
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
  }
}

module.exports = new FirebaseService()
