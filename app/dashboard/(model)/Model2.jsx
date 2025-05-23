import React, { useState, useRef } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import { Text, Button, Card, ActivityIndicator } from "react-native-paper";
import LottieView from "lottie-react-native";
import * as ImagePicker from "expo-image-picker"; // Use Expo Image Picker

const ImageUploadForm = () => {
  const [predict, setPredict] = useState(null);
  const [confidence, setConfidence] = useState(null); // Add state for confidence
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseImage, setResponseImage] = useState(null); // Add state for the Base64 image
  const fileInputRef = useRef(null); // For web file input
  const scrollViewRef = useRef(null); // For ScrollView

  // Request permission and pick image
  const pickImage = async () => {
    if (Platform.OS === "web") {
      // Web: Trigger file input
      fileInputRef.current?.click();
    } else {
      // Android: Use expo-image-picker
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Error", "Permission to access media library is required!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });

        if (!result.canceled) {
          const source = { uri: result.assets[0].uri, file: result.assets[0] };
          setSelectedImage(source);
        } else {
          console.log("User cancelled image picker");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to pick image");
        console.error("Image Picker Error:", error);
      }
    }
  };

  // Handle file change (web only)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const source = { uri: URL.createObjectURL(file), file };
      setSelectedImage(source);
    }
  };

  // Upload image to backend
  const uploadImage = async () => {
    if (!selectedImage || !selectedImage.file) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (Platform.OS === "web") {
      formData.append("file", selectedImage.file);
    } else {
      formData.append("file", {
        uri: selectedImage.uri,
        type: "image/jpeg", // Adjust based on actual type if needed
        name: "upload.jpg",
      });
    }

    try {
      const response = await axios.post(
        "https://alzhiemer-backened.onrender.com/predict-mri",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      setPredict(response.data.prediction_num);
      setConfidence(response.data.confidence); // Store the confidence value
      console.log("Response:", response.data);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 500);
    } catch (e) {
      Alert.alert("Error", "An error occurred while uploading the image");
      console.error("Upload Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="always" // Changed to "always" for better tap handling
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Illustration */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../../../assets/animation1.json")}
            autoPlay
            loop
            style={styles.animation}
            resizeMode="cover"
          />
        </View>

        {/* Form */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Image Upload for Prediction</Text>

            {/* Web-specific File Input */}
            {Platform.OS === "web" && (
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            )}

            {/* Image Selection Button */}
            <Button
              mode="outlined"
              style={styles.button}
              onPress={pickImage}
              icon="image"
            >
              {selectedImage ? "Change Image" : "Select Image"}
            </Button>

            {/* Display Selected Image */}
            {selectedImage && (
              <View style={styles.imageContainer}>
                <Card.Cover source={{ uri: selectedImage.uri }} style={styles.image} />
              </View>
            )}

            {/* Submit Button */}
            <Button
              mode="contained"
              style={styles.uploadButton}
              onPress={uploadImage}
              icon="upload"
              disabled={loading || !selectedImage}
            >
              {loading ? "Uploading..." : "Upload & Predict"}
            </Button>

            {/* Prediction Result */}
            {predict !== null && !loading && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Prediction:</Text>
                <Text style={styles.resultValue}>
                  {predict === 0 || predict === 1 || predict === 3
                    ? "Dementia"
                    : predict === 2
                    ? "Non-Dementia"
                    : "No information"}
                </Text>
                <Text style={styles.confidenceText}>
                  Confidence: {confidence ? `${confidence.toFixed(2)}%` : "N/A"}
                </Text>
                <Text style={styles.disclaimer}>
                  * AI-generated prediction. Please consult a medical professional for accurate diagnosis.
                </Text>

                {/* Display Uploaded Image with Overlay Text */}
                {selectedImage && (
                  <View style={styles.responseImageContainer}>
                    <ImageBackground
                      source={{ uri: selectedImage.uri }}
                      style={styles.responseImage}
                    >
                      <View style={styles.overlayTextContainer}>
                        <Text style={styles.overlayText}>
                          {predict === 0 || predict === 1 || predict === 3
                            ? "Dementia"
                            : predict === 2
                            ? "Non-Dementia"
                            : ""}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              </View>
            )}

            {/* Loading Indicator */}
            {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center", // Center content horizontally
    paddingVertical: 20,
  },
  animationContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 150,
    height: 150,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "#fff",
    width: "90%", // Responsive width
    maxWidth: 400, // Cap for larger screens
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#6200ee",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    borderColor: "#6200ee",
  },
  uploadButton: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 5,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
  },
  confidenceText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  disclaimer: {
    marginTop: 10,
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  responseImageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  responseImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  overlayTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    borderRadius: 10,
  },
  overlayText: {
    color: "#fff", // White text color
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loader: {
    marginTop: 20,
  },
  resultImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default ImageUploadForm;