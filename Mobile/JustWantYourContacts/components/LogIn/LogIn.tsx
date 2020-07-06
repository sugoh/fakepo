import React, {useState} from 'react';
import Button from 'react-native-button';
import {View, Text, TextInput, SafeAreaView, Modal} from 'react-native';

import CloseButton from '../../assets/closeButton.svg';
import BackButton from '../../assets/backButton.svg';
import LoadingSpinner from '../../assets/spinner.svg';

import PhoneNumber from './PhoneNumber';
import OneTimeCode from './OneTimeCode';
import Email from './Email';
import {Mode} from '../App';

import {ROOT_URL} from '../constants';

import {logInStyles as styles} from '../styles';

type LogInProps = {
  cancel: () => void;
  switchMode: (mode: Mode) => void;
};

export enum Steps {
  PHONE_NUMBER = 'PHONE_NUMBER',
  ONE_TIME_CODE = 'ONE_TIME_CODE',
  EMAIL = 'EMAIL',
}

export default ({cancel, switchMode}: LogInProps) => {
  const [step, setStep] = useState<Steps>(Steps.PHONE_NUMBER);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oneTimeCode, setOneTimeCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (step === Steps.PHONE_NUMBER) {
      await sendOneTimeCodeToPhone();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.EMAIL) {
      await sendOneTimeCodeToPhone();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.ONE_TIME_CODE) {
      setLoading(true);
      const accessToken = await login();
      if (!accessToken) return;
      setLoading(false);
      switchMode(Mode.DASHBOARD);
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

  const sendOneTimeCodeToPhone = async () => {
    try {
      await fetch(`${ROOT_URL}/auth/sms-challenge`, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: `{"phone": "+1${phoneNumber}"}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    try {
      const response = await fetch(`${ROOT_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: `{"phone": +1${phoneNumber},  "code": "${oneTimeCode}"}`,
      });

      console.log(response);

      const {authToken, user_id} = await response.json();

      return {authToken, user_id};
    } catch (err) {
      console.log(err);
    }
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
            setStep={setStep}
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
            sendOneTimeCodeToPhone={sendOneTimeCodeToPhone}
            phoneNumber={phoneNumber}
            email={email}
            handleContinue={handleContinue}
            isLoading={loading}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};
