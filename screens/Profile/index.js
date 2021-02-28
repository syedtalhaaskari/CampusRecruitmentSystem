import React from 'react';
import { Text, View, List, ListItem, Spinner } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { userLogout } from "../../redux"

const Profile = (props) => {

    return (
        <ImageBackground source={image} style={styles.image}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                    <List style={{ backgroundColor: "white", borderRadius: 5, width: "100%", }}>
                        <ListItem>
                            <Text><Text style={{ fontWeight: "bold" }}>Name: </Text>{props.user.user.name}</Text>
                        </ListItem>
                        <ListItem>
                            <Text><Text style={{ fontWeight: "bold" }}>Contact: </Text>{props.user.user.contact}</Text>
                        </ListItem>
                        <ListItem style={{ borderBottomWidth: 1, borderColor: "#eee", }}>
                            <View>
                                <Text style={{ fontWeight: "bold" }}>Address:&nbsp;</Text>
                                <Text>{props.user.user.address}</Text>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View><Text style={{ fontWeight: "bold" }}>You are a {props.user.user.type}</Text></View>
                        </ListItem>
                        <ListItem>
                            <Text><Text style={{ fontWeight: "bold" }}>Email: </Text>{props.user.user.email}</Text>
                        </ListItem>
                        {
                            props.user.user.type === "Student" &&
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Your Percentage: </Text>{props.user.user.report.percentage}</Text>
                            </ListItem>
                        }
                        <ListItem>
                            <Text><Text style={{ fontWeight: "bold" }}>Password: </Text>**********</Text>
                        </ListItem>
                    </List>
                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("ProfileEdit")}><Text style={styles.btnText}>Edit</Text></TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => { props.userLogout() }}><Text style={styles.btnText}>Logout</Text></TouchableHighlight>

                </View>
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
        flex: 1,
        resizeMode: "cover",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
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
    }
})

const mapStateToProps = (state) => ({
    user: state.user
})


const mapDispatchToProps = (dispatch) => ({
    userLogout: () => dispatch(userLogout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);