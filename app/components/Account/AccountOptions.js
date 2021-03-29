import React, {useState} from 'react'
import {View,  StyleSheet} from "react-native"
import {ListItem} from "react-native-elements"
import {map} from "lodash"

import Modal from "../Modal"
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm"
import ChangeEmailForm from "../Account/ChangeEmailForm"
import ChangePassword from "../Account/ChangePassword"

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props

    const [showModal, setshowModal] = useState(false)
    const [renderCOmponent, setRenderCOmponent] = useState(null)

    const selecetComponent = (key) =>{
        switch(key){
            case "displayName" : setRenderCOmponent(
                <ChangeDisplayNameForm
                    displayName={userInfo.displayName}
                    setShowModal={setshowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}/>)
            setshowModal(true)

            break
            case "email" : setRenderCOmponent(
                <ChangeEmailForm
                    email={userInfo.email}
                    setShowModal={setshowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}/>)
            setshowModal(true)
            break
            case "password" : setRenderCOmponent(
            <ChangePassword
                password={userInfo.password}
                setShowModal={setshowModal}
                toastRef={toastRef}
                />)
            setshowModal(true)
            break
            default: setRenderCOmponent(null)
            break
        }
    }

    const menuOption = generteOptions(selecetComponent)

    return(<View>
        {map(menuOption, (menu, index) => (
            <ListItem
            key={index}
            title={menu.title}
            leftIcon={{
                type: menu.iconType,
                name: menu.iconNameLeft,
                color: menu.iconCOlorLeft
            }
            }
            rightIcon={{
                type: menu.type,
                name: menu.iconNameRight,
                color: menu.iconCOlorRight
            }}
            containerStyle={styles.menuItem}
            onPress={menu.onPress}/>
        ))}
        {renderCOmponent && (
            <Modal
                isVisible={showModal}
                setIsVisible={setshowModal}>
                {renderCOmponent}
            </Modal>
        )}

        </View>
    )
}

function generteOptions(selectedComponent){
    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconCOlorLeft: "#ccc",
            iconNameRight:"chevron-right",
            iconCOlorRight: "#ccc",
            onPress: () => selectedComponent("displayName")
        },
        {
            title:"Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconCOlorLeft: "#ccc",
            iconNameRight:"chevron-right",
            iconCOlorRight: "#ccc",
            onPress: () => selectedComponent("email")
        },
        {
            title:"Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconCOlorLeft: "#ccc",
            iconNameRight:"chevron-right",
            iconCOlorRight: "#ccc",
            onPress: () => selectedComponent("password")
        }
    ]
}
const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor:"#e3e3e3"
    }
})
