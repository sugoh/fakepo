import React, {useState} from 'react';
import Button from 'react-native-button';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Modal,
  StyleSheet,
} from 'react-native';

import Potato from '../assets/potato_2.svg';
import CloseButton from '../assets/closeButton.svg';
import Eye from '../assets/eye.svg';
import LoadingSpinner from '../assets/spinner.svg';

type LogInProps = {
  cancel: () => void;
};

export default ({cancel}: LogInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    // TODO: actually talk to the API
  };

  const forgotLogin = () => {
    // TODO: implement
  };

  const handleFocus = () => {
    // TODO: implement highlight
  };
  const handleBlur = () => {
    // TODO: implement unhighlight
  };

  const toggleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.closeButtonView}>
          <Button>
            <CloseButton onPress={cancel} />
          </Button>
        </View>
        <View style={styles.logoView}>
          <Potato height={100} />
          <Text style={styles.titleText}>superpotato</Text>
        </View>
        <View style={styles.formView}>
          <TextInput
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email address"
            placeholderTextColor="#A0BCC8"
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardAppearance="dark"
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <View>
            <TextInput
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              placeholderTextColor="#A0BCC8"
              style={styles.textInput}
              textContentType="password"
              keyboardAppearance="dark"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <View
              style={{
                height: 48,
                justifyContent: 'center',
                position: 'absolute',
                right: 10,
              }}>
              <Button onPress={toggleShowPassword}>
                <Eye height={25} width={30} />
              </Button>
            </View>
          </View>
        </View>
        <View></View>
        <View style={styles.buttonsView}>
          <Button
            containerStyle={{
              ...styles.buttonContainer,
              backgroundColor: '#84C022',
            }}
            style={{
              color: email === '' || password === '' ? '#528105' : 'white',
              fontWeight: 'bold',
              paddingTop: 2,
            }}
            disabled={email === '' || password === ''}
            onPress={login}>
            Continue
          </Button>
          <Button
            containerStyle={{
              ...styles.buttonContainer,
              backgroundColor: '#00344A',
              borderColor: '#00344A',
            }}
            style={{color: '#7FBF16'}}
            onPress={forgotLogin}>
            Forgot your username / password?
          </Button>
        </View>
      </SafeAreaView>
      {loading && <Modal />}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },

  closeButtonView: {
    alignSelf: 'flex-start',
    width: '95%',
  },

  logoView: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formView: {
    height: '20%',
    width: '80%',
    justifyContent: 'center',
  },

  textInput: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#0B4A65',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 13,
    marginBottom: 15,
  },

  buttonsView: {
    height: '15%',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 5,
    padding: 10,
    height: 45,
    width: 300,
    overflow: 'hidden',
    borderRadius: 22,
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
