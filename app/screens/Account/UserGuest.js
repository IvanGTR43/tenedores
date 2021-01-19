import React from 'react'
import { StyleSheet, View, ScrollView, Text } from "react-native";
import {Button, Image} from "react-native-elements"
import { useNavigation } from "@react-navigation/native";
import Login from './Login';
export default (UserGuest) => {
    const navigation= useNavigation()
    return(<ScrollView
            centerContent={true}
            style={styles.viewBody}>
        <Image
            source={require("../../../assets/img/user-guest.jpg")}
            resizeMode="contain"
            style={styles.Image}/>
            <Text style={styles.title}>Consulta tu perfil  de 5 tenedores</Text>
            <Text style={styles.description}>
                ¿Cómo describirias el mejor restaurante? Busca y Vizualiza los mejores
                restaurantes de uns forma sencilla, vota cual te ha gustado mas y comenta
                cual ha sido tu experiencia.
            </Text>
            <View style={styles.view}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu Perfil"
                    onPress={() => navigation.navigate("login")}/>
            </View>
    </ScrollView>)
}
const styles = StyleSheet.create({
    viewBody:{
        marginLeft: 30,
        marginRight: 30,

    },
    Image:{
        height: 300,
        width:"100%",
        marginBottom: 40,
        marginBottom: 40,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description:{
        textAlign: "center",
        marginBottom: 20,
    },
    btnStyle: {
        backgroundColor: "#00a680",
    },
    btnContainer:{
        width: "70%",
    },
    view: {
        flex: 1,
        alignItems: "center",
    }
})