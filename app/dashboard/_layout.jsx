import { useEffect } from "react";
import { Redirect, Slot, Stack } from "expo-router";

import { Text } from "react-native";
export default function DashboardLayout() {
 

  return (
    <Stack screenOptions={{headerShown:true,title:'',headerStyle:{ height: 20,}}}>
      <Slot/>
    {/* <Stack.Screen name="(model)" options={{headerShown:false}} /> */}
     </Stack>
    
  )
}
