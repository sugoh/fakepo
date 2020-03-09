/**
 * Loads main app
 */

import React, {useState} from 'react';
import GetStarted from './GetStarted';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import {GET_STARTED, SIGN_UP, LOG_IN, DASHBOARD} from './constants';
import {View, StyleSheet} from 'react-native';

// TODO: actually take advantage of typescript...for now, ignore

export default () => {
  const [mode, setMode] = useState(SIGN_UP);

  // FIXME: probably can use context for both of these so we don't have to prop drill....
  const cancel = () => {
    setMode(GET_STARTED);
  };

  const switchMode = newMode => {
    setMode(newMode);
  };

  const showMode = () => {
    switch (mode) {
      case GET_STARTED:
        return <GetStarted switchMode={switchMode} />;
      case SIGN_UP:
        return <SignUp cancel={cancel} switchMode={switchMode} />;
      case LOG_IN:
        return <LogIn cancel={cancel} switchMode={switchMode} />;
      case DASHBOARD:
        return <Dashboard />;
    }
  };
  return <View style={styles.baseView}>{showMode()}</View>;
};

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    backgroundColor: '#00344A',
    paddingHorizontal: 24,
  },
});
