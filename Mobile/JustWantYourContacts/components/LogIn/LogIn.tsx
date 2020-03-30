import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, SafeAreaView, Modal} from 'react-native';

import CloseButton from '../../assets/closeButton.svg';
import BackButton from '../../assets/backButton.svg';
import LoadingSpinner from '../../assets/spinner.svg';

import PhoneNumber from './PhoneNumber';
import OneTimeCode from './OneTimeCode';
import Email from './Email';

import {ROOT_URL} from '../constants';

import {logInStyles as styles} from '../styles';

type LogInProps = {
  cancel: () => void;
};

enum Steps {
  PHONE_NUMBER = 'PHONE_NUMBER',
  ONE_TIME_CODE = 'ONE_TIME_CODE',
  EMAIL = 'EMAIL',
}

export default ({cancel}: LogInProps) => {
  const [step, setStep] = useState<Steps>(Steps.PHONE_NUMBER);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oneTimeCode, setOneTimeCode] = useState('');
  const [systemOneTimeCode, setSystemOneTimeCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (step === Steps.PHONE_NUMBER) {
      await getOneTimeCode();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.EMAIL) {
      await getOneTimeCode();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.ONE_TIME_CODE) {
      await checkOneTimeCode();
    }
  };

  const handleBack = () => {
    if (step === Steps.ONE_TIME_CODE) {
      setStep(Steps.PHONE_NUMBER);
    }
    if (step === Steps.EMAIL) {
      setStep(Steps.PHONE_NUMBER);
    }
  };

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

  const login = () => {
    setLoading(true);
    // TODO: actually talk to the API
  };

  const forgotLogin = () => {
    // TODO: implement
  };

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.closeButtonView}>
          {step === Steps.PHONE_NUMBER ? (
            <Button onPress={cancel}>
              <CloseButton />
            </Button>
          ) : (
            <Button onPress={handleBack}>
              <BackButton />
            </Button>
          )}
        </View>
        {step === Steps.PHONE_NUMBER ? (
          <PhoneNumber
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleContinue={handleContinue}
          />
        ) : step === Steps.EMAIL ? (
          <Email
            email={email}
            setEmail={setEmail}
            handleContinue={handleContinue}
          />
        ) : step === Steps.ONE_TIME_CODE ? (
          <OneTimeCode
            oneTimeCode={oneTimeCode}
            setOneTimeCode={setOneTimeCode}
            phoneNumber={phoneNumber}
            handleContinue={handleContinue}
          />
        ) : null}
      </SafeAreaView>
      {loading && <Modal />}
    </>
  );
};
