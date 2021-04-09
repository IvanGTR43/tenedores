import React, {useState, useRef} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Toast from "react-native-easy-toast"
import Loading from "../../components/Loading"
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm"


export default function AddRestaurant(props){
    const {navigation} = props
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    return(
        <View>
            <AddRestaurantForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}/>
            <Text>AddRestaurant</Text>
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}/>
            <Loading
                isVisible={isLoading}
                text="Creando Restaurante"/>
        </View>
    )
}

const styles = StyleSheet.create({

})
