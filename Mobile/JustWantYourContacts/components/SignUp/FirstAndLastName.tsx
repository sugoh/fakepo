import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {signUpStyles as styles} from '../styles';

type Props = {
  firstName: string;
  lastName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  handleContinue,
}: Props) => {
  const [focusStates, setFocusStates] = useState<FocusState>({
    firstNameInput: false,
    lastNameInput: false,
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
        <Text style={styles.titleText}>Welcome!</Text>
        <Text style={{...styles.normalText, marginTop: 5}}>
          What is your name?
        </Text>
      </View>
      <View style={styles.formView}>
        <TextInput
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="First name"
          placeholderTextColor="#A0BCC8"
          style={{
            ...styles.textInput,
            backgroundColor: focusStates['firstNameInput']
              ? '#0B4A65'
              : '#00344A',
          }}
          textContentType="givenName"
          keyboardAppearance="dark"
          autoCapitalize="words"
          autoCorrect={false}
          onFocus={() => handleFocus('firstNameInput')}
          onBlur={() => handleBlur('firstNameInput')}
        />
        <TextInput
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Last name"
          placeholderTextColor="#A0BCC8"
          style={{
            ...styles.textInput,
            backgroundColor: focusStates['lastNameInput']
              ? '#0B4A65'
              : '#00344A',
          }}
          textContentType="familyName"
          keyboardAppearance="dark"
          autoCapitalize="words"
          autoCorrect={false}
          onFocus={() => handleFocus('lastNameInput')}
          onBlur={() => handleBlur('lastNameInput')}
        />
      </View>
      <KeyboardAvoidingView behavior="position" style={{...styles.buttonsView}}>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#84C022',
          }}
          style={{
            color: firstName === '' || lastName === '' ? '#528105' : 'white',
            fontWeight: 'bold',
            paddingTop: 2,
          }}
          disabled={firstName === '' || lastName === ''}
          onPress={handleContinue}>
          Continue
        </Button>
      </KeyboardAvoidingView>
    </>
  );
};
