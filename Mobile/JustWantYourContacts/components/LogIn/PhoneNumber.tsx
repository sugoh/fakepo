import React, {useState, useEffect} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, Modal} from 'react-native';
import {signUpStyles as styles} from '../styles';

import Potato from '../../assets/potato_2.svg';

type Props = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({phoneNumber, setPhoneNumber, handleContinue}: Props) => {
  const [focusStates, setFocusStates] = useState<FocusState>({
    phoneNumberInput: false,
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
        <View
          style={{
            ...styles.textWithPrefixInput,
            backgroundColor: focusStates['phoneNumberInput']
              ? '#0B4A65'
              : '#00344A',
          }}>
          <Text style={styles.prefixText}>+1</Text>
          <TextInput
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="Phone number"
            placeholderTextColor="#A0BCC8"
            textContentType="telephoneNumber"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={{color: 'white', flexBasis: '65%'}}
            maxLength={10}
            onFocus={() => handleFocus('phoneNumberInput')}
            onBlur={() => handleBlur('phoneNumberInput')}
          />
        </View>
      </View>
      <View style={styles.buttonsView}>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#84C022',
          }}
          style={{
            color: phoneNumber === '' ? '#528105' : 'white',
            fontWeight: 'bold',
            paddingTop: 2,
          }}
          disabled={phoneNumber.length !== 10}
          onPress={handleContinue}>
          Continue
        </Button>
        <View style={styles.textUnderButtonView}>
          <Text style={styles.helpText}>
            By continuing you may receive an SMS for verification.
          </Text>
          <Text style={styles.helpText}>Message and data rates may apply.</Text>
        </View>
      </View>
    </>
  );
};
