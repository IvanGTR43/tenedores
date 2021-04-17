import React,{useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, Text} from "react-native"
import { Icon } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";
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
    const [isLoading, setIsLoading] = useState(false)
    const limitRestaurants = 10

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            //console.log(userInfo);
            setUser(userInfo)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            db.collection("restaurants").get().then((snap) =>{
                setTotalRestaurantes(snap.size)
            }).catch((err)=>{
                console.log("No jalo");
            })
            const resultRestaurant = []
            db.collection("restaurants")
                .orderBy("createAt", "desc")
                .limit(limitRestaurants)
                .get()
                .then((response) =>{
                setStartRestaurant(response.docs[response.docs.length -1])
                response.forEach((doc) =>{
                    const restaurant = doc.data()
                    restaurant.id = doc.id
                    resultRestaurant.push(restaurant)
                })
                setRestaurants(resultRestaurant)
            })
        }, [])
    )


    const handleLoadMore=()=>{
        const resultRestaurant=[]
        restaurants.length < totalRestaurantes && setIsLoading(true)
        db.collection("restaurants").orderBy("createAt", "desc").startAfter(startRestaurant.data().createAt)
        .limit(limitRestaurants)
        .get()
        .then(response=>{
            if(response.docs.length > 0){
                setStartRestaurant(response.docs[response.docs.length -1])
            }
            else{
                setIsLoading(false)
            }
            response.forEach((doc)=>{
                const restaurant = doc.data()
                restaurant.id=doc.id
                resultRestaurant.push(restaurant)
            })
            setRestaurants([...restaurants, ...resultRestaurant])
        }).catch(()=> console.log("no llegasn las imagens"))
    }
    return(
        <View
            style={styles.viewBody}>
            <ListRestaurants
                restaurants={restaurants}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}/>
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
