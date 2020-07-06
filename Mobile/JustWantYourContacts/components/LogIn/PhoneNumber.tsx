import React, {useState, useEffect} from 'react';
import Button from 'react-native-button';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import {logInStyles as styles} from '../styles';
import {formatPhoneNumber} from '../shared/helpers';

import Potato from '../../assets/potato_2.svg';

import {Steps} from './LogIn';

type Props = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  setStep: (newStep: Steps) => void;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({
  phoneNumber,
  setPhoneNumber,
  handleContinue,
  setStep,
}: Props) => {
  const [focusStates, setFocusStates] = useState<FocusState>({
    phoneNumberInput: false,
  });

  const changePhoneNumber = (text: string) => {
    let newPhone = text;
    if (phoneNumber.length > newPhone.length && newPhone.length !== 0) {
      if (newPhone[text.length - 1] === ' ') {
        newPhone = newPhone.slice(0, text.length);
      } else if (newPhone[text.length - 1].match(/\d/g)) {
        if (newPhone.length === 3 || newPhone.length === 6) {
          newPhone = newPhone.slice(0, text.length);
        }
      }
    }

    setPhoneNumber(newPhone.split(' ').join(''));
  };

  const handleFocus = (focusID: string) => {
    setFocusStates({...focusStates, [focusID]: true});
  };

  const handleBlur = (focusID: string) => {
    setFocusStates({...focusStates, [focusID]: false});
  };

  return (
    <>
      <View style={styles.textView}>
        <Potato height={100} />
        <Text style={styles.titleText}>superpotato</Text>
        <Text style={{...styles.normalText, marginTop: 5}}>
          Let's get you logged in
        </Text>
      </View>
      <View style={styles.formView}>
        <View
          style={{
            ...styles.textWithPrefixInput,
            backgroundColor: focusStates['phoneNumberInput']
              ? '#0B4A65'
              : '#00344A',
          }}>
          <Text style={styles.prefixText}>+1</Text>
          <TextInput
            onChangeText={(text) => changePhoneNumber(text)}
            value={formatPhoneNumber(phoneNumber)}
            placeholder="Phone number"
            placeholderTextColor="#A0BCC8"
            textContentType="telephoneNumber"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={{color: 'white', flexBasis: '65%'}}
            maxLength={12}
            onFocus={() => handleFocus('phoneNumberInput')}
            onBlur={() => handleBlur('phoneNumberInput')}
          />
        </View>
      </View>
      <KeyboardAvoidingView behavior="position" style={styles.buttonsView}>
        <View style={{alignItems: 'center'}}>
          <Button
            containerStyle={{
              ...styles.buttonContainer,
              backgroundColor: '#84C022',
            }}
            style={{
              color: phoneNumber.length < 10 ? '#528105' : 'white',
              fontWeight: 'bold',
              paddingTop: 2,
            }}
            disabled={phoneNumber.length !== 10}
            onPress={handleContinue}>
            Log in with phone
          </Button>
        </View>
        {phoneNumber.length > 0 ? (
          <View style={{...styles.textUnderButtonView}}>
            <Text style={styles.helpText}>
              By continuing you may receive an SMS for verification.
            </Text>
            <Text style={styles.helpText}>
              Message and data rates may apply.
            </Text>
          </View>
        ) : (
          <TouchableHighlight
            underlayColor="#00344A"
            style={{
              backgroundColor: '#00344A',
            }}
            onPress={() => setStep(Steps.EMAIL)}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{color: '#7FBF16'}}>
                Don't have access to this phone?
              </Text>
              <Text style={{color: '#7FBF16'}}>Login with email instead.</Text>
            </View>
          </TouchableHighlight>
        )}
      </KeyboardAvoidingView>
    </>
  );
};
