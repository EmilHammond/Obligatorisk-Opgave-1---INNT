// Components/CustomButton.js
import React from 'react';
import { Button, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} style={styles.button} />
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 10,
    marginLeft: 150,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    
  },
});

export default CustomButton;
