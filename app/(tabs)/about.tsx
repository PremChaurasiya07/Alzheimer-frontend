import { StyleSheet, Image, Platform, Pressable ,View} from 'react-native';
import { useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [memeno,setmemno]=useState(0);
  const member=['🧑‍💻 Prem chaurasiya','🧑‍💻 Mohit dhage','🧑‍💻 Raj chorghe','🧑‍💻 vikas chavan']
  function cal_mem(){
    let temp=member[0]
    for (let i=0;i<3;i++){
      
      member[i]=member[i+1]
    }
    member[3]=temp
    console.log(member[0])
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/page2.png')}
          style={styles.headerImage} // Updated style for proper placement
          resizeMode="contain" // Ensures the image scales properly
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle" style={{fontSize:16,lineHeight:22}}>🧠 Our AI-powered Alzheimer’s Prediction App is designed to help individuals and caregivers detect early signs of cognitive decline. Using advanced machine learning algorithms, we analyze behavioral patterns, cognitive tests, and medical data to assess the risk of Alzheimer’s and provide actionable insights.</ThemedText>
      </ThemedView>
      
      <Collapsible title="⏳Why Early Detection Matters?">
        <ThemedText>
        Early diagnosis allows for timely intervention, better treatment options, and improved quality of life. Our app empowers users to take control of their brain health with:{' '} 
       </ThemedText>
       <ThemedText>✅ AI-driven risk assessment</ThemedText>
        <ThemedText>✅ Easy-to-use cognitive screening tests</ThemedText>
        <ThemedText>✅ Personalized health recommendations</ThemedText>
        <ThemedText>✅ Secure and confidential data processing</ThemedText>
      </Collapsible>
      <Collapsible title="🚀 How It Works?">
        <ThemedText>
        1️⃣ Mri prediction– predicts the Alzheimer's on basis of brain mri.
        </ThemedText>
        <ThemedText>
        2️⃣ Medical records – predicts the Alzheimer's on basis of medical records.
        </ThemedText>
        <ThemedText>
        3️⃣ Personalized Report – Understand your cognitive health and next steps
        </ThemedText>
      </Collapsible>
      <Pressable onPress={()=>cal_mem()}>
        <View>
      <Collapsible title="🤖 Team Members" >
        
          {
            member.map((data)=>(
              <ThemedText key={data}>
                {data}

              </ThemedText>
            ))
          }
        
      </Collapsible>
      </View>
      </Pressable>
          <ThemedView>
            <ThemedText type='title' style={{fontSize:18,marginTop:20}}>💙 Your Brain Health, Our Mission</ThemedText>
            <ThemedText type='subtitle' style={{fontSize:16,marginTop:8}}>We believe that prevention starts with awareness. Our goal is to make Alzheimer’s prediction accessible to everyone, enabling early action for a healthier future.</ThemedText>
          </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%', // Ensure the image spans the full width of the screen
    height: 261, // Adjust the height as needed
    resizeMode: 'contain', // Ensure the image scales properly
    margin: 0, // Remove any default margins
    padding: 0, // Remove any default padding
    position: 'relative', // Ensure proper positioning
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
