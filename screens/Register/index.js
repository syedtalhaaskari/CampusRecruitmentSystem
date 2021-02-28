import React, { useState, useEffect } from 'react';
import { Content, Form, Item, Input, Label, Toast, Text, View, Picker, Button, Spinner } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, Platform } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { userRegister } from "../../redux"
import { color } from 'react-native-reanimated';
import auth from "@react-native-firebase/auth"

const Register = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [contact, setContact] = useState("")
  const [type, setType] = useState("Type")
  const [address, setAddress] = useState("")

  const submitForm = () => {
    if (name === "" || email === "" || password === "" || confPassword === "" || contact === "" || type === "Type" || address === "") {
      Toast.show({
        text: "Fill All Fields",
        buttonText: 'Okay'
      })
    }
    else if (confPassword !== password) {
      Toast.show({
        text: "Password should be same",
        buttonText: 'Okay'
      })
    }
    else {
      const data = { name, address, email, contact, password, type }
      props.userRegister(data)
    }
  }

  useEffect(() => {
    if (props.user.error) {
      Toast.show({
        text: props.user.error,
        buttonText: 'Okay'
      })
    }
    else if (props.user.user.email) {
      props.navigation.navigate("Dashboard", {screen: "Home"})
    }
  }, [props.user])

  return (
    <ImageBackground source={image} style={styles.image}>
      <ScrollView>
        <Content contentContainerStyle={styles.center}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: "white", textDecorationLine: 'underline', }}>Registration Form</Text>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Full Name</Label>
              <Input onChangeText={(text) => setName(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Address</Label>
              <Input onChangeText={(text) => setAddress(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Email</Label>
              <Input keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Contact</Label>
              <Input keyboardType="numeric" onChangeText={(text) => setContact(text)} placeholder="Like 03001234567" />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Confirm Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setConfPassword(text)} />
            </Item>
            <View style={{ marginTop: 15, }}></View>
            <Item style={styles.inputItem}>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120, color: "#555" }}
                selectedValue={type}
                onValueChange={(e) => setType(e)}
              >
                <Picker.Item label="Type" value="Type" />
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Company" value="Company" />
              </Picker>
            </Item>
            <Button full danger style={styles.btn} onPress={() => submitForm()}><Text>Register</Text></Button>
            <Button onPress={() => props.navigation.navigate("Login")} full info style={styles.btn}><Text>Go To Login</Text></Button>
          </Form>
        </Content>
      </ScrollView>
      {
        props.user.loading && <View style={styles.spinner}>
          <Spinner color='white' />
        </View>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  spinner: {
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
  },
  image: {
    zIndex: 0,
    flex: 1,
    resizeMode: "cover",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 20,
  },
  inputItem: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "80%",
    paddingTop: 0,
    paddingBottom: 5,
    marginLeft: 0,
    paddingLeft: 10,
    borderRadius: 5,
  },
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userRegister: (data) => dispatch(userRegister(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);