import React,{useState, useEffect} from 'react'
import {StyleSheet, View, Text} from "react-native"
import { Icon } from 'react-native-elements'
import {firebaseApp} from "../../utils/firebase"
import firebase from "firebase/app"

export default function Restaurants(props){
    const {navigation} = props
    const [user, setUser] = useState(user)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            //console.log(userInfo);
            setUser(userInfo)
        })
    }, [])
    return(
        <View
            style={styles.viewBody}>
            <Text>Restaurantes</Text>
            {user && (
                <Icon
                    name="plus"
                    type="material-community"
                    color="#00a680"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={()=> navigation.navigate("add-restaurant")}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        borderColor: "#fff"
    },
    btnContainer:{
        position: "absolute",
        right: 10,
        bottom: 1,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
