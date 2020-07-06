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
  switchMode: (mode: Mode) => void;
};

enum Steps {
  FIRST_AND_LAST_NAME = 'FIRST_AND_LAST_NAME',
  PHONE_NUMBER = 'PHONE_NUMBER',
  ONE_TIME_CODE = 'ONE_TIME_CODE',
  EMAIL = 'EMAIL',
}

// TODO:
// check if email used or valid
// add loading spinner

export default ({cancel, switchMode}: SignUpProps) => {
  const [step, setStep] = useState<Steps>(Steps.FIRST_AND_LAST_NAME);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [oneTimeCode, setOneTimeCode] = useState<string>('');
  const [isTakenEmail, setIsTakenEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSignUp = async () => {
    // TODO: send everything off to the API
    console.log('signing up');
    return {accessToken: 'fakeToken'};
  };

  const addEmailToProfile = async (emailAddress: string) => {
    try {
      // await fetch(`${ROOT_URL}/auth/sms-challenge`, {
      //   method: 'POST',
      //   headers: {'Content-Type': 'Application/json'},
      //   body: `{"phone": "+1${phoneNumber}"}`,
      // });
      // TODO: send email
    } catch (err) {
      console.log(err);
    }
  };

  const handleContinue = async () => {
    if (step === Steps.FIRST_AND_LAST_NAME) {
      if (firstName === '' || lastName === '') return;
      setStep(Steps.PHONE_NUMBER);
    } else if (step === Steps.PHONE_NUMBER) {
      if (phoneNumber === '') return;
      await sendOneTimeCodeToPhone();
      setStep(Steps.ONE_TIME_CODE);
    } else if (step === Steps.ONE_TIME_CODE) {
      if (oneTimeCode === '') return;
      setLoading(true);
      const accessToken = await handleSignUp();
      setLoading(false);

      if (!accessToken) return;
      setStep(Steps.EMAIL);
    } else if (step === Steps.EMAIL) {
      if (email === '') return;
      setLoading(true);
      const res = await addEmailToProfile(email);
      setLoading(false);

      switchMode(Mode.DASHBOARD);
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
          sendOneTimeCodeToPhone={sendOneTimeCodeToPhone}
          handleContinue={handleContinue}
          isLoading={loading}
        />
      ) : step === Steps.EMAIL ? (
        <Email
          email={email}
          setEmail={setEmail}
          handleContinue={handleContinue}
          isTakenEmail={isTakenEmail}
        />
      ) : null}
    </SafeAreaView>
  );
};
