import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebase.js";
import { router } from "expo-router";

const LoginScreen = () => {
  
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      console.log("Attempting login with:", {
        email: values.email,
        password: values.password,
      });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password
      );

      console.log("Login successful:", userCredential.user);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Login error:", {
        code: error.code,
        message: error.message,
        details: error,
      });

      let errorMessage = "An error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (Platform.OS !== "web") Keyboard.dismiss();
        }}
        accessible={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
          keyboardVerticalOffset={Platform.OS === "android" ? 50 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            bounces={false} // Prevent bouncing effect
          >
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>Log In</Text>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email")
                      .required("Required"),
                    password: Yup.string()
                      .min(6, "At least 6 characters")
                      .required("Required"),
                  })}
                  onSubmit={handleLogin}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <View>
                      <TextInput
                        label="Email"
                        mode="outlined"
                        left={<TextInput.Icon icon="email" />}
                        style={styles.input}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={touched.email && !!errors.email}
                        textContentType="emailAddress"
                        accessible={true}
                        placeholder="Enter your email"
                        // Remove autoFocus to prevent immediate keyboard popup
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}

                      <TextInput
                        label="Password"
                        mode="outlined"
                        secureTextEntry
                        left={<TextInput.Icon icon="lock" />}
                        style={styles.input}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        autoCapitalize="none"
                        error={touched.password && !!errors.password}
                        textContentType="password"
                        accessible={true}
                        placeholder="Enter your password"
                      />
                      {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}

                      <Button
                        mode="contained"
                        style={styles.button}
                        onPress={handleSubmit}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        contentStyle={styles.buttonContent}
                      >
                        Log In
                      </Button>

                     
                      <Pressable onPress={() => router.push("/signup")}>
                        <Text style={styles.registerText}>
                          New Here?{" "}
                          <Text style={styles.registerLink}>Register yourself</Text>
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </Formik>
              </Card.Content>
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center", 
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center", 
    paddingVertical: 20, 
  },
  card: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "#fff",
    width: "90%", 
    maxWidth: 400, 
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#6200ee",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
    ...(Platform.OS === "web" && {
      cursor: "text",
      outlineWidth: 0,
    }),
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 8,
  },
  buttonContent: {
    paddingVertical: 4,
  },
  registerText: {
    fontSize: 15,
    alignSelf: "center",
    marginTop: 20,
    color: "#333",
  },
  registerLink: {
    color: "#6200ee",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;