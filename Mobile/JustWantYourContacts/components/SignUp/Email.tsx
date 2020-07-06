import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal';
import {signUpStyles as styles} from '../styles';

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleContinue: () => void;
  isTakenEmail: boolean;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({email, setEmail, handleContinue, isTakenEmail}: Props) => {
  const [focusStates, setFocusStates] = useState<FocusState>({
    emailInput: false,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);

  const checkEmailAndContinue = () => {
    const result = email.match(/[^@]+@[^\.]+\..+/g);

    if (result) {
      handleContinue();
    } else {
      setIsOpen(true);
      setIsInvalidEmail(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
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
        <Text style={styles.titleText}>Last step!</Text>
        <Text style={{...styles.normalText, marginTop: 5}}>
          What is your email address?
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
          onPress={checkEmailAndContinue}>
          Continue
        </Button>
      </KeyboardAvoidingView>
      <Modal style={{alignItems: 'center'}} isVisible={isOpen}>
        <View style={styles.modalView}>
          {isInvalidEmail ? (
            <>
              <Text style={styles.modalTitle}>Invalid email</Text>
              <Text style={styles.modalText}>
                Please enter a valid email address
              </Text>
              <Button
                containerStyle={{
                  ...styles.buttonContainer,
                  marginTop: 30,
                  backgroundColor: '#84C022',
                  width: '70%',
                }}
                style={{
                  color: email === '' ? '#528105' : 'white',
                  fontWeight: 'bold',
                  paddingTop: 2,
                }}
                disabled={email === ''}
                onPress={closeModal}>
                Ok
              </Button>
            </>
          ) : (
            isTakenEmail && (
              <>
                <Text style={styles.modalTitle}>Email already taken</Text>
                <Text style={styles.modalText}>
                  Please enter another email address
                </Text>
                <Button
                  containerStyle={{
                    ...styles.buttonContainer,
                    marginTop: 30,
                    backgroundColor: '#84C022',
                    width: '70%',
                  }}
                  style={{
                    color: email === '' ? '#528105' : 'white',
                    fontWeight: 'bold',
                    paddingTop: 2,
                  }}
                  disabled={email === ''}
                  onPress={closeModal}>
                  Ok
                </Button>
              </>
            )
          )}
        </View>
      </Modal>
    </>
  );
};
