import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import TopRestaurant from "../screens/TopRestaurant"

const Stack = createStackNavigator()

export default function TopResStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="topres"
                component={TopRestaurant}
                options={{title: "Mejores Restaurantes"}}/>
        </Stack.Navigator>
    )
}