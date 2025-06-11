import { initializeApp, getApps, type FirebaseApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null

// Initialize Firebase app only when needed
export const getFirebaseApp = () => {
  if (typeof window === "undefined") {
    return null
  }

  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }

  return app
}

// Lazy initialization functions
export const getAuth = async () => {
  if (typeof window === "undefined") return null

  const app = getFirebaseApp()
  if (!app) return null

  const { getAuth } = await import("firebase/auth")
  return getAuth(app)
}

export const getFirestore = async () => {
  if (typeof window === "undefined") return null

  const app = getFirebaseApp()
  if (!app) return null

  const { getFirestore } = await import("firebase/firestore")
  return getFirestore(app)
}

export const getStorage = async () => {
  if (typeof window === "undefined") return null

  const app = getFirebaseApp()
  if (!app) return null

  const { getStorage } = await import("firebase/storage")
  return getStorage(app)
}
