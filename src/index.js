import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection,
    doc, serverTimestamp, setDoc
} from 'firebase/firestore'
import {
    getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup
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
const auth = getAuth()
auth.languageCode = 'it'
const provider = new GoogleAuthProvider()
const db = getFirestore()
const usersRef = collection(db, 'users')

provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        window.location = "home.html"
        localStorage.setItem('uid', auth.currentUser.uid)
    })
    .catch((err) => {    
        alert('Unvalid email/password')
    })
})

const signInGoogle = document.getElementById('google')
signInGoogle.addEventListener('click', (e) => {
    e.preventDefault()

    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const docRef = doc(usersRef, user.uid)
        localStorage.setItem('uid', user.uid)
        setDoc(docRef, {
            username: user.displayName,
            name: user.email,
            createdAt: serverTimestamp(),
        })
        .then(() => {
            window.location = "home.html"
            localStorage.setItem('uid', user.uid)
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage)
    })
})