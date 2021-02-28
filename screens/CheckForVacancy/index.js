import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Item, Text, View, Picker, List, ListItem, Icon } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, Modal, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { fetchVacancy, companyPostDelete } from "../../redux"

const CheckForVacancy = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState({
        name: "",
        age: "",
    })

    useEffect(() => {
        props.fetchVacancy()
    }, [])

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{ ...styles.centeredView, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    <View style={{ width: "80%" }}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Title: {item.title}</Text>
                            <Text style={styles.modalText}>Required Percentage: {item.perc}%</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.contact}`)}>
                                <Text style={styles.modalText}>Contact: {item.contact} <Text style={{ fontSize: 10 }}>(Click To Call)</Text></Text>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Company Description: {item.description}</Text>
                            <Text style={styles.modalText}>Company Name: {item.companyName}</Text>
                            <Text style={styles.modalText}>Company Address: {item.companyAddress}</Text>
                            <Text style={styles.modalText}>Company Email: {item.email}</Text>
                            <Text style={styles.modalText}>Available Seats: {item.seats}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageBackground source={image} style={styles.image}>
                <View flex={1} style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                    <ScrollView>
                        <List style={{ backgroundColor: "white" }}>
                            {
                                props.company.company[0] ?
                                    props.company.company.map((item, ind) => {
                                        return (
                                            <ListItem key={ind} button onPress={() => { setModalVisible(true), setItem(item) }} style={{ justifyContent: "space-between" }}>
                                                <Text>{item.title}</Text>
                                                {
                                                    props.user.user.type === "Admin" &&
                                                    <TouchableHighlight activeOpacity={0.8} onPress={() => props.companyPostDelete(item.uid) }><Text style={styles.btnText}>Delete Vacancy</Text></TouchableHighlight>
                                                }
                                            </ListItem>
                                        )
                                    })
                                    :
                                    <ListItem button>
                                        <Text>No Vacancies Right now</Text>
                                    </ListItem>
                            }
                        </List>
                    </ScrollView>
                </View>
            </ImageBackground>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    company: state.company
})

const mapDispatchToProps = (dispatch) => ({
    companyPostDelete: (data) => dispatch(companyPostDelete(data)),
    fetchVacancy: () => dispatch(fetchVacancy()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckForVacancy);

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    center: {
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    btn: {
        marginTop: 20,
    },
    btn: {
        fontSize: 10,
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