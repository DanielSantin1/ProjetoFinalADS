import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";


const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 20,
    }
});

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image
                source={require('../assets/Logo.png')}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </SafeAreaView>
    );
};

export default Header;
