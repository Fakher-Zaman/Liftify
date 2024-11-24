import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { signup, login } from '../appwrite/service';
import Palette from '../constants/colors';

export default function Signup({ navigation }) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSignUp = async () => {
        try {
            if (name.length < 1 || email.length < 1 || password.length < 1 || repeatPassword.length < 1) {
                setError('All fields are required');
                Alert.alert('All fields are required!');
                return;
            } 
    
            if (password !== repeatPassword) {
                setError('Passwords do not match');
                Alert.alert('Passwords do not match!');
                return;
            }
    
            // Call the signup function
            const res = await signup(name, email, password);;
    
            if (res) {
                Alert.alert('Success', 'User signed up successfully!');
            }
    
        } catch (error) {
            console.log(error);
            setError(error.message);
            Alert.alert('Error', error.message || 'An error occurred during sign up.');
        }
    };    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.appName}>Appwrite Auth</Text>

                {/* Name */}
                <TextInput
                    value={name}
                    onChangeText={text => {
                        setError('');
                        setName(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Name"
                    style={styles.input}
                />

                {/* Email */}
                <TextInput
                    value={email}
                    keyboardType="email-address"
                    onChangeText={text => {
                        setError('');
                        setEmail(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Email"
                    style={styles.input}
                />

                {/* Password */}
                <TextInput
                    value={password}
                    onChangeText={text => {
                        setError('');
                        setPassword(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                />

                {/* Repeat password */}
                <TextInput
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={text => {
                        setError('');
                        setRepeatPassword(text);
                    }}
                    placeholderTextColor={'#AEAEAE'}
                    placeholder="Repeat Password"
                    style={styles.input}
                />

                {/* Validation error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Signup button */}
                <Pressable
                    onPress={handleSignUp}
                    style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

                {/* Login navigation */}
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginContainer}>
                    <Text style={styles.haveAccountLabel}>
                        Already have an account?{'  '}
                        <Text style={styles.loginLabel}>Login</Text>
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    appName: {
        color: Palette.primary,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: Palette.primary50,
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,

        width: '80%',
        color: '#000000',

        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: '#ffffff',
        padding: 10,
        height: 45,

        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    btnText: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    loginContainer: {
        marginTop: 60,
    },
    haveAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    loginLabel: {
        color: Palette.primary,
    },
})
