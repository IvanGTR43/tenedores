import React from 'react'
import {View,  StyleSheet} from "react-native"
import {ListItem} from "react-native-elements"
import {map} from "lodash"


export default function AccountOptions(props){
    const {userInfo, toastRef} = props

    const menuOption = generteOptions()
    return(<View>
        {map(menuOption, (menu, index) => (
            <ListItem
            key={index}
            title={menu.title}/>
        ))}
        </View>
    )
}

function generteOptions(){
    return [
        {
            title: "Cambiar Nombre y Apellidos",
        },
        {
            title:"Cambiar Email"
        },
        {
            title:"Cambiar Contraseña"
        }
    ]
}
const styles = StyleSheet.create({

})
