import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, getDocs,
    doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc
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
const table = document.getElementById('table')

// show user and list of books
window.addEventListener('load', () => { 
    const label_user = document.getElementById('user')
    const docRef = doc(db, 'users', uid)
    getDoc(docRef)
    .then((doc) => {
        label_user.innerHTML = '<strong>User: </strong>' + doc.data().username
    })

    onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            var row = table.insertRow(table.rows.length)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            cell1.innerHTML = doc.data().title
            cell2.innerHTML = doc.data().author
            cell3.innerHTML = doc.data().status
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

// add document
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const _title = addBookForm.title.value
    const _author = addBookForm.author.value

    addDoc(colRef, {
        title: _title,
        author: _author,
        createdAt: serverTimestamp(),
        status: 'private'
    })
    .then(() => {
        alert('Successfully added a book!')
        addBookForm.reset()
        reset(table)
    })
    .catch((err) => {
        console.log(err.message)
    })
})

// delete document
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = deleteBookForm.title.value
    const author = deleteBookForm.author.value
    const q = query(colRef, where('title', '==', title), where('author', '==', author))
    getDocs(q)
    .then((querySnapshot) => {
        if (querySnapshot.empty) alert('Unvalid!')
        else {
            querySnapshot.forEach((_doc) => {
                const id = _doc.id
                const docRef = doc(doc(usersRef,uid), 'books', id)
                deleteDoc(docRef)
            })
            alert('Removed a book completely!')
            deleteBookForm.reset()
            reset(table)
        }
    })
})

// get a single document
const findForm = document.querySelector('.find')
findForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = findForm.title.value
    const author = findForm.author.value
    const q = query(colRef, where('title', '==', title), where('author', '==', author))
    getDocs(q)
    .then((querySnapshot) => {
        if (querySnapshot.empty) alert("Can't find this book!")
        else {
            querySnapshot.forEach((_doc) => {
                const id = _doc.id
                var row = document.getElementById(id)
                var cells = row.getElementsByTagName("td")
                for (var i = 0; i < cells.length; i++) {
                    cells[i].style.backgroundColor = 'yellow'
                }
            })
            findForm.reset()
        }
    })
})


// upload
const uploadForm = document.querySelector('.upload')
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const _title = uploadForm.title.value
    const _author = uploadForm.author.value
    const q = query(colRef, where('title', '==', _title), where('author', '==', _author))
    getDocs(q)
    .then((querySnapshot) => {
        if (querySnapshot.empty) alert('Unvalid!')
        else {
            querySnapshot.forEach((_doc) => {
                const id = _doc.id
                const docRef = doc(doc(usersRef, uid), 'books', id)
                updateDoc(docRef, {
                    status: 'public'
                })
                const docRefpublic = doc(db, 'users', uid)
                getDoc(docRefpublic)
                .then((doc) => {
                    const str = doc.data().username + ' (' + doc.data().name + ')'
                    addDoc(publicRef, {
                        title: _title,
                        author: _author,
                        user: str
                    })
                })
            })
            reset(table)
            uploadForm.reset()
            alert('Uploaded a book to public')
        }
    })
})

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

// back home
const BackButton = document.querySelector('.back')
BackButton.addEventListener('click', () => {
    window.location = "home.html"
})