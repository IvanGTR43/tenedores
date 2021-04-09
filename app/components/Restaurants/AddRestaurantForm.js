import React, {useEffect, useState} from 'react'
import { StyleSheet, View,Text, ScrollView, Alert, Dimensions} from 'react-native'
import { Icon, Avatar, Image, Button, Input } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from "expo-image-picker"
import { map, size, filter } from 'lodash'
import * as Location from "expo-location"
import Modal from "../Modal"

const widthScreen = Dimensions.get("window").width
export default function AddRestaurantForm(props){
    const {toastRef, setIsLoading, navigation} = props

    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")
    const [imageSelected, setImageSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)

    const addRestaurant= () =>{
        console.log("Boton De subir");
    }
    return(
    <ScrollView
        style={styles.scrollView}>
            <ImageRestaurant
            imagenRestaurant={imageSelected[0]}/>
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}/>
            <UploadImage
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}/>
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
                loading={true}/>
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}/>
    </ScrollView>)
}

function ImageRestaurant(props){
    const {imagenRestaurant} = props
    return(
        <View style={styles.viewPhoto}>
            <Image
                source={imagenRestaurant ? {uri: imagenRestaurant } : require("../../../assets/img/no-image.png")}
                style={{width: widthScreen, height: 200}}
                />
        </View>
    )
}

function FormAdd(props){
    const {setRestaurantName, setRestaurantDescription, setRestaurantAddress, setIsVisibleMap} = props
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
                onChange={(e => setRestaurantAddress(e.nativeEvent.text))}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}/>
            <Input
                placeholder="Descricion del Restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e => setRestaurantDescription(e.nativeEvent.text))}/>
        </View>
    )
}

function Map(props){
    const {isVisibleMap, setIsVisibleMap} = props
    const [location, setLocation] = useState(null)
    useEffect(() => {
        ( async ()=>{
            const resultPermissions =await Permissions.askAsync(Permissions.LOCATION)
            const statusPermissions = resultPermissions.permissions.location.status
            if(statusPermissions !== "granted"){
                toastRef.current.show("Tienes que Acepta los permisos de localización", 3000)
            }
            else{
                const loc = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])
    return(
        <Modal
            isVisible={isVisibleMap}
            setIsVisible={setIsVisibleMap}
            >
            <Text>
                Modal del Mapa
            </Text>
        </Modal>
    )
}

function UploadImage(props){
    const {toastRef, setImageSelected, imageSelected} = props

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)

        if(resultPermissions === "denied"){
            toastRef.current.show("Es necesario Aceptar los permisos de la galeria, si los has rechazado los puedes cambiar en ajustes", 3000)
        }
        else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            })
            console.log(result);
            if(result.cancelled){
                toastRef.current.show("No has Seleccionado Ninguna Imagen", 2000)
            }
            else{
                setImageSelected([...imageSelected, result.uri])
                console.log(imageSelected);
            }
        }
    }

    const  removeImage =(image) => {
        Alert.alert(
            "Eliminar Imagen",
            "Estas seguro de eliminar la Imagen",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImageSelected(filter(imageSelected, (imageUrl) => imageUrl !== image))
                    }
                }
            ],
            {cancelable: false}
        )
    }
    return(
        <View style={styles.viewImage}>
            {size(imageSelected) < 5 && (
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
            )}
            {map(imageSelected, (imageRestaurant, index) => (
            <Avatar
                key={index}
                style={styles.miniatureStyles}
                source={{uri: imageRestaurant}}
                onPress={() => removeImage(imageRestaurant)}
            />
            ))}
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
    },
    miniatureStyles:{
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})
