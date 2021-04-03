import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions} from 'react-native'
import { Icon, Avatar, Image, Button, Input } from 'react-native-elements'
import { useSafeArea } from 'react-native-safe-area-context'

export default function AddRestaurantForm(props){
    const {toastRef, setIsLoading, navigation} = {}
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")
    const addRestaurant= () =>{
        console.log("ok");
        console.log(restaurantName);
        console.log(restaurantAddress);
        console.log(restaurantDescription);
    }
    return(
    <ScrollView
        style={styles.scrollView}>
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}/>
            <UploadImage/>
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}/>
    </ScrollView>)
}
function FormAdd(props){
    const {setRestaurantName, setRestaurantDescription, setRestaurantAddress} = props
    return(
        <View
            style={styles.viewForm}>
            <Input
                placeholder="Nombre del Restaurante"
                containerStyle={styles.inputForm}
                onChange={(e => setRestaurantName(e.nativeEvent.text))}/>
            <Input
                placeholder="Direccion"
                containerStyle={styles.inputForm}
                onChange={(e => setRestaurantAddress(e.nativeEvent.text))}/>
            <Input
                placeholder="Descricion del Restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e => setRestaurantDescription(e.nativeEvent.text))}/>
        </View>
    )
}

function UploadImage(){
    const imageSelect = () =>{
        console.log("imagens");
    }
    return(
        <View style={styles.viewImage}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}/>
        </View>
    )
}
const styles = StyleSheet.create({
    scrollView:{
        height: "100%"
    },
    viewForm:{
        marginLeft: 10,
        marginRight: 10
    },
    inputForm:{
        marginBottom: 10
    },
    textArea:{
        height: 100,
        width:"100%",
        padding: 0,
        margin: 0
    },
    btnAddRestaurant:{
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImage:{
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor:"#e3e3e3"
    }
})
