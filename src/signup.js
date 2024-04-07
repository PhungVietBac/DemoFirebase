import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection,
    doc, serverTimestamp, setDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword, sendEmailVerification
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCnndyCrfGT0X6AmDG9RdAwDJGSmnUzzyQ",
    authDomain: "demogr17.firebaseapp.com",
    projectId: "demogr17",
    storageBucket: "demogr17.appspot.com",
    messagingSenderId: "998429633748",
    appId: "1:998429633748:web:af33bbe8031297f43f5f41",
    measurementId: "G-H1PN19Z6F8"
};

const app = initializeApp(firebaseConfig)
const _auth = getAuth()
const db = getFirestore()
const usersRef = collection(db, 'users')

// sign up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const _username = signupForm.username.value
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(_auth, email, password)
    .then(async (cred) => {
        await sendEmailVerification(cred.user)
        const docRef = doc(usersRef, cred.user.uid)
        localStorage.setItem('uid', cred.user.uid)
        setDoc(docRef, {
            username: _username,
            name: email,
            createdAt: serverTimestamp(),
        })
        .then(() => {
            window.location = "home.html"
        })
    })
    .catch((err) => {
        alert(err.message)
    })
})