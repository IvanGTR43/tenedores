import React, {useState, useRef, useEffect} from "react"
import {StyleSheet, View, Text} from "react-native"
import {Button} from "react-native-elements"
import Toast from "react-native-easy-toast"
import * as firebase from "firebase"

import Loading from "../../components/Loading"
import InfoUser from "../../components/Account/InfoUser"
import AccountOptions from "../../components/Account/AccountOptions"

export default function UserLoged() {

    const toastRef = useRef()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")
    const [reloadUserInfo, setReloadUserInfo] = useState(false)

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser
            //console.log(user)
            setUserInfo(user)
        })()
        setReloadUserInfo(false)
    }, [reloadUserInfo])

    return(<View style={styles.viewUserInfo}>
        {userInfo && <InfoUser
                        userInfo={userInfo}
                        toastRef={toastRef}
                        setLoading={setLoading}
                        setLoadingText={setText}/>}
        <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/> 
        <Button
            title="Cerrar Sesión"
            titleStyle={styles.btnCloseSeionText}
            onPress={() =>{firebase.auth().signOut()} }
            buttonStyle={styles.btnCloseSesion}/>
        <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Loading isVisible={loading} text={text}/>
    </View>)
}

const styles = StyleSheet.create({
    viewUserInfo:{
        flex: 1,
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    },
    btnCloseSesion:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopColor: "#e3e3e3",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSeionText:{
        color: "#00a680"
    }
})