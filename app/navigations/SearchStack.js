import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../screens/Search"

const Stack = createStackNavigator()

export default function SeachStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="seach"
                component={Search}
                options={{title: "Buscar Restaurantes"}}/>
        </Stack.Navigator>
    )
}