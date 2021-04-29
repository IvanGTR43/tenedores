import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from "react-native-elements"
import { isEmpty } from "lodash"
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase"
import { validationEmail } from "../../utils/validations"
import Loading from "../Loading"

export default function LoginForm(props){
    const [showPassword, setshowPassword] = useState(false)
    const [formData, setformData] = useState(defaultValue())
    const [loading, setLoading] = useState(false)
    const {toastRef} = props
    const navigation = useNavigation(true)

    firebase.auth().onAuthStateChanged((user)=> {
        user && navigation.navigate("account")
        }
    )

    const onChange = (e, type) => {
        setformData({...formData, [type]: e.nativeEvent.text})
    }
    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Todos los campos son Obligatorios")

        }
        else if(!validationEmail(formData.email)){
            toastRef.current.show("El correo es inválido")
        }
        else{
            setLoading(true)
            firebase.
            auth().
            signInWithEmailAndPassword(formData.email, formData.password).
            then(()=> {
                setLoading(false)
                navigation.goBack()
            }).
            catch(()=>{
                toastRef.current.show("Email o Contraseña Incorrectos")
                setLoading(false)
            })
        }

    }

    return(
        <View style={style.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                containerStyle={style.inputForm}
                onChange={(e) => {onChange(e, "email")}}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={style.iconRight}/>
                }/>
            <Input
                placeholder="Contraseña"
                containerStyle={style.inputForm}
                onChange={(e) => onChange(e, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={style.iconRight}
                    onPress={() => setshowPassword(!showPassword)}/>
                }/>
            <Button
                title="Iniciar Sesión"
                containerStyle={style.btnContainerLogin}
                buttonStyle={style.btnLogin}
                onPress={onSubmit}/>
            <Loading isVisible={loading} text="Iniciando Sesión"/>
        </View>
    )
}

function defaultValue(){
    return {
        email: "",
        password: ""
    }
}

const style = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    inputForm: {
        width : "100%",
        marginTop: 20,
    },
    btnContainerLogin:{
        marginTop: 20,
        width : "95%",
    },
    btnLogin:{
        backgroundColor: "#00a680"
    },
    iconRight:{
        color: "#c1c1c1"
    }
})
