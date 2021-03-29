import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import {validationEmail} from "../../utils/validations"
import { reautenticate } from "../../utils/api";
import * as firebase from "firebase"

export default function ChangeEmailForm(props){
    const {email, setShowModal, toastRef, setReloadUserInfo} = props
    const [formData, setFormData] = useState(defaulValue)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    const onSubmit = () =>{
        console.log(formData);
        setErrors({})
        if(!formData.email || email === formData.email){
            setErrors({
                email: "El Email no ha Cambiado"
            })
        }else if(!validationEmail(formData.email)){
            setErrors({
                email: "Correo no Valido"
            })
        }else if(!formData.password){
            setErrors({
                password: "La contraseña no puede estar Vacia"
            })
        }
        else{
            setIsLoading(true)
            reautenticate(formData.password).then(response =>{
                firebase.auth()
                .currentUser.updateEmail(formData.email)
                .then(()=>{
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    toastRef.current.show("Email Actualizado Correctamente")
                    setShowModal(false)
                }).catch(()=>{
                    setErrors({email: "Error Al Actualizar El Correo"})
                    setIsLoading(false)
                })
                setIsLoading(false)
            }).catch(()=>{
                setErrors({
                    password: "La Contraseña no es Correcta"
                })
                setIsLoading(false)
            })
        }
    }
    return(
        <View style={styles.view}>
            <Input
            placeholder="Ingresa Correo Electronico"
            containerStyle={styles.input}
            defaultValue={email}
            rightIcon={
                {
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }
            }
            onChange={(e) => onChange(e, "email")}
            errorMessage={errors.email}/>
            <Input
                placeholder="Contraseña Actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}/>
            <Button
                title="Cambiar Correo"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={false}
                onPress={onSubmit}
                loading={isLoading}/>
        </View>
    )
}
function defaulValue(){
    return{
        email: "",
        password: ""
    }
}
const styles = StyleSheet.create({
    view: {
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: "95%"
    },
    btn:{
        backgroundColor: "#00a680"
    }
})