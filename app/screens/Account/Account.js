import React, {useState, useEffect} from "react"
import { View, Text } from "react-native"
import * as firebase from "firebase"

import UserGuest from "./UserGuest"
import UserLoged from "./UserLoged";

export default function Account(){
    const [login, setlogin] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user =>{
            !user ? setlogin(false): setlogin(true)
        }))
    }, [])

    if (login === null) return(<Text>Cargando...</Text>)
    return login ? <UserLoged/> : <UserGuest/>
}