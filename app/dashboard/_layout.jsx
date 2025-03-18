import { useEffect } from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "../../context/Authcontext";
import { Text } from "react-native";
export default function DashboardLayout() {
  const { user, loading } = useAuth();
console.log(user)
  if (loading) return null; // Show loading state while checking auth

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
 let Logo=()=>(
 
    <Text style={{color:'white'}}>Hii</Text>
  
 )
  return (
    <Stack screenOptions={{headerShown:true,title:'',headerLeft:()=><Logo/>,headerStyle:{ height: 20,}}}>
      <Slot/>
    {/* <Stack.Screen name="(model)" options={{headerShown:false}} /> */}
     </Stack>
    
  )
}
