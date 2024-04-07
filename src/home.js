import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, 
    doc, query, orderBy, getDoc
} from 'firebase/firestore'
import {
    getAuth, signOut, onAuthStateChanged
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
const db = getFirestore(app)
const auth = getAuth(app)
// get user
const uid = localStorage.getItem('uid')
const usersRef = collection(db, 'users')
const colRef = collection(doc(usersRef, uid), 'books')
const publicRef = collection(db, 'public books')
const _query = query(colRef, orderBy('createdAt'))
const table = document.getElementById('table_public')

// show user and list of books
window.addEventListener('load', () => { 
    const welcome = document.getElementById('user_public')
    const docRef = doc(db, 'users', uid)
    getDoc(docRef)
    .then((doc) => {
        welcome.innerHTML = 'Welcome ' + doc.data().username + '!'
    })

    onSnapshot(publicRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            var row = table.insertRow(table.rows.length)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            cell1.innerHTML = doc.data().title
            cell2.innerHTML = doc.data().author
            cell3.innerHTML = doc.data().user
            row.id = doc.id
        })
    })
})

// real time collection data
const unsubCol = onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// func reset data
function reset(table) {
    for (var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
}

// log out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        //console.log('the user signed out')
        window.location = ("index.html")
    })
    .catch((err) => {
        console.log(err.message)
    })
})

//auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

// change pages
const ManageButton = document.querySelector('.manage')
ManageButton.addEventListener('click', () => {
    window.location = 'books.html'
})