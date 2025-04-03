import { Image, StyleSheet, Platform,View,Text } from 'react-native';
import { Redirect, router } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import 'react-native-url-polyfill/auto';


export default function HomeScreen() {
  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/index.png')}
          style={styles.headerImage} // Updated style for proper placement
          resizeMode="cover" // Ensures the image scales properly
        />
      }>
      <ThemedView style={[styles.titleContainer,{paddingTop:16}]} >
        <ThemedText type="title" style={{fontSize:39,paddingTop:5,textAlign:'center'}}> AlzDetect </ThemedText> 
      </ThemedView>
      <ThemedText type="title" style={{fontSize:22,textAlign:'center'}}> Early Detection, Better Future: AI-Powered Alzheimer’s Prediction </ThemedText>

      <ThemedView style={[styles.stepContainer,{paddingTop:40}]}>
        <ThemedText type="defaultSemiBold" style={{paddingTop:5,letterSpacing:1,fontSize:16}}>Get ahead of Alzheimer’s with our cutting-edge AI technology. Early diagnosis means better care, improved quality of life, and peace of mind for you and your loved ones.
        </ThemedText>
      </ThemedView>
     <View style={{display:'flex',alignItems:"center"}} >
    <Button mode='contained' style={{backgroundColor:'blue', borderWidth:0,borderRadius:6,width:150,height:50,marginTop:30,display:"flex",justifyContent:"center",alignItems:"center"}} onPress={()=>router.push('./dashboard')}>
    <Text style={{fontSize:19,fontWeight:600, letterSpacing:1,color:"white",textAlign:"center",verticalAlign:"middle"}}>Start</Text>
  </Button>
      {/* <View style={{backgroundColor:'blue',borderWidth:0,borderRadius:6,width:150,height:50,marginTop:30,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:19,fontWeight:600, letterSpacing:1,position:"relative",color:"white", top:0,textAlign:"center",verticalAlign:"middle"}}>Start</Text>
      </View> */}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    height: 250, // Increased height for better visibility
    width: '100%', // Make the image span the full width
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
