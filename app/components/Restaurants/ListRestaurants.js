import React from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { size } from "lodash";

export default function ListRestaurant(props){
    const {restaurants} = props
    return(
        <View>
            {size(restaurants) > 0 ? (
                <FlatList
                    data={restaurants}
                    renderItem={(restaurant) => <Restaurant restaurant={restaurant}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (<View style={styles.loaderRestaurants}>
                <ActivityIndicator size="large"/>
                <Text>
                    Cargando Restaurantes
                </Text>
            </View>)}
        </View>
    )
}

function Restaurant(props){
    const {restaurant} = props
    console.log(restaurant);
    const {images, name, description, adrress} = restaurant.item
    imgeRestaurant = images[0]
    const goRestaurant =() =>{
        console.log("Hola Touvhabek");
    }
    return(
        <TouchableOpacity
            onPress={goRestaurant}>
                <View style={styles.viewRestaurant}>
                    <View style={styles.viewRestaurantImage}>
                        <Image
                            resizeMode="cover"
                            PlaceholderContent={<ActivityIndicator color="#fff"/>}
                            source={imgeRestaurant ? {uri: imgeRestaurant} : require("../../../assets/img/no-image.png")}
                            style={styles.imageRestaurant}
                        />
                    </View>
                    <View>
                        <Text style={styles.restaurantName}>{name}</Text>
                        <Text style={styles.restaurantAddress}>{adrress}</Text>
                        <Text style={styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
                    </View>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderRestaurants:{
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewRestaurant:{
        flexDirection: "row",
        margin: 10
    },
    viewRestaurantImage:{
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height:80
    },
    restaurantName:{
        fontWeight: "bold"
    },
    restaurantAddress:{
        paddingTop: 2,
        color: "grey"
    },
    restaurantDescription:{
        paddingTop: 2,
        color: "grey",
        width: 300
    }
})
