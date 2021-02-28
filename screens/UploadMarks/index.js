import React, { useState, useEffect } from 'react';
import { Container, Text, View, List, ListItem, Spinner, Form, Item, Label, Input, Button, Content, Toast } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { userMarksUpdate } from '../../redux';

const UploadMarks = (props) => {
    let [English, setEnglish] = useState(props.user.user.report ? props.user.user.report.subjects.English : "")
    let [Math, setMath] = useState(props.user.user.report ? props.user.user.report.subjects.Math : "")
    let [Science, setScience] = useState(props.user.user.report ? props.user.user.report.subjects.Science : "")
    let [Urdu, setUrdu] = useState(props.user.user.report ? props.user.user.report.subjects.Urdu : "")
    let [Islamiat, setIslamiat] = useState(props.user.user.report ? props.user.user.report.subjects.Islamiat : "")

    const calcPerc = (mark1, mark2, mark3, mark4, mark5) => {
        let total = 0
        total = [parseInt(mark1), parseInt(mark2), parseInt(mark3), parseInt(mark4), parseInt(mark5)].reduce((a, b) => { return a + b })
        let percentage = total * 100 / 500
        return percentage
    }

    const submitForm = () => {
        if (English === "" || Math === "" || Science === "" || Islamiat === "" || Urdu === "") {
            Toast.show({
                text: "Fill All Fields",
                buttonText: 'Okay'
            })
        }
        else {
            let report = {
                subjects: {
                    English, Math, Science, Islamiat, Urdu
                },
                percentage: calcPerc(English, Math, Science, Islamiat, Urdu) + "%"
            }
            props.userMarksUpdate(report, props.user.user.uid)
        }
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <ScrollView>
                <Content contentContainerStyle={styles.center}>
                    <Form>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>English Marks:</Label>
                            <Input onChangeText={(text) => setEnglish(text)} value={English} maxLength={2} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Math Marks:</Label>
                            <Input keyboardType="numeric" onChangeText={(text) => setMath(text)} value={Math} maxLength={2} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Science Marks:</Label>
                            <Input onChangeText={(text) => setScience(text)} value={Science} maxLength={2} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Urdu Marks:</Label>
                            <Input keyboardType="numeric" onChangeText={(text) => setUrdu(text)} value={Urdu} maxLength={2} />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                            <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Islamiat Marks:</Label>
                            <Input onChangeText={(text) => setIslamiat(text)} value={Islamiat} maxLength={2} />
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
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    userMarksUpdate: (data, uid) => dispatch(userMarksUpdate(data, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadMarks);