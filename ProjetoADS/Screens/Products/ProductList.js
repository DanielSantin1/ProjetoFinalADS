import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get('window');

const ProductList = ({ item }) => {
    return (
        <TouchableOpacity style={{ width: width / 2, padding: 5 }}>
            <View style={{ flex: 1, backgroundColor: 'gainsboro' }}>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    );
}

export default ProductList;
