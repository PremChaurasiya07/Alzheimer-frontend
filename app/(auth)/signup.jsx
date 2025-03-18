import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../auth/firebase.js";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";

const SignupScreen = () => {
 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "995301668398-1pd3b1ahnifdk6d3b6lkc8pv2f5g9arf.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@prem7709/frontend",
    returnTo: "https://auth.expo.io/@prem7709/frontend",
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Google Sign-In Successful:", userCredential.user);
          Alert.alert("Success", "Account created with Google!");
          router.replace("/login");
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", {
            code: error.code,
            message: error.message,
            details: error,
          });
          Alert.alert("Error", error.message);
        });
    }
  }, [response]);


  const handleSignup = async (values, { setSubmitting }) => {
    try {
      console.log("Attempting signup with:", {
        email: values.email,
        password: values.password,
      });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password
      );

      console.log("User Signed Up:", userCredential.user);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/login");
    } catch (error) {
      console.error("Signup Error:", {
        code: error.code,
        message: error.message,
        details: error,
      });

      let errorMessage = "An error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak.";
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
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Create Account</Text>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                  password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                })}
                onSubmit={handleSignup}
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
                  <>
                   
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
                      autoFocus={Platform.OS === "android"}
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
                      icon="account-plus"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      contentStyle={styles.buttonContent}
                    >
                      Sign Up
                    </Button>

                    
                    <Pressable onPress={() => router.replace("/login")}>
                      <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Text style={styles.link}>Log in</Text>
                      </Text>
                    </Pressable>
                  </>
                )}
              </Formik>
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
    backgroundColor: "#f4f4f4",
    justifyContent: "center", 
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
    marginLeft: 5,
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
  footerText: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 14,
    padding: 8,
    color: "#333",
  },
  link: {
    color: "#6200ee",
    fontWeight: "bold",
    textDecorationLine: "underline", 
  },
});

export default SignupScreen;