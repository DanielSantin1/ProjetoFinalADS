import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './categoryFilter';

const { height } = Dimensions.get('window');
const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setCategories(productCategories);
    setProductsCtg(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setCategories([]);
      setProductsCtg([]);
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    if (ctg === "all") {
      setProductsCtg(products);
      setActive(-1);
    } else {
      setProductsCtg(products.filter((i) => i.category._id === ctg));
      setActive(true);
    }
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onBlur={onBlur}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>

      {focus ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View>
            <Banner />
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => (
                  <ProductList key={item._id} item={item} />
                ))}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;
