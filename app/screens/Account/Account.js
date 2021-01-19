import React, {useState, useEffect} from "react"
import * as firebase from "firebase"

import UserGuest from "./UserGuest"
import UserLoged from "./UserLoged";
import Loading from "../../components/Loading"


export default function Account(){
    const [login, setlogin] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user =>{
            !user ? setlogin(false): setlogin(true)
        }))
    }, [])

    if (login === null) return <Loading isVisible={true} text="Cargando..."/>
    return login ? <UserLoged/> : <UserGuest/>
}