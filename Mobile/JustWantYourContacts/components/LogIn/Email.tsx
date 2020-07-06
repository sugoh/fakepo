import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {logInStyles as styles} from '../styles';

import Potato from '../../assets/potato_2.svg';

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({email, setEmail, handleContinue}: Props) => {
  const [focusStates, setFocusStates] = useState<FocusState>({
    emailInput: false,
  });

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
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email address"
          placeholderTextColor="#A0BCC8"
          style={styles.textInput}
          textContentType="emailAddress"
          keyboardAppearance="dark"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => handleFocus('emailInput')}
          onBlur={() => handleBlur('emailInput')}
        />
      </View>
      <KeyboardAvoidingView behavior="position" style={styles.buttonsView}>
        <View style={{alignItems: 'center'}}>
          <Button
            containerStyle={{
              ...styles.buttonContainer,
              backgroundColor: '#84C022',
            }}
            style={{
              color: email === '' ? '#528105' : 'white',
              fontWeight: 'bold',
              paddingTop: 2,
            }}
            disabled={email === ''}
            onPress={handleContinue}>
            Log in
          </Button>
        </View>
        {email !== '' && (
          <View style={{...styles.textUnderButtonView}}>
            <Text style={styles.helpText}>
              By continuing you may receive an SMS for verification.
            </Text>
            <Text style={styles.helpText}>
              Message and data rates may apply.
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};
