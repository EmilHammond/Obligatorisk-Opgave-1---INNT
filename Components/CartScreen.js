import React from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore

const CartScreen = ({ cartItems, removeFromCart }) => {
  const auth = getAuth(); // Firebase auth instance
  const db = getFirestore(); // Firestore instance

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Checkout Error', 'Your cart is empty!');
      return;
    }

    try {
      const user = auth.currentUser; // Get the current user

      if (!user) {
        Alert.alert('Error', 'You must be logged in to place an order!');
        return;
      }

      // Store the order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cartItems,
        createdAt: new Date(),
        total: cartItems.reduce((sum, item) => sum + item.price, 0),
      });

      // Success alert
      Alert.alert('Order Success', 'Your order has been placed successfully!');
    } catch (error) {
      Alert.alert('Error', 'There was an issue placing your order: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title} - ${item.price}</Text>
              <Button title="Remove" onPress={() => removeFromCart(item)} />
            </View>
          )}
        />
      )}
      <Button title="Checkout" onPress={handleCheckout} disabled={cartItems.length === 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default CartScreen;
