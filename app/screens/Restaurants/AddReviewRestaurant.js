import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Toast from "react-native-easy-toast"
import {firebaseApp} from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import Loading from "../../components/Loading"

const db = firebase.firestore(firebaseApp)

export default function AddReviewRestaurant(props) {
    const {navigation, route} = props
    const  {idRestaurant} = route.params
    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef()

    const addReview =() => {
        if(!rating){
            toastRef.current.show("No has dado ninguna puntuación")
        }else if(!title){
            toastRef.current.show("No has dado ningun titulo a la Opinión")
        }else if(!review){
            toastRef.current.show("El comentario es obligatorio")
        }else{
            setIsLoading(true)
            const user = firebase.auth().currentUser

            const  payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title: title,
                review: review,
                rating: rating,
                createAt: new Date()
            }
            db.collection("review").add(payload).then(()=>{
                updateRestaurant()
            }).catch(()=>{
                setIsLoading(false)
                toastRef.current.show("Error al Enviar la Review")
            })
        }
    }

    const updateRestaurant = () =>{
        const restaurantRef = db.collection("restaurants").doc(idRestaurant)
        restaurantRef.get().then(response=> {
            const restautantData = response.data()
            console.log(restautantData);
            const ratingTotal = restautantData.ratingTotal + rating
            const quantityVoting = restautantData.quantityVoting + 1
            const ratingResult = ratingTotal / quantityVoting

            restaurantRef.update({
                rating: ratingResult,
                ratingTotal,
                quantityVoting
            }).then(()=> {
                setIsLoading(false)
                navigation.goBack()
            }).catch(e =>{
                console.log(e);
            })
        })
    }

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pesimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo"
                    containerStyle={styles.input}
                    onChange={(e)=> setTitle(e.nativeEvent.text)}
                />
                <Input
                    placeholder="Comentario"
                    multiline
                    inputContainerStyle={styles.textArea}
                    onChange={(e) => setReview(e.nativeEvent.text)}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
            <Loading
                isVisible={isLoading}
                text="Enviando Comentarios"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewRating:{
        height: 120,
        backgroundColor: "#f2f2f2"
    },
    formReview:{
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input:{
        marginBottom: 10
    },
    textArea:{
        height: 150,
        width: "100%",
        padding:0,
        margin: 0
    },
    btnContainer:{
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"

    },
    btn:{
        backgroundColor: "#00a680"
    }
})