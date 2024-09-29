import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getFirestore } from 'firebase/firestore';

// Import Components
import CustomButton from './Components/CustomButton';
import ProductItem from './Components/ProductItem';
import ProductScreen from './Components/ProductScreen';
import CustomTextInput from './Components/CustomTextInput';
import CartScreen from './Components/CartScreen';
import ProfileInfo from './Components/ProfileInfo';

// Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase if it hasn't been initialized already
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  console.log("Firebase initialized!");
}

const db = getFirestore(); // Initialize Firestore

// Firebase auth instance
const auth = getAuth();

const Stack = createStackNavigator();

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reframe-56670.appspot.com/o/Reframe%20-%20Logo.jpg?alt=media&token=1c02dd5e-0f8c-48fe-ae69-58bbdb0ae17d' }} style={{ width: 300, height: 100, marginBottom: 150 }}/>
      <Text style={styles.header}>Welcome to Reframe</Text>
      <CustomButton title="View Products" onPress={() => navigation.navigate('Products')} />
      <CustomButton title="Login" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
}


// Authentication (Login/Register) Screen
function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(true); // Toggle between login and registration

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Success', 'You have successfully logged in!');
      setEmail('');
      setPassword('');
      navigation.navigate('Profile'); // Navigate to Profile after login
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration Success', 'You can now log in!');
      setIsLoginScreen(true); // Switch to login after registration
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginScreen ? 'Login to Reframe' : 'Register for Reframe'}</Text>
      <CustomTextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomTextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomButton
        title={loading ? (isLoginScreen ? 'Logging in...' : 'Registering...') : (isLoginScreen ? 'Login' : 'Register')}
        onPress={isLoginScreen ? handleLogin : handleRegister}
        disabled={loading}
      />
      <Text style={styles.toggleText} onPress={() => setIsLoginScreen(!isLoginScreen)}>
        {isLoginScreen ? "Don't have an account? Register" : "Already have an account? Login"}
      </Text>
    </View>
  );
}

function ProfileScreen({ user }) {
  // Mock data for purchase history
  const purchaseHistory = user ? [
    { title: '50 x 50' },
    { title: '40 x 40' },
  ] : [];

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <ProfileInfo email={user.email} purchaseHistory={purchaseHistory} />
        </>
      ) : (
        <Text style={styles.errorText}>You are not logged in. Please log in to view your profile.</Text>
      )}
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]); // State for cart items

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
      console.log("Cart items updated:", newItems);
      return newItems;
    });
  };
  

  const removeFromCart = (productToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productToRemove.id)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen 
          name="Products" 
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="shopping-cart"
                  size={25}
                  onPress={() => navigation.navigate('Cart')}
                  style={{ marginRight: 15 }}
                />
                <Icon
                  name="user"
                  size={25}
                  onPress={() => navigation.navigate('Profile')}
                  style= {{ marginRight: 15 }}
                />
              </View>
            ),
          })}
        >
          {(props) => <ProductScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
        />
        
        <Stack.Screen 
          name="Profile" 
          component={user ? () => <ProfileScreen user={user} /> : AuthScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="shopping-cart"
                  size={25}
                  onPress={() => navigation.navigate('Cart')}
                  style={{ marginRight: 15 }}
                />
                <Icon
                  name="user"
                  size={25}
                  onPress={() => navigation.navigate('Profile')}
                  style= {{ marginRight: 15 }}
                />
              </View>
            ),
          })}
        />
        
        <Stack.Screen 
          name="Cart" 
          options={{ title: 'Shopping Cart' }}
        >
          {(props) => (
            <CartScreen 
              {...props} 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleText: {
    marginTop: 20,
    color: 'blue',
  },
});
