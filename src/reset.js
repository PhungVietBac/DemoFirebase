import { initializeApp } from 'firebase/app'
import {
    getAuth, sendPasswordResetEmail
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

initializeApp(firebaseConfig)
const _auth = getAuth()

// reset password
const resetForm = document.querySelector('.reset')
resetForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = resetForm.email.value
    
    sendPasswordResetEmail(_auth, email)
    .then(() => {
        alert('Please check your mail and set new password!')
    })
    .catch((err) => {
        console.log(err.message)
    })
})