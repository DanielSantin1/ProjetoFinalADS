import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ name, price, image, countInStock }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                resizeMode='contain'
                source={{uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
            />
            <Text style={styles.title}>
                {name.length > 20 ? name.substring(0, 15 - 3) + '...' : name}
            </Text>
            <Text style={styles.price}>${price}</Text>

            {countInStock > 0 ? (
                <View style={{ marginBottom: 60, top:105 }}> 
                    <Button title={'Add'} color={'green'} />
                </View>
            ) : <Text style={{ marginTop: 20 }}>Está indisponível</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        top: 150
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 15,
        top:160
    }
});

export default ProductCard;
