import './styles.css'
import {useState, useEffect} from 'react'
import { db } from '../../services/firebase'
import { collection, getDocs } from 'firebase/firestore'

function Home() {
    const [name, setName] = useState([])
    const [age, setAge] = useState([])
    const [email , setEmail] = useState([])
    const [users, setUsers] = useState([])

    const usersCollection = collection(db, "users")

    useEffect(() => {
        const loadusers = async () => {
        const snapshot = await getDocs(usersCollection)
        const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        setUsers(list)
        }

        loadusers()
    }, [])
    const handleAddUser = async () => {
        console.log("button clicked")
        if (!name || !age || !email) return alert("preencha todos os campos")

            const novoUsuario = {
                name,
                age,
                email,
            }

            const docRef = await addDoc(usersCollection, novoUsuario)
            setUsers([...users, { id: docRef.id, ...novoUsuario }])

            setName('')
            setAge('')
            setEmail('')
    }

    const handleDeleteLocal = (id) => {
        const filteredUsers = users.filter((user) => user.id !== id)
        setUsers (filteredUsers)
    }   


    
}

export default Home
