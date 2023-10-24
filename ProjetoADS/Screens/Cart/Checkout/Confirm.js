import React from "react";
import  {View, StyleSheet,Dimensions, ScrollView} from 'react-native';
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import { connect } from "react-redux";
import * as actions from '../../../Redux/Actions/cartActions'

var {height} = Dimensions.get('window');



const Confirm =(props)=>{

    const Confirm = props.route.params
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight:'bold'}}> 
                Confirm Order
                </Text>
                {props.route.params ? 
                <View style={{borderWidth: 1, borderColor:'orange'}}>
                    <Text style={styles.title}>Shipping to:</Text>
                    <View style={{padding: 8}}>
                        <Text>Address:{Confirm.order.order.shippingAddress1}</Text>
                        <Text>Address2:{Confirm.order.order.shippingAddress2}</Text>
                        <Text>City:{Confirm.order.order.city}</Text>
                        <Text>Zip Code:{Confirm.order.order.zip}</Text>
                        <Text>country:{Confirm.order.order.country}</Text>
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {Confirm.order.oder.oderItems.map((x) => {
                        return(
                            <ListItem
                            style={styles.listItem}
                            key={x.product.name}
                            avatar
                            >
                                <Left>
                                    <Thumbnail source={{uri: x.product.image}}/>
                                </Left>
                                <Body style={styles.body}>
                                <Left>
                                    <Text>{x.product.name}</Text>
                                </Left>
                                <Right>
                                    <Text>${}x.product.price</Text>
                                </Right>
                                </Body>
                            </ListItem>
                        )
                    })}
                </View>
                   : null}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        height: height,
        padding: 8,
        alignContent:'center',
        backgroundColor: 'white'
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    title:{
        alignSelf:'center',
        margin: 8,
        fontSize: 16,
        fontWeight:'bold'
    },
    listItem:{
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body:{
        margin:10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})
export default Confirm;