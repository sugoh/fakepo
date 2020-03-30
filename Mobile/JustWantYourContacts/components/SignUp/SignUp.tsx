import React, {useState, useEffect} from 'react';
import Button from 'react-native-button';
import {SafeAreaView, View, Text, TextInput} from 'react-native';

import CloseButton from '../../assets/closeButton.svg';
import BackButton from '../../assets/backButton.svg';
import LoadingSpinner from '../../assets/spinner.svg';

import {ROOT_URL} from '../constants';

import {signUpStyles as styles} from '../styles';

import FirstAndLastName from './FirstAndLastName';
import PhoneNumber from './PhoneNumber';
import OneTimeCode from './OneTimeCode';
import Email from './Email';
import {Mode} from '../App';

type SignUpProps = {
  cancel: () => void;
};

enum Steps {
  FIRST_AND_LAST_NAME = 'FIRST_AND_LAST_NAME',
  PHONE_NUMBER = 'PHONE_NUMBER',
  ONE_TIME_CODE = 'ONE_TIME_CODE',
  EMAIL = 'EMAIL',
}

// TODO:
// check if email used
// check phone number
// add loading spinner

export default ({cancel}: SignUpProps) => {
  // TODO: turn all of these states into a custom hook

  const [step, setStep] = useState(Steps.FIRST_AND_LAST_NAME);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oneTimeCode, setOneTimeCode] = useState('');
  const [systemOneTimeCode, setSystemOneTimeCode] = useState('');
  const [loading, setLoading] = useState(false);

  const getOneTimeCode = async () => {
    try {
      const response = await fetch(`${ROOT_URL}/auth/sms-challenge`, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: `{"phone": ${phoneNumber}}`,
      });

      const {code} = await response.json();

      setSystemOneTimeCode(code);
    } catch (err) {
      console.log(err);
    }
  };

  const checkOneTimeCode = async () => {
    try {
      if (oneTimeCode === systemOneTimeCode) return;
      const response = await fetch(`${ROOT_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: `{"phone": ${phoneNumber},  "code": ${oneTimeCode}}`,
      });

      const {authToken, userId} = await response.json();

      return {authToken, userId};
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {
    // TODO: send everything off to the API
    console.log('signing up');
  };

  const handleContinue = async () => {
    if (step === Steps.FIRST_AND_LAST_NAME) {
      if (firstName === '' || lastName === '') return;
      setStep(Steps.PHONE_NUMBER);
    } else if (step === Steps.PHONE_NUMBER) {
      if (phoneNumber === '') return;
      await getOneTimeCode();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.ONE_TIME_CODE) {
      if (oneTimeCode === '') return;
      const accessToken = await checkOneTimeCode();
      if (!accessToken) return;
      // we'll need to display an error message and let them request a resend here instead of blocking
      setStep(Steps.EMAIL);
    } else if (step === Steps.EMAIL) {
      if (email === '') return;
      handleSignUp();
    }
  };

  const handleBack = () => {
    if (step === Steps.EMAIL) {
      setStep(Steps.PHONE_NUMBER);
    } else if (step === Steps.ONE_TIME_CODE) {
      setStep(Steps.PHONE_NUMBER);
    } else if (step === Steps.PHONE_NUMBER) {
      setStep(Steps.FIRST_AND_LAST_NAME);
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.closeButtonView}>
        {step === Steps.FIRST_AND_LAST_NAME || step === Steps.EMAIL ? (
          <Button onPress={cancel}>
            <CloseButton />
          </Button>
        ) : (
          <Button onPress={handleBack}>
            <BackButton />
          </Button>
        )}
      </View>
      {step === Steps.FIRST_AND_LAST_NAME ? (
        <FirstAndLastName
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleContinue={handleContinue}
        />
      ) : step === Steps.PHONE_NUMBER ? (
        <PhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleContinue={handleContinue}
        />
      ) : step === Steps.ONE_TIME_CODE ? (
        <OneTimeCode
          oneTimeCode={oneTimeCode}
          phoneNumber={phoneNumber}
          setOneTimeCode={setOneTimeCode}
          handleContinue={handleContinue}
        />
      ) : step === Steps.EMAIL ? (
        <Email
          email={email}
          setEmail={setEmail}
          handleContinue={handleContinue}
        />
      ) : null}
    </SafeAreaView>
  );
};
