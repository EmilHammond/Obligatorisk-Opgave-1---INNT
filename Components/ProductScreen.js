import React from 'react';
import { FlatList } from 'react-native';
import ProductItem from './ProductItem'; // Import ProductItem component
import { StyleSheet } from 'react-native';

const products = [
  {
    id: '1',
    title: '50 x 50',
    price: 100,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/reframe-56670.appspot.com/o/Bas%20Messenger%20Photo.jpg?alt=media&token=ca023bc5-747e-4b86-8c19-98cdb033fce1',
    description: 'This piece of art is made from recycled material.',
  },
  {
    id: '2',
    title: '40 x 40',
    price: 80,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/reframe-56670.appspot.com/o/Bas%20Messenger%20Photo%20(1).jpg?alt=media&token=fe9e0fab-51f6-41ec-afa5-a47a7f7e110c',
    description: 'This piece of art is made from recycled material.',
  },
  {
    id: '3',
    title: '30 x 30',
    price: 50,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/reframe-56670.appspot.com/o/Bas%20Messenger%20Photo%20(2).jpg?alt=media&token=b533fa40-6a25-4ea0-8a05-ce201dc65d96',
    description: 'This piece of art is made from recycled material.',
  },
];

const ProductScreen = ({ addToCart }) => {
  const handleBuy = (product) => {
    addToCart(product); // Call the addToCart function passed down from the parent component
    alert(`You have added ${product.title} to the cart!`);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem product={item} onBuy={handleBuy} /> // Directly render ProductItem
      )}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    FlatList: 
    {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    itemButton: {
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    });


export default ProductScreen;
