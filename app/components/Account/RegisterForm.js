import React, {useState} from 'react'
import {StyleSheet ,View, Text } from "react-native"
import { Input, Icon, Button } from 'react-native-elements'
import { onChange } from 'react-native-reanimated'
import { validationEmail } from "../../utils/validations"
import { size, isEmpty } from "lodash"
import * as firebase from "firebase"
import {useNavigation} from "@react-navigation/native"
import Loading from "../Loading"



export default function RegisterForm(props) {

    const {toastRef} = props

    const [showPassword, setshowPassword] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)
    const [loading, setloading] = useState(false)
    const [formData, setformData] = useState(defaultValue())

    const navigation = useNavigation()

    //Enviar lod Datos del Formulario
    const onSubmit = () => {

        if(isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword)){
                //console.log("Todos los Campos son Obligatorios");
                toastRef.current.show("Todos Los Campos son Obligatorios")
        }
        else if(validationEmail(formData.email) == false){
            //console.log("El email no esta escrito correctamente")
            toastRef.current.show("El email No esta escrito correctamente")
        }
        else if(formData.password !== formData.repeatPassword){
            //console.log("las contraseñas tienen que ser iguales Iguales");
            toastRef.current.show("Las constraseñas tienen que ser Iguales")
        }
        else if(size(formData.password) <= 5){
            //console.log("La constaseña debe tener al menos 6 caracteres")
            toastRef.current.show("La contraseña debe tener al menos 6 caracteres")
        }
        else{
            //console.log("Todo Bien");
            setloading(true)
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(response => {
                setloading(false)
                navigation.navigate("account");
            })
            .catch(err => {
                setloading(false)
                toastRef.current.show("El email ya esta en uso" + err)
                console.log(err)

            })

        }
        // console.log(formData);
        // console.log(validationEmail(formData.email))
        // console.log(size(formData.password));
    }

    const onChange = (e, type) =>{
        setformData({...formData, [type] : e.nativeEvent.text})
    }

    return(<View style={styles.formContainer}>
        <Input
            placeholder="Correo Electronico"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, "email")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}/>
            }/>
        <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            onChange={(e) => onChange(e, "password")}
            secureTextEntry={showPassword ? false : true}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setshowPassword(!showPassword)}/>
            }/>
        <Input
            placeholder="Repetir Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            onChange={(e) => onChange(e, "repeatPassword")}
            secureTextEntry={showPassword2 ? false : true}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword2 ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setshowPassword2(!showPassword2)}/>
            }/>
            <Button
                title="Registrar"
                containerStyle={styles.btnContainerStyles}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}/>
            <Loading
                isVisible={loading}
                text="Creando Cuenta"/>
    </View>)
}

function  defaultValue(){
    return{
        email :"",
        password: "",
        repeatPassword : "",
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    btnContainerStyles:{
        marginTop: 20,
        width:"95%"
    },
    btnRegister: {
        backgroundColor: "#00a680",
    },
    iconRight:{
        color: "#c1c1c1",
    }

})