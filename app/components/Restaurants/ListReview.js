import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar, Rating } from 'react-native-elements'
import {firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import {map} from "lodash"
const db = firebase.firestore(firebaseApp)

export default function ListReview(props) {
    const {idRestaurant, navigation} = props
    const [userLoged, setUserLoged] = useState(false)
    const [reviews, setReviews] = useState([])
    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLoged(true) : setUserLoged(false)
    })

    useEffect(() => {
        db.collection("review").where("idRestaurant", "==", idRestaurant)
        .get().then(response =>{
            const resultReview =[]
            response.forEach((doc)=>{
                const data = doc.data()
                data.id=doc.id
                resultReview.push(data)
            })
            setReviews(resultReview)
        })
    }, [])
    return (
        <View>
            {userLoged ? (
                <Button
                    title="Escribe una Opinion"
                    buttonStyle={styles.btnAddReivew}
                    titleStyle={styles.btnTitleAddReview}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color:"#00a680"
                    }}
                    onPress={()=> navigation.navigate("add-review-restaurant", {idRestaurant: idRestaurant})}
                />
            ) : (
                    <View>
                        <Text
                            style={{textAlign: "center", color: "#00a680", padding: 20}}
                            onPress={()=> navigation.navigate("login")}>
                                Para escribir un comentario esn cesario estar logueado {"   "}
                                <Text style={{fontWeight: "bold"}}>
                                    Pulsa AQUI para iniciar sesión
                                </Text>
                        </Text>

                    </View>
                )
            }
            {map(reviews, (review, index)=>(
                <Review
                    key={index}
                    review={review}
                />
            ))}
        </View>
    )
}

function Review(props){
    const {title, review, rating, createAt, avatarUser} = props.review
    const createReview = new Date(createAt.seconds * 1000)
    return(
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? {uri: avatarUser} : require("../../../assets/img/avatar-default.jpg")}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.reviewData}>
                    {createReview.getDate()}/{createReview.getMonth() + 1}/{createReview.getFullYear()}
                    - {createReview.getHours()}:{createReview.getMinutes()}
                </Text>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    btnAddReivew:{
        backgroundColor: "transparent",
    },
    btnTitleAddReview:{
        color: "#00a680"
    },
    viewReview:{
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewImageAvatar:{
        marginRight: 15
    },
    imageAvatarUser:{
        width: 50,
        height: 50
    }, viewInfo:{
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle:{
        fontWeight: "bold"
    },
    reviewText:{
        paddingTop: 2,
        color:"grey",
        marginBottom: 5
    },
    reviewData:{
        marginTop: 5,
        color:"grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0

    }

})
