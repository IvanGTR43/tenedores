import React,{useEffect, useState} from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { Card, Image, Icon, Rating } from 'react-native-elements'

export default function ListTopRestaurant(props){
    const {restaurants, navigation} =props


    return(
        <FlatList
            data={restaurants}
            renderItem={(restaurant)=> <Restaurants restaurant={restaurant} navigation={navigation}/>}
            keyExtractor={ (item, index)=> index.toString()}
        />
    )
}

function Restaurants({restaurant, navigation}){
    const {name, rating, images, description, id} = restaurant.item
    const [iconColor, setIconColor] = useState("#000")

    useEffect(() => {
        if(restaurant.index === 0){
            setIconColor("#efb819")
        }else if(restaurant.index === 1){
            setIconColor("#e3e4e5")
        }else if(restaurant.index === 2){
            setIconColor("#cd7f32")
        }
    }, [])

    return(
        <TouchableOpacity onPress={()=> navigation.navigate("restaurants", {screen: "restaurant", params:{id}})}>
            <Card
                containerStyle={styles.containerCard}>
                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}
                />
                <Image
                    style={styles.restaurantImage}
                    resizeMode="cover"
                    source={ images[0] ? {uri: images[0]} : require("../../../assets/img/no-image.png")}
                />
                <View style={styles.titleRating}>
                    <Text style={styles.title}>{name}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating}
                        readonly
                    />
                </View>
                <Text style={styles.description}>{description}</Text>
            </Card>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    containerCard:{
        marginBottom: 30,
        borderWidth: 0
    },
    containerIcon:{
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1
    },
    restaurantImage:{
        width: "100%",
        height: 200
    },
    titleRating:{
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },
    title:{
        fontSize: 20,
        fontWeight: "bold"
    },
    description:{
        color: "grey",
        marginTop: 0,
        textAlign: "justify"
    }
})