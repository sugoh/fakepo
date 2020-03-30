/**
 * Loads main app
 */

import React, {useState} from 'react';
import {View} from 'react-native';

import GetStarted from './GetStarted';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';
import {appStyles as styles} from './styles';

export enum Mode {
  GET_STARTED = 'GET_STARTED',
  SIGN_UP = 'SIGN_UP',
  LOG_IN = 'LOG_IN',
}

export default () => {
  const [mode, setMode] = useState(Mode.SIGN_UP);

  const cancel = () => {
    setMode(Mode.GET_STARTED);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <View style={styles.baseView}>
      {mode === Mode.GET_STARTED ? (
        <GetStarted switchMode={switchMode} />
      ) : mode === Mode.SIGN_UP ? (
        <SignUp cancel={cancel} />
      ) : mode === Mode.LOG_IN ? (
        <LogIn cancel={cancel} />
      ) : null}
    </View>
  );
};
