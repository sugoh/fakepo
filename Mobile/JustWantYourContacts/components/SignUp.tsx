import React, {useState, useEffect} from 'react';
import Button from 'react-native-button';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  ViewPagerAndroidOnPageScrollEventData,
} from 'react-native';

import CloseButton from '../assets/closeButton.svg';
import Eye from '../assets/eye.svg';
import LoadingSpinner from '../assets/spinner.svg';

type SignUpProps = {
  cancel: () => void;
};

enum Steps {
  EMAIL,
  PASSWORD,
  FIRST_AND_LAST_NAME,
  PHONE_NUMBER,
  ONE_TIME_CODE,
}

// TODO:
// check if email used
// check phone number
// add loading spinner

export default ({cancel}: SignUpProps) => {
  // TODO: turn all of these states into a custom hook
  // ALSO TODO: turn steps into enum

  const [step, setStep] = useState(Steps.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oneTimeCode, setOneTimeCode] = useState('');
  const [systemOneTimeCode, setSystemOneTimeCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

  const getOneTimeCode = () => {
    // TODO: implement, get SMS auth from API
    const response = '123456';
    setSystemOneTimeCode(response);
  };

  const checkOTP = () => {
    return oneTimeCode === systemOneTimeCode;
  };

  const handleFocus = () => {
    // TODO: implement highlight
  };
  const handleBlur = () => {
    // TODO: implement unhighlight
  };

  const handleSignUp = () => {
    // TODO: send everything off to the API
    console.log('signing up');
  };

  const handleContinue = () => {
    if (step === Steps.EMAIL) {
      if (email === '') return;
      setStep(Steps.PASSWORD);
    } else if (step === Steps.PASSWORD) {
      if (password === '') return;
      setStep(Steps.FIRST_AND_LAST_NAME);
    } else if (step === Steps.FIRST_AND_LAST_NAME) {
      if (firstName === '' || lastName === '') return;
      setStep(Steps.PHONE_NUMBER);
    } else if (step === Steps.PHONE_NUMBER) {
      if (phoneNumber === '') return;
      getOneTimeCode();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.ONE_TIME_CODE) {
      if (oneTimeCode === '') return;
      if (!checkOTP()) return;
      // we'll need to display an error message and let them request a resend here instead of blocking
      handleSignUp();
    }
  };

  const showStep = () => {
    switch (step) {
      case Steps.EMAIL:
        return (
          <>
            <View style={styles.closeButtonView}>
              <Button>
                <CloseButton onPress={cancel} />
              </Button>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>Let's get started.</Text>
              <Text style={{...styles.normalText, marginTop: 5}}>
                What is your email address?
              </Text>
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
                autoCapitalize="none"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            <View style={styles.buttonsView}>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  backgroundColor: '#84C022',
                }}
                style={{color: '#528105', fontWeight: 'bold', paddingTop: 2}}
                disabled={email === ''}
                onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </>
        );
      case Steps.PASSWORD:
        return (
          <>
            <View style={styles.closeButtonView}>
              <Button>
                <CloseButton onPress={cancel} />
              </Button>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>Welcome!</Text>
              <Text style={{...styles.normalText, marginTop: 5}}>
                What is your name?
              </Text>
            </View>
            <View style={styles.formView}>
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
            <View style={styles.buttonsView}>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  backgroundColor: '#84C022',
                }}
                style={{color: '#528105', fontWeight: 'bold', paddingTop: 2}}
                disabled={password === ''}
                onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </>
        );
      case Steps.FIRST_AND_LAST_NAME:
        return (
          <>
            <View style={styles.closeButtonView}>
              <Button>
                <CloseButton onPress={cancel} />
              </Button>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>Welcome!</Text>
              <Text style={{...styles.normalText, marginTop: 5}}>
                What is your name?
              </Text>
            </View>
            <View style={styles.formView}>
              <TextInput
                onChangeText={text => setFirstName(text)}
                value={firstName}
                placeholder="First name"
                placeholderTextColor="#A0BCC8"
                style={styles.textInput}
                textContentType="givenName"
                keyboardAppearance="dark"
                autoCapitalize="words"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <TextInput
                onChangeText={text => setLastName(text)}
                value={lastName}
                placeholder="Last name"
                placeholderTextColor="#A0BCC8"
                style={styles.textInput}
                textContentType="familyName"
                keyboardAppearance="dark"
                autoCapitalize="words"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            <View style={styles.buttonsView}>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  backgroundColor: '#84C022',
                }}
                style={{color: '#528105', fontWeight: 'bold', paddingTop: 2}}
                disabled={firstName === '' || lastName === ''}
                onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </>
        );
      case Steps.PHONE_NUMBER:
        return (
          <>
            <View style={styles.closeButtonView}>
              <Button>
                <CloseButton onPress={cancel} />
              </Button>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>Last step</Text>
              <Text style={{...styles.normalText, marginTop: 5}}>
                What is your phone number?
              </Text>
            </View>
            <View style={styles.formView}>
              <TextInput
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
                placeholder="Phone number"
                placeholderTextColor="#A0BCC8"
                style={styles.textInput}
                textContentType="telephoneNumber"
                keyboardAppearance="dark"
                keyboardType="phone-pad"
                autoCapitalize="none"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            <View style={styles.buttonsView}>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  backgroundColor: '#84C022',
                }}
                style={{color: '#528105', fontWeight: 'bold', paddingTop: 2}}
                disabled={phoneNumber === ''}
                onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </>
        );
      case Steps.ONE_TIME_CODE:
        return (
          <>
            <View style={styles.closeButtonView}>
              <Button>
                <CloseButton onPress={cancel} />
              </Button>
            </View>
            <View style={styles.textView}>
              <Text style={styles.titleText}>Enter verification code</Text>
              <Text style={{...styles.normalText, marginTop: 5}}>
                We just sent an SMS to you. It might take up to a minute to
                arrive
              </Text>
            </View>
            <View style={styles.formView}>
              <TextInput
                onChangeText={text => setOneTimeCode(text)}
                value={oneTimeCode}
                placeholderTextColor="#A0BCC8"
                style={styles.textInput}
                textContentType="oneTimeCode"
                keyboardAppearance="dark"
                keyboardType="phone-pad"
                autoCapitalize="none"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            <View style={styles.buttonsView}>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  backgroundColor: '#84C022',
                }}
                style={{color: '#528105', fontWeight: 'bold', paddingTop: 2}}
                disabled={oneTimeCode === ''}
                onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </>
        );
    }
  };

  return <SafeAreaView style={styles.mainView}>{showStep()}</SafeAreaView>;
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

  textView: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formView: {
    height: '60%',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  normalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
