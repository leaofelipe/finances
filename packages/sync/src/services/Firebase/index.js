const initializeApp = require('firebase/app').initializeApp
const {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} = require('firebase/firestore/lite')
const isValidMonth = require('../../utils/isValidMonth')
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}
const TAGS = ['Essencial', 'Dívidas e Parcelamentos', 'Investimentos', 'Livre']
const CURRENT_YEAR = new Date().getFullYear()

function parseValue(value) {
  if (!/^\d+$/.test(value)) return
  return parseInt(value, 10).toString()
}

class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
  }

  async getSnapshot() {
    const dataSnapshot = doc(this.db, 'budget', CURRENT_YEAR.toString())
    return await getDoc(dataSnapshot)
  }

  async getBudget() {
    const dataSnapshot = await this.getSnapshot()
    return dataSnapshot.exists() ? dataSnapshot.data() : null
  }

  async getData(key) {
    const snapshot = await this.getSnapshot()
    const data = snapshot.data()
    return data[key] || null
  }

  async setMonthValue(key, month, value) {
    const parsedValue = parseValue(value)
    if (!isValidMonth(month) || !parsedValue || !TAGS.includes(key)) return
    const budgetDoc = doc(this.db, 'budget', CURRENT_YEAR.toString())
    const snapshot = await getDoc(budgetDoc)
    if (snapshot.exists()) {
      const data = snapshot.data()
      const updatedField = {
        ...data[key],
        [month]: parsedValue
      }
      await updateDoc(budgetDoc, { [key]: updatedField })
      return updatedField
    } else {
      console.warn('Document does not exist. Cannot update field.')
    }
  }
}

module.exports = new FirebaseService()
