import React, {useState, useRef, useCallback, useEffect} from 'react'
import { StyleSheet, ScrollView, View, Dimensions, Text } from 'react-native'
import { Rating, ListItem, Icon } from 'react-native-elements'
import { map } from "lodash"
import {useFocusEffect} from "@react-navigation/native"
import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import Toast from "react-native-easy-toast"
import Loading from "../../components/Loading"
import CarouselImages from "../../components/CarouselImages"
import Map from "../../components/Map"
import ListReview from "../../components/Restaurants/ListReview"

const db = firebase.firestore(firebaseApp)
const screen = Dimensions.get("window").width

export default function Restaurant(props) {
    const {navigation, route} = props
    const {id, name} = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [rating, setRating] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const toastRef = useRef()

    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({title: name})
            db.collection("restaurants").doc(id).get().then((response)=>{
                const data = response.data()
                data.id = response.id
                setRestaurant(data)
                setRating(data.rating)
            })
        }, [])
    )
    useEffect( ()=>{
        if(userLogged && restaurant){
            db.collection("favorites").where("idRestaurant", "==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get().then((response)=>{
                if(response.docs.length === 1){
                    setIsFavorite(true)
                }
            })
        }
    }, [userLogged, restaurant])

        const addFavorites =()=>{
            if(!userLogged){
                toastRef.current.show("Debes estar logueado para Agregar Favoritos")
            }else{
                const pyload = {
                    idUser: firebase.auth().currentUser.uid,
                    idRestaurant: restaurant.id
                }
                db.collection("favorites").add(pyload).then(()=>{
                    setIsFavorite(true)
                    toastRef.current.show("Restaurate Agregado a Favoritos")
                }).catch(()=>{
                    toastRef.current.show("Erroa al añadirlo a Favoritos")
                })
            }
        }
        const removeFavorites =()=>{
            db.collection("favorites")
            .where("idRestaurant", "==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get().then(response =>{
                response.forEach((doc)=>{
                    const idFavorite = doc.id
                    db.collection("favorites").doc(idFavorite).delete()
                    .then(()=>{
                        setIsFavorite(false)
                        toastRef.current.show("Restaurante Eliminado de Favoritos")
                    }).catch(()=> {
                        toastRef.current.show("Error al quitar el Restaurante de Favoritos")
                    })
                })
            })
        }

    if(!restaurant){
        return(<Loading isVisible={true} text="Cargando..."/>)
    }

    return (
        <ScrollView
            vertical
            style={styles.viewBody}>
            <View style={styles.viewFavorites}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={() => {
                        isFavorite ? removeFavorites() : addFavorites()
                    }}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <CarouselImages
                arrayImages={restaurant.images}
                height={250}
                width={screen}/>
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}/>
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                adrress={restaurant.adrress}
            />
            <ListReview
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
        </ScrollView>
    )
}

function TitleRestaurant(props){
    const {name, description, rating} = props
    return(
    <View style={styles.viewRestaurantTitle}>
        <View style={{flexDirection: "row"}}>
            <Text style={styles.nameRestaurant}>{name}</Text>
            <Rating
                style={styles.rating}
                imageSize={20}
                readonly
                startingValue={parseFloat(rating)}
            />
        </View>
        <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>)
}

function RestaurantInfo(props){
    const {location, name, adrress} = props
    const listInfo=[
        {
            text: adrress,
            iconName: "map-marker",
            iconType: "material-community",
            action: null
        }
    ]
    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>Información sobre el Restaurante</Text>
            <Map
                location={location}
                name={name}
                height={100}
            />
            {map(listInfo, (item, index)=>(
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor:"#fff"
    },
    viewRestaurantTitle:{
        padding:15
    },
    nameRestaurant:{
        fontSize: 20,
        fontWeight: "bold"
    },
    descriptionRestaurant:{
        marginTop: 5,
        color: "grey"
    },
    rating:{
        position: "absolute",
        right: 0
    },
    viewRestaurantInfo:{
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    containerListItem:{
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    viewFavorites:{
        position: "absolute",
        top:0,
        right: 0,
        zIndex: 2,
        backgroundColor: "white",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }
})
