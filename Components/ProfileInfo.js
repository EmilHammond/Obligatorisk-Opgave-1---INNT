// Components/ProfileInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileInfo = ({ email, purchaseHistory }) => (
  <View style={styles.container}>
     <Icon
        name="user"
        size={150}
        color="#333"
        margin={100}
        />
    <Text style={styles.email}>Email: {email}</Text>
    <Text style={styles.historyTitle}>Purchase History:</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  email: {
    fontSize: 16,
  },
  historyTitle: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  historyItem: {
    marginTop: 5,
  },
});

export default ProfileInfo;
