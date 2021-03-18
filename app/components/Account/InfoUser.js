import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from "react-native-elements"

import * as firebase from "firebase"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser(props){
    const {userInfo: {uid, photoURL, displayName, email}, toastRef, setLoading, setLoadingText} = props

    const changeAvatar = async () => {

        const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
        const resultPermissionCamera = resultPermission.permissions.camera.status
        if (resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario Aceptar los Permisos");
        }
        else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing :true,
                aspect:[4, 3]
            })
            if (result.cancelled) {
                toastRef.current.show("Has cerrado la selección de Imagenes")
            }
            else{
                uploadImage(result.uri).then(()=>{
                    updatePhotoUrl()
                    console.log("Imagen Arriba")
                }).catch(()=>{
                    toastRef.current.show("No se Pudo Subir la Imagen")
                })
            }
        }
    }

    const uploadImage = async(uri) => {
        setLoadingText("Actualizando Imagen")
        setLoading(true)
        const response = await fetch(uri)
        const blob = await response.blob()
        //console.log(JSON.stringify(blob));

    const ref = firebase.storage().ref().child(`avatar/${uid}`)
    return ref.put(blob)
    }

    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response
                }
                await firebase.auth().currentUser.updateProfile(update)
                console.log("Imagen Actualizada");
                setLoading(false)
        }).catch(() =>{
            toastRef.current.show("Error al actualizar el Avatar")
        })
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                source={photoURL ? {uri: photoURL} : require("../../../assets/img/avatar-default.jpg")}
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                />
            <View>
            <Text style={styles.displayName}>{displayName ? displayName : "Usuario Anonimo"}</Text>
            <Text style={styles.diplayEMail}>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar:{
        marginRight: 20
    },
    displayName:{
        color: "#aaa",
        paddingBottom: 5,
        fontWeight: "bold"
    },
    diplayEMail:{
        fontWeight: "bold"
    }
})