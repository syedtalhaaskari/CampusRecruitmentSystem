import React, { useState, useEffect } from 'react';
import { Container, Text, View, List, ListItem, Spinner, Form, Item, Label, Input, Button, Content, Toast } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { postVacancy } from '../../redux';

const PostForVacancy = (props) => {
    let [title, setTitle] = useState("")
    let [perc, setPerc] = useState("")
    let [description, setDescription] = useState("")
    let [seats, setSeats] = useState("")

    const submitForm = () => {
        if (title === "" || perc === "" || description === "" || seats === "") {
            Toast.show({
                text: "Fill All Fields",
                buttonText: 'Okay'
            })
        }
        else {
            let data = {
                title, perc, description, seats,
                uid: props.user.user.uid,
                companyName: props.user.user.name,
                companyAddress: props.user.user.address,
                contact: props.user.user.contact,
                email: props.user.user.email,
            }
            props.postVacancy(data, props.user.user.uid)
        }
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <ScrollView>
                <Content contentContainerStyle={styles.center}>
                    <View style={{ paddingHorizontal: 20, width: "80%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 5, marginTop: 10 }}>
                        <Text style={{ fontSize: 18 }}>You can only post one vacancy at a time</Text>
                    </View>
                    <Form>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Title:</Label>
                            <Input onChangeText={(text) => setTitle(text)} value={title} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Minimum Percentage:</Label>
                            <Input keyboardType="numeric" onChangeText={(text) => setPerc(text)} value={perc} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Number of Seats:</Label>
                            <Input onChangeText={(text) => setSeats(text)} value={seats} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Description:</Label>
                            <Input keyboardType="numeric" onChangeText={(text) => setDescription(text)} value={description} />
                        </Item>
                        <Button full danger style={styles.btn} onPress={submitForm}><Text>Upload</Text></Button>
                        <Button onPress={() => props.navigation.navigate("Dashboard", { screen: "Home" })} full info style={styles.btn}><Text>Back To Home</Text></Button>
                    </Form>
                </Content>
            </ScrollView>
            {
                props.company.loading && <View style={styles.spinner}>
                    <Spinner color='white' />
                </View>
            }
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    inputItem: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "80%",
        paddingTop: 0,
        paddingBottom: 5,
        marginLeft: 0,
        paddingLeft: 10,
        borderRadius: 5,
    },
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
        flex: 1,
        resizeMode: "cover",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        marginTop: 20,
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        borderTopEndRadius: 0,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        padding: 10,
        alignSelf: "flex-end",
        marginBottom: 0,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

const mapStateToProps = (state) => ({
    user: state.user,
    company: state.company,
})

const mapDispatchToProps = (dispatch) => ({
    postVacancy: (data, uid) => dispatch(postVacancy(data, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForVacancy);