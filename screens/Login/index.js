import React, { useEffect, useState } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Toast, Text, View, Spinner } from 'native-base';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import image from "../../assets/images/background.jpg"
import logo from "../../assets/images/logo.png"
import { connect } from "react-redux"
import { userLogin, userLoginCheck } from "../../redux"

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    props.userLoginCheck()
  }, [])

  useEffect(() => {
    if (props.user.error) {
      Toast.show({
        text: props.user.error,
        buttonText: 'Okay'
      })
    }
    else if (props.user.user.email) {
      setEmail("")
      setPassword("")
      props.navigation.navigate("Dashboard", { screen: "Home" })
    }
  }, [props.user])

  const submitForm = () => {
    if (email === "" || password === "") {
      Toast.show({
        text: "Email or password cannot remain empty",
        buttonText: 'Okay'
      })
    }
    else {
      let data = { email, password }
      props.userLogin(data)
    }
  }

  return (
    <Container>
      <ImageBackground source={image} style={styles.image}>
        <Content contentContainerStyle={styles.center}>
          <View style={{ backgroundColor: "white", padding: 15, borderRadius: 100, }}>
            <Image source={logo} style={{ height: 150, width: 150, }} />
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} value={email}/>
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}/>
            </Item>
            <Button full danger style={styles.btn} onPress={submitForm}><Text>Login</Text></Button>
            <Button onPress={() => props.navigation.navigate("LoginArea", { screen: "Register" })} full info style={styles.btn}><Text>Register</Text></Button>
          </Form>
          <Text style={{color: "white", textAlign:"center", marginTop: 20}}>To Login as Admin use: admin@admin.com =&gt; password: admin123</Text>
        </Content>
        {
          props.user.loading && <View style={styles.spinner}>
            <Spinner color='white' />
          </View>
        }
      </ImageBackground>
    </Container>
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

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data) => dispatch(userLogin(data)),
  userLoginCheck: () => dispatch(userLoginCheck()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);