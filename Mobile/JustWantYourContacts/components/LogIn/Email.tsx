import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput} from 'react-native';
import {signUpStyles as styles} from '../styles';

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
        <Text style={styles.titleText}>Last step!</Text>
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
          autoCorrect={false}
          onFocus={() => handleFocus('emailInput')}
          onBlur={() => handleBlur('emailInput')}
        />
      </View>
      <View style={styles.buttonsView}>
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
          Continue
        </Button>
      </View>
    </>
  );
};
