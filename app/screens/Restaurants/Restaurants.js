import React,{useState, useEffect} from 'react'
import {StyleSheet, View, Text} from "react-native"
import { Icon } from 'react-native-elements'
import {firebaseApp} from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(firebaseApp)

export default function Restaurants(props){
    const {navigation} = props
    const [user, setUser] = useState(user)
    const [restaurants, setRestaurants] = useState({})
    const [totalRestaurantes, setTotalRestaurantes] = useState(0)
    const [startRestaurant, setStartRestaurant] = useState(null)
    const limitRestaurants = 10
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            //console.log(userInfo);
            setUser(userInfo)
        })
    }, [])
    useEffect(() => {
        db.collection("restaurants").get().then((snap) =>{
            setTotalRestaurantes(snap.size)
        }).catch((err)=>{
            console.log("No jalo");
        })
        const resultRestaurant = []
        db.collection("restaurants").orderBy("createAt", "desc").limit(limitRestaurants).get().then((response) =>{
            setStartRestaurant(response.docs[response.docs.length -1])
            response.forEach((doc) =>{
                const restaurant = doc.data()
                restaurant.id = doc.id
                resultRestaurant.push(restaurant)
            })
            setRestaurants(resultRestaurant)
        })
    }, [])
    return(
        <View
            style={styles.viewBody}>
            <ListRestaurants
                restaurants={restaurants}/>
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
