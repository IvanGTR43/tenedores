import React, {useState} from 'react'
import {StyleSheet ,View, Text } from "react-native"
import { Input, Icon, Button } from 'react-native-elements'
import { onChange } from 'react-native-reanimated'

export default (RegisterForm) => {

    const [showPassword, setshowPassword] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)
    const [formData, setformData] = useState(defaultValue())

    const onSubmit = () => {
        console.log(formData);
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