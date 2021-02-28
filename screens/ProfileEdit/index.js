import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Toast, Text, Icon, View, Textarea, Picker, DatePicker, Button, Separator } from 'native-base';
import { ImageBackground, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import image from "../../assets/images/background.jpg"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import { connect } from "react-redux"
import { userProfileUpdate } from "../../redux"
import moment from "moment"

const ProfileEdit = (props) => {
  // const { userData } = props.route.params

  // useEffect(() => {
  //   if (props.user.edited === "yes") {
  //     props.navigation.navigate("Dashboard", { screen: "Home" })
  //   }
  // }, [props.user])

  const [contact, setContact] = useState(props.user.user.contact)
  const [address, setAddress] = useState(props.user.user.address)

  const submitForm = () => {
    if (contact === "" || address === "") {
      Toast.show({
        text: "Fill All Fields",
        buttonText: 'Okay'
      })
    }
    else {
      let data = {
        contact, address
      }

      props.userProfileUpdate(data, props.user.user.uid)
    }
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <ScrollView>
        <Content contentContainerStyle={styles.center}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: "white", textDecorationLine: 'underline', }}>Edit Profile Form</Text>
          </View>
          <View style={{ width: "80%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 5, marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}>You have to re-login after update</Text>
          </View>
          <View style={styles.inputItem}>
            <Text style={{ paddingVertical: 10, paddingRight: 10, marginTop: 0, textAlign: "justify" }}>{props.user.user.name} you can only change the following fields to change other fields contact admin</Text>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Address</Label>
              <Input onChangeText={(text) => setAddress(text)} value={address} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Contact</Label>
              <Input keyboardType="numeric" onChangeText={(text) => setContact(text)} placeholder="Like 03001234567" value={contact} />
            </Item>
            <Button full danger style={styles.btn} onPress={submitForm}><Text>Update</Text></Button>
            <Button onPress={() => props.navigation.navigate("Dashboard", { screen: "Home" })} full info style={styles.btn}><Text>Back To Home</Text></Button>
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
  userProfileUpdate: (data, uid) => dispatch(userProfileUpdate(data, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);