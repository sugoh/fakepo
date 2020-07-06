import React, {useState, useRef, useEffect} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal';
import {logInStyles as styles} from '../styles';
import {formatPhoneNumber} from '../shared/helpers';

const WAIT_TIME = 10;

type Props = {
  oneTimeCode: string;
  phoneNumber: string;
  email: string;
  setOneTimeCode: React.Dispatch<React.SetStateAction<string>>;
  sendOneTimeCodeToPhone: () => void;
  handleContinue: () => void;
  isLoading: boolean;
};

type FocusState = {
  [key: string]: boolean;
};

export default ({
  oneTimeCode,
  phoneNumber,
  email,
  setOneTimeCode,
  sendOneTimeCodeToPhone,
  handleContinue,
  isLoading,
}: Props) => {
  const [isResent, setIsResent] = useState<boolean>(false);
  const [count, setCount] = useState<number>(WAIT_TIME);
  const [timerID, setTimerID] = useState<number | null>(null);
  const [splitOneTimeCode, setSplitOneTimeCode] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [focusStates, setFocusStates] = useState<FocusState>({
    oneTimeCodeInput1: false,
    oneTimeCodeInput2: false,
    oneTimeCodeInput3: false,
    oneTimeCodeInput4: false,
    oneTimeCodeInput5: false,
    oneTimeCodeInput6: false,
  });

  const oneTimeCodeInput1 = useRef<TextInput>(null);
  const oneTimeCodeInput2 = useRef<TextInput>(null);
  const oneTimeCodeInput3 = useRef<TextInput>(null);
  const oneTimeCodeInput4 = useRef<TextInput>(null);
  const oneTimeCodeInput5 = useRef<TextInput>(null);
  const oneTimeCodeInput6 = useRef<TextInput>(null);

  const allRefs = [
    oneTimeCodeInput1,
    oneTimeCodeInput2,
    oneTimeCodeInput3,
    oneTimeCodeInput4,
    oneTimeCodeInput5,
    oneTimeCodeInput6,
  ];

  const countDown = () => {
    const id = setInterval(() => {
      if (count > 0) {
        setCount((count) => count - 1);
      }
    }, 1000);
    setTimerID(id);
  };

  useEffect(() => {
    if (count === WAIT_TIME) {
      countDown();
    }
  }, [count]);

  useEffect(() => {
    if (timerID === null) return;
    else if (timerID && count === 0) {
      clearInterval(timerID);
      setTimerID(null);
    }
    return () => clearInterval(timerID);
  }, [timerID]);

  const handleResetTimer = () => {
    sendOneTimeCodeToPhone();
    setIsResent(true);
    setCount(WAIT_TIME);
  };

  const handleFocus = (focusID: string) => {
    setFocusStates({...focusStates, [focusID]: true});
  };

  const handleBlur = (focusID: string) => {
    setFocusStates({...focusStates, [focusID]: false});
  };

  const onChange = (text: string, pos: number) => {
    const newSplitOneTimeCode = [...splitOneTimeCode];
    const textToInt = Number.parseInt(text, 10);

    if (Number.isNaN(textToInt)) {
      newSplitOneTimeCode[pos] = null;
    } else {
      newSplitOneTimeCode[pos] = textToInt;
    }

    setSplitOneTimeCode(newSplitOneTimeCode);
    setOneTimeCode(newSplitOneTimeCode.join(''));

    if (text.length === 1) {
      if (pos < 5) {
        allRefs[pos + 1].current?.focus();
      }
    } else if (text.length === 0) {
      if (pos > 0) {
        allRefs[pos - 1].current?.focus();
      }
    }
  };

  return (
    <>
      <View style={styles.textView}>
        <Text style={styles.titleText}>Enter verification code</Text>
        {!isResent ? (
          <>
            <Text style={{...styles.normalText, marginTop: 5}}>
              Enter the 6-digit code sent to you
            </Text>
            <Text style={{...styles.normalText, marginTop: 5}}>
              at {formatPhoneNumber(phoneNumber) || email}
            </Text>
          </>
        ) : (
          <>
            <Text style={{...styles.normalText, marginTop: 5}}>
              SMS re-sent. It might take up to a minute
            </Text>
            <Text style={{...styles.normalText, marginTop: 5}}>to arrive.</Text>
          </>
        )}
      </View>
      <View style={styles.formView}>
        <View style={styles.multipleTextInputView}>
          <TextInput
            ref={oneTimeCodeInput1}
            onChangeText={(text) => onChange(text, 0)}
            value={splitOneTimeCode[0]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput1']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput1')}
            onBlur={() => handleBlur('oneTimeCodeInput1')}
          />
          <TextInput
            ref={oneTimeCodeInput2}
            onChangeText={(text) => onChange(text, 1)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                allRefs[0].current?.focus();
              }
            }}
            value={splitOneTimeCode[1]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput2']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput2')}
            onBlur={() => handleBlur('oneTimeCodeInput2')}
          />
          <TextInput
            ref={oneTimeCodeInput3}
            onChangeText={(text) => onChange(text, 2)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                allRefs[1].current?.focus();
              }
            }}
            value={splitOneTimeCode[2]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput3']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput3')}
            onBlur={() => handleBlur('oneTimeCodeInput3')}
          />
          <TextInput
            ref={oneTimeCodeInput4}
            onChangeText={(text) => onChange(text, 3)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                allRefs[2].current?.focus();
              }
            }}
            value={splitOneTimeCode[3]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput4']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput4')}
            onBlur={() => handleBlur('oneTimeCodeInput4')}
          />
          <TextInput
            ref={oneTimeCodeInput5}
            onChangeText={(text) => onChange(text, 4)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                allRefs[3].current?.focus();
              }
            }}
            value={splitOneTimeCode[4]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput5']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput5')}
            onBlur={() => handleBlur('oneTimeCodeInput5')}
          />
          <TextInput
            ref={oneTimeCodeInput6}
            onChangeText={(text) => onChange(text, 5)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                allRefs[4].current?.focus();
              }
            }}
            value={splitOneTimeCode[5]?.toString()}
            placeholderTextColor="#A0BCC8"
            style={{
              ...styles.textInput,
              flexBasis: '14%',
              backgroundColor: focusStates['oneTimeCodeInput6']
                ? '#0B4A65'
                : '#00344A',
            }}
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={1}
            onFocus={() => handleFocus('oneTimeCodeInput6')}
            onBlur={() => handleBlur('oneTimeCodeInput6')}
          />
        </View>
      </View>
      <KeyboardAvoidingView behavior="position" style={styles.buttonsView}>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#84C022',
          }}
          style={{
            color: oneTimeCode.length !== 6 ? '#528105' : 'white',
            fontWeight: 'bold',
            paddingTop: 2,
          }}
          disabled={oneTimeCode.length !== 6}
          onPress={handleContinue}>
          Continue
        </Button>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#00344A',
          }}
          style={{
            color: '#7FBF16',
          }}
          onPress={handleResetTimer}
          disabled={count > 0}>
          Resend code {count > 0 && `in ${count}s`}
        </Button>
      </KeyboardAvoidingView>
      <Modal isVisible={isLoading}>
        <View>
          <Text>HEYU</Text>
        </View>
      </Modal>
    </>
  );
};
