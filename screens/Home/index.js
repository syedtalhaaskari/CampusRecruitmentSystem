import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Item, Text, View, Picker, List, ListItem, Icon, Toast, Spinner } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, Modal, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { userLogout } from "../../redux"


const Home = (props) => {

    useEffect(() => {
        if (props.user.error) {
            Toast.show({
                text: props.user.error,
                buttonText: 'Okay'
            })
        }
        else if (props.user.user.email) {
            props.navigation.navigate("Dashboard", { screen: "Home" })
        }
        // else if (!props.user.user.email && !props.user.error) {
        else
            props.navigation.navigate("LoginArea", { screen: "Login" })
        // }
    }, [props.user])

    return (
        <Container>
            <ImageBackground source={image} style={styles.image}>
                <View style={{ paddingHorizontal: 20, marginVertical: 60, }}>
                    <Text style={styles.heading}>Hi {props.user.user.name}</Text>
                    <ScrollView>
                        {
                            props.user.user.type === "Student" ?
                                <>
                                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("UploadMarks")}><Text style={styles.btnText}>Upload Marks</Text></TouchableHighlight>
                                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("CheckForVacancy")}><Text style={styles.btnText}>Check for Vacancy</Text></TouchableHighlight>
                                </> :
                                <>
                                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("ViewResume")}><Text style={styles.btnText}>View Resume</Text></TouchableHighlight>
                                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("PostForVacancy")}><Text style={styles.btnText}>Post for Vacancy</Text></TouchableHighlight>
                                </>
                        }
                        {
                            props.user.user.type === "Admin" &&
                            <>
                                <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("CheckForVacancy")}><Text style={styles.btnText}>Check for Vacancy</Text></TouchableHighlight>
                            </>
                        }
                        <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("ProfileEdit")}><Text style={styles.btnText}>Update Profile</Text></TouchableHighlight>
                        <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.userLogout("ProfileEdit")}><Text style={styles.btnText}>Signout</Text></TouchableHighlight>
                    </ScrollView>
                </View>
                {
                    props.user.loading && <View style={styles.spinner}>
                        <Spinner color='white' />
                    </View>
                }
            </ImageBackground>
        </Container >
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    userLogout: () => dispatch(userLogout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    heading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    btn: {
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        borderRadius: 5,
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
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
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
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
        alignItems: "flex-start",
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
    }
})