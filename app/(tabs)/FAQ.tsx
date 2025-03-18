import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {View,Text,Image,StyleSheet} from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import {  TouchableRipple,Divider } from 'react-native-paper';
export default function  FAQ () {
  return (
    <ParallaxScrollView 
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.reactLogo}
            />
          }>
    
   
    <ThemedText type='title' style={{fontSize:20}}>Frequently Asked Questions (FAQ) 🧠💡</ThemedText>
    <ThemedView style={{gap:10}}>
     
      <Collapsible title='How does this app predict Alzheimer’s?' >
      <ThemedText>Our app uses two AI-powered models to assess the risk of Alzheimer’s:</ThemedText>
      <ThemedText>1️⃣ Text-Based Model – Takes medical inputs (e.g., symptoms, cognitive test results) and provides a prediction.</ThemedText>
      <ThemedText>2️⃣ MRI-Based Model – Analyzes brain MRI scans using AI to detect structural changes linked to Alzheimer’s.</ThemedText>
      </Collapsible>
      <Divider />
      <Collapsible title='Which model should I use?'>
      <ThemedText>If you have a brain MRI scan, use the MRI-based model for a more detailed analysis.</ThemedText>
      <ThemedText>If you don’t have an MRI, use the text-based model by entering medical details for an initial assessment.</ThemedText>
      </Collapsible>
      <Divider />
      <Collapsible title='What type of MRI scans does the app support?'>
      <ThemedText>The app supports standard brain MRI scans (T1, T2, FLAIR, etc.) in common formats like JPEG, PNG, and JPG</ThemedText>
      </Collapsible>
      <Divider />
      <Collapsible title='Is my medical data secure?'>
      <ThemedText>Yes! 🔒 All medical inputs and MRI scans are encrypted and stored securely. We do not share your data without consent.</ThemedText>
      </Collapsible>
      <Divider />
      <Collapsible title='What should I do if my prediction shows high risk?'>
      <ThemedText>If your results indicate a higher risk, we recommend:</ThemedText>
      <ThemedText>✅ Consulting a neurologist for further evaluation.</ThemedText>
      <ThemedText>✅ Taking additional medical tests if needed.</ThemedText>
      <ThemedText>✅ Adopting a brain-healthy lifestyle (exercise, diet, mental stimulation).</ThemedText>
      </Collapsible>
      <Divider />
      <Collapsible title='Is the app free to use?'>
      <ThemedText>Yes it is free</ThemedText>
      </Collapsible>
      <Divider />
    </ThemedView>
   
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

