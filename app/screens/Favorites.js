import React, {useState, useEffect, useRef, useCallback} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert} from "react-native"
import { Image, Icon, Button } from 'react-native-elements'
import {useFocusEffect} from "@react-navigation/native"
import Toast from "react-native-easy-toast"

import {firebaseApp} from "../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import Loading from "../components/Loading"

const db = firebase.firestore(firebaseApp)

export default function Favorites(props){
    const {navigation} = props
    const [restaurants, setRestaurants] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [realoadData, setRealoadData] = useState(false)
    const toastRef = useRef()

    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(()=>{
            if(userLogged){
                const idUser = firebase.auth().currentUser.uid
                db.collection("favorites").where("idUser", "==", idUser)
                .get().then((response)=>{
                    const idRestaurantArray = []
                    response.forEach((doc) => {
                        idRestaurantArray.push(doc.data().idRestaurant)
                    });
                    getDataRestaurant(idRestaurantArray).then((response)=>{
                        const restaurants = []
                        response.forEach((doc)=>{
                            const restaurant = doc.data()
                            restaurant.id = doc.id
                            restaurants.push(restaurant)
                        })
                        setRestaurants(restaurants)
                    })
                })

            }
            setRealoadData(false)
        },[userLogged, realoadData])
    )

    const getDataRestaurant = (idRestaurantArray) => {
        const arrayRestaurant = []
        idRestaurantArray.forEach((idRestaurant)=>{
            const result = db.collection("restaurants").doc(idRestaurant).get()
            arrayRestaurant.push(result)
        })
        return Promise.all(arrayRestaurant)
    }

    if(!userLogged){
        return(<UseNoLogged navigation={navigation}/>)
    }

    if(restaurants?.length === 0){
        return(<NotFoundRestaurants/>)
    }

    return(
        <View style={styles.viewBody}>
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem={(restaurant) => (
                        <Restaurant
                            restaurant={restaurant}
                            setIsLoading={setIsLoading}
                            setRealoadData={setRealoadData}
                            toastRef={toastRef}
                            navigation={navigation}
                        />
                    )
                    }
                    keyExtractor={(item, index)=> index.toString()}
                />) : (
                    <View style={styles.loaderRestaurant}>
                        <ActivityIndicator size="large" color="#00a680"/>
                        <Text
                            style={{textAlign: "center", color: "black"}}>
                                Cargando Restaurantes
                        </Text>
                    </View>)
            }
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
            <Loading
                text="Eliminando Restaurantes"
                isVisible={isLoading}
            />
        </View>
    )
}

function Restaurant(props){
    const {restaurant, setRealoadData, toastRef, setIsLoading, navigation} = props
    const {id, name, images} = restaurant.item



    const confirmRemoveFavorites = () =>{
        Alert.alert(
            "Eliminar Restaurante de Favoritos",
            "¿Estas seguro que quieres quitar de Favoritos?",
            [{
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress:removeFavorites,
            }],
            { cancelable: false }
        )
    }
    const removeFavorites =() => {
        setIsLoading(true);
        db.collection("favorites")
            .where("idRestaurant", "==", id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach((doc) => {
                    const idFavorite = doc.id;
                    db.collection("favorites")
                    .doc(idFavorite)
                    .delete()
                    .then(() => {
                        setIsLoading(false);
                        setRealoadData(true);
                        toastRef.current.show("Restaurante eliminado correctamente");
                    })
                    .catch(() => {
                        setIsLoading(false);
                        toastRef.current.show("Error al eliminar el restaurante");
                    })
                });
            });
    }

    //return del componente Restaurants
    return(
        <View style={styles.restaurant}>
            <TouchableOpacity
                onPress={()=> navigation.navigate("restaurants",{screen: "restaurant", params: {id}} )}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={images[0] ? {uri: images[0]} : require("../../assets/img/no-image.png")}
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>{name}</Text>
                        <Icon
                            type="material-community"
                            name="heart"
                            color="#f00"
                            containerStyle={styles.favorites}
                            onPress={ ()=> confirmRemoveFavorites() }
                        />
                    </View>
            </TouchableOpacity>
        </View>
    )
}

function NotFoundRestaurants(){
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                No tienes resturantes en tu lista
            </Text>
        </View>
)
}

function UseNoLogged(props){
const {navigation} = props

return(
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Icon
            type="material-community"
            name="alert-outline"
            size={50}
        />
        <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center"}}>
            Necesitas estar Logueado para Ver esta Sección
        </Text>
        <Button
            title="Ir al Login"
            containerStyle={{marginTop: 20, width: "80%"}}
            buttonStyle={{backgroundColor: "#00a680",}}
            onPress={()=>navigation.navigate("account", {screen: "login"})}
        />
    </View>
)
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    loaderRestaurant:{
        marginTop: 10,
        marginBottom: 10
    },
    restaurant:{
        margin: 10
    },
    image:{
        width:"100%",
        height: 180
    },
    info:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff"

    }, name:{
        fontWeight: "bold",fontSize: 30
    },
    favorites:{
        marginTop: -35,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 200
    }
})