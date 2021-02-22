import React from "react"
import { View, Text, Button } from "react-native"
import * as firebase from "firebase"

export default (UserLoged) => {
    return(<View>
        <Text>
            User Loged...
        </Text>
        <Button title="Cerrar Sesión" onPress={() =>{firebase.auth().signOut()} }/>
    </View>)
}
