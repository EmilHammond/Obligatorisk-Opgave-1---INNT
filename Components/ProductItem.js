// Components/ProductItem.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList } from 'react-native';

const ProductItem = ({ product, onBuy }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{product.title}</Text> 
    <Image source={{ uri: product.imageUrl }} style={styles.image} />
    <Text style={styles.description}>{product.description}</Text>
    <Button title="Buy" onPress={() => onBuy(product)} /> 
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    width: 400,
    height: 450,
    marginLeft: 5,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 150,
    marginRight: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
    marginLeft: 30,
  },
  description: {
    fontSize: 14,
  },
    button: {
        padding: 10,
        marginVertical: 10,
        marginLeft: 150,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        overlayColor: '#f0f0f0',
    },

});

export default ProductItem;
