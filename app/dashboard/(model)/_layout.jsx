import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tabs } from 'expo-router'
import { NavigationContainer } from "@react-navigation/native";
import Model1 from './Model1';
import Model2 from './Model2';

const _layout = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
  //  <Tabs screenOptions={{headerShown:false}}>
  //   <Tabs.Screen name='Model1'/>
  //   <Tabs.Screen name='Model2'/>
  //  </Tabs>
  
    <Tab.Navigator screenOptions={{tabBarStyle:{height:40}}}>
    <Tab.Screen name='Model1' component={Model1} />
    <Tab.Screen name='Model2' component={Model2}/>
    </Tab.Navigator>
   
  )
}

export default _layout