import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { SearchBar, ListItem, Icon } from 'react-native-elements'
import {FireSQL} from "firesql"
import firebase from "firebase/app"

const fireSql = new FireSQL(firebase.firestore(), {includeId: "id"})

export default function Search(props){
    const {navigation} = props
    const [search, setSearch] = useState("")
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        if(search){
            fireSql.query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
            .then((response) =>{
                setRestaurants(response)
            })
        }

    }, [search])


    return(
        <View>
            <SearchBar
                placeholder="Buscar"
                onChangeText={(e)=> setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
                style={{width: 200, height: 200}}
            />
            {restaurants.length === 0 ? (
                <NotFoundRestaurant/>
            ): (
            <FlatList
                data={restaurants}
                renderItem={(restaurant) => <Restaurants restaurant={restaurant} navigation={navigation}/>}
                keyExtractor={(item, index) => index.toString()}
            />)}
        </View>
    )
}
function Restaurants(props){
    const {restaurant, navigation} = props
    const {name, id, images} = restaurant.item
    return(
        <ListItem
            title={name}
            leftAvatar={{source: images[0] ? {uri: images[0]}: require("../../assets/img/no-image.png")}}
            rightIcon={<Icon type="material-community" name="chevron-right"/>}
            onPress={()=> navigation.navigate("restaurants", {screen: "restaurant", params:{id}})}
        />
    )
}

function NotFoundRestaurant(){
    return(
        <View style={{flex: 1, alignItems: "center"}}>
            <Image
                source={require("../../assets/img/no-result-found.png")}
                resizeMode="cover"
            />
        </View>
    )
}
    const styles = StyleSheet.create({
    searchBar:{
        marginBottom: 20
    }
})