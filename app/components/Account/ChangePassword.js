import React,{useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { onChange } from 'react-native-reanimated'
import { size } from "lodash"

export default function ChangePassword(props) {
    const {setShowModal, toastRef, setReloadUserInfo} = props
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultValue())
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    const onSubmit = () => {
        setIsLoading(true)
        setError({})
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorTemp ={
                password: !formData.password ? "La Contraseña no puede estar Vacia": "",
                newPassword: !formData.newPassword ? "La Contraseña no puede estar Vacia" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La Contraseña no puede estar Vacia": ""
            }
        }
        else if(formData.newPassword !== formData.repeatNewPassword){
            console.log("diferentes");
            errorTemp={
                newPassword:  "Las Contraseñas no son Iguales",
                repeatNewPassword: "Las Contraseñas no son Iguales"
            }
        }
        else if(size(formData.newPassword < 6)){
            console.log(6);
            errorTemp={
                newPassword: "La Contraseña debe tener que ser mayor a 5 caracter",
                repeatNewPassword: "La Contraseña debe tener que ser mayor a 5 caracter"
            }
        }
        else{
            console.log("OK°°°");
        }
        setError(errorTemp)
        setIsLoading(false)
    }
    return(<View style={styles.view}>
            <Input
                placeholder="Contraseña Actual"
                containerStyle={styles.btnContainer}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e ) => onChange(e, "password")}
                errorMessage={error.password}/>
            <Input
                placeholder="Nueva Contraseña"
                containerStyle={styles.btnContainer}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e ) => onChange(e, "newPassword")}
                errorMessage={error.newPassword}/>
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.btnContainer}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e ) => onChange(e, "repeatNewPassword")}
                errorMessage={error.repeatNewPassword}/>
            <Button
                title="Cambiar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={isLoading}
                onPress={onSubmit}/>
            <Text>Passord</Text>
        </View>)
}
function defaultValue(){
    return{
        password: "",
        newPassword: "",
        repeatNewPassword: ""
    }
}
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
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
