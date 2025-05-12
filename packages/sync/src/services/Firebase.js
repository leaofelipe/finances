const initializeApp = require('firebase/app').initializeApp
const {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs
} = require('firebase/firestore/lite')
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

  async createDocument(collection, data) {
    try {
      const document = doc(this.db, collection, data.id)
      const response = await setDoc(document, data)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create document')
    }
  }

  async getCollection(collectionName) {
    try {
      const collectionRef = collection(this.db, collectionName)
      const snapshot = await getDocs(collectionRef)
      const documents = {}
      snapshot.forEach((doc) => {
        documents[doc.id] = { id: doc.id, ...doc.data() }
      })
      return documents
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get collection')
    }
  }

  async getDocument(collection, id) {
    try {
      const document = doc(this.db, collection, id)
      const response = await getDoc(document)
      return response.exists() ? response.data() : null
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get document')
    }
  }

  async updateDocument(collection, id, data) {
    try {
      const document = doc(this.db, collection, id)
      const response = await updateDoc(document, data)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update document')
    }
  }

  async deleteDocument(collection, id) {
    try {
      const document = doc(this.db, collection, id)
      const response = await deleteDoc(document)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete document')
    }
  }
}

module.exports = new FirebaseService()
