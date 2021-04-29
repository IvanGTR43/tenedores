import React,{useState, useEffect, useCallback, useRef} from 'react'
import { View, StyleSheet } from 'react-native'
import Toast from "react-native-easy-toast"

import {firebaseApp} from "../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import ListTopRestaurant from "../components/Rank/ListTopRestaurant"
const db = firebase.firestore(firebaseApp)

export default function TopRestaurants(props){
    const {navigation} = props
    const [restaurants, setRestaurants] = useState([])
    console.log(restaurants);
    const toastRef = useRef()
    useEffect(() => {
        db.collection("restaurants")
            .orderBy("rating", "desc")
            .limit(5)
            .get()
            .then((response)=>{
                const restaurantArray = []
                response.forEach((doc)=>{
                    const data = doc.data()
                    data.id = doc.id
                    restaurantArray.push(data)

                })
                setRestaurants(restaurantArray)
            })
            .catch((e)=>{
                console.log(e);
            })
    }, [])

    return(
    <View>
        <ListTopRestaurant
            restaurants={restaurants}
            navigation={navigation}
        />
        <Toast position="center" opacity={0.9} ref={toastRef}/>
    </View>
    )
}