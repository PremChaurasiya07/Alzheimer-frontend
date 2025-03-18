import React, { useState, useRef } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, TextInput, Button, Card, ActivityIndicator } from "react-native-paper";
import LottieView from "lottie-react-native";

const UserForm = () => {
  const [predict, setPredict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    "M/F": "",
    Hand: "",
    Age: "",
    EDUC: "",
    SES: "",
    MMSE: "",
    CDR: "",
    eTIV: "",
    nWBV: "",
    ASF: "",
  });
  const [errors, setErrors] = useState({});

  const scrollViewRef = useRef(null);

  // Validation functions
  const validateGender = (value) => {
    const validValues = ["M", "Male", "male", "F", "Female", "female"];
    return validValues.includes(value) ? "" : "Enter M, Male, F, or Female";
  };

  const validateHand = (value) => {
    const validValues = ["R", "Right", "right", "L", "Left", "left"];
    return validValues.includes(value) ? "" : "Enter R, Right, L, or Left";
  };

  const validateNumeric = (value, fieldName) => {
    if (!value.trim()) return `${fieldName} is required`;
    const num = Number(value);
    return !isNaN(num) && value.match(/^-?\d*\.?\d+$/)
      ? ""
      : `${fieldName} must be a number (integer or float)`;
  };

  const handleChange = (key, value) => {
    let error = "";
    if (key === "M/F") {
      error = validateGender(value);
    } else if (key === "Hand") {
      error = validateHand(value);
    } else {
      error = validateNumeric(value, key);
    }

    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: error });
  };

  const modelfetch = async () => {
    console.log("Form Data:", formData);

    const hasEmptyFields = Object.values(formData).some((value) => !value.trim());
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasEmptyFields || hasErrors) {
      Alert.alert("Error", "Please correct all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://alzhiemer-backened.onrender.com/predict",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setPredict(response.data.prediction[0]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 500);
    } catch (e) {
      console.error("API Error:", e);
      Alert.alert("Error", "An error occurred while fetching the data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "android" ? 50 : 0}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (Platform.OS !== "web") Keyboard.dismiss();
        }}
        accessible={false}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
        
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../../../assets/animation.json")}
              autoPlay
              loop
              style={styles.animation}
              resizeMode="cover"
            />
          </View>

       
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>User Information</Text>

              {[
                { key: "M/F", label: "Gender (M/F)", icon: "gender-male-female" },
                { key: "Hand", label: "Dominant Hand (R/L)", icon: "hand" },
                { key: "Age", label: "Age", icon: "calendar", keyboardType: "numeric" },
                { key: "EDUC", label: "Education (Years)", icon: "book", keyboardType: "numeric" },
                { key: "SES", label: "SES", icon: "account-group", keyboardType: "numeric" },
                { key: "MMSE", label: "MMSE Score", icon: "brain", keyboardType: "numeric" },
                { key: "CDR", label: "CDR Score", icon: "chart-line", keyboardType: "numeric" },
                { key: "eTIV", label: "Estimated Total Intracranial Volume", icon: "database", keyboardType: "numeric" },
                { key: "nWBV", label: "Normalized Whole Brain Volume", icon: "chart-pie", keyboardType: "numeric" },
                { key: "ASF", label: "ASF", icon: "scale-balance", keyboardType: "numeric" },
              ].map((field) => (
                <View key={field.key}>
                  <TextInput
                    label={field.label}
                    mode="outlined"
                    left={<TextInput.Icon icon={field.icon} color="#6200ee" />}
                    keyboardType={field.keyboardType || "default"}
                    style={styles.input}
                    value={formData[field.key]}
                    onChangeText={(text) => handleChange(field.key, text)}
                    error={!!errors[field.key]}
                    placeholder={
                      field.key === "M/F"
                        ? "e.g., M or F"
                        : field.key === "Hand"
                        ? "e.g., R or L"
                        : "e.g., 42"
                    }
                    autoCapitalize="none"
                    accessible={true}
                    theme={{ colors: { primary: "#6200ee", error: "#d32f2f" } }}
                    {...(Platform.OS === "web" && { cursor: "text" })}
                  />
                  {errors[field.key] && (
                    <Text style={styles.errorText}>{errors[field.key]}</Text>
                  )}
                </View>
              ))}

             
              <Button
                mode="contained"
                style={styles.submitButton}
                onPress={modelfetch}
                icon="check-circle"
                disabled={loading}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>

             
              {predict !== null && !loading && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>Prediction</Text>
                  <Text
                    style={[
                      styles.resultValue,
                      { color: predict === 1 ? "#d32f2f" : "#388e3c" }, // Dynamic color
                    ]}
                  >
                    {predict === 1 ? "Dementia" : "Non-Dementia"}
                  </Text>
                  <Text style={styles.disclaimer}>
                    * AI-generated prediction. Consult a medical professional for an accurate diagnosis.
                  </Text>
                </View>
              )}

              {/* Loading Indicator */}
              {loading && (
                <ActivityIndicator animating={true} size="large" color="#6200ee" style={styles.loader} />
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  animationContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  animation: {
    width: 180,
    height: 180,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 24,
    color: "#6200ee",
    letterSpacing: 0.5,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 8,
    fontStyle: "italic",
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#6200ee",
    paddingVertical: 6,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  resultValue: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
  loader: {
    marginTop: 24,
  },
});

export default UserForm;