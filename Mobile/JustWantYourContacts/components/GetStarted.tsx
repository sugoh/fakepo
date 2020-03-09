import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Pages} from 'react-native-pages';
import Button from 'react-native-button';

// svgs
import Potato from '../assets/potato_2.svg';
import HandwaveWoman from '../assets/handwave_woman.svg';
import OpenBook from '../assets/open_book.svg';
import Celebrate from '../assets/celebrate.svg';
import Cocktail from '../assets/cocktail.svg';
import {SIGN_UP, LOG_IN} from './constants';

type GetStartedProps = {
  switchMode: (mode: string) => void;
};

export default ({switchMode}: GetStartedProps) => {
  const goToSignUp = () => {
    switchMode(SIGN_UP);
  };

  const goToLogIn = () => {
    switchMode(LOG_IN);
  };

  return (
    <View style={styles.baseView}>
      <Pages>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <Potato />
          </View>
          <View style={styles.textView}>
            <Text style={styles.titleText}>superpotato</Text>
            <Text style={styles.normalText}>
              Stay connected with people you care about
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <OpenBook />
          </View>
          <View style={styles.textView}>
            <Text style={styles.secondaryTitleText}>Unified address book</Text>
            <Text style={styles.normalText}>
              Keep all your email, sms, chat app contacts consolidated in one
              place.
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <HandwaveWoman />
          </View>
          <View style={styles.textView}>
            <Text style={styles.secondaryTitleText}>
              Stop losing touch with friends
            </Text>
            <Text style={styles.normalText}>
              Real time data on the strength of your relationships and reminders
              when we think you're losing touch.
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <Celebrate />
          </View>
          <View style={styles.textView}>
            <Text style={styles.secondaryTitleText}>Birthday Reminders</Text>
            <Text style={styles.normalText}>
              We help you keep track of not just birthdays but also all the
              dates important to your relationship like Valentine’s, Mother’s,
              Father’s day etc.
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <Cocktail />
          </View>
          <View style={styles.textView}>
            <Text style={styles.secondaryTitleText}>
              Convenient icebreakers
            </Text>
            <Text style={styles.normalText}>
              Unsure how to reconnect? We use social media data to find
              potential conversation topics - your contact’s college, hobbies
              etc.
            </Text>
          </View>
        </View>
      </Pages>
      <View style={styles.buttonsView}>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#84C022',
          }}
          style={{fontSize: 20, color: 'white'}}
          onPress={goToSignUp}>
          Sign Up
        </Button>
        <Button
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: '#00344A',
          }}
          style={{fontSize: 20, color: '#84C022'}}
          onPress={goToLogIn}>
          Log in
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  secondaryTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  normalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  baseView: {
    flex: 1,
    backgroundColor: '#00344A',
    paddingHorizontal: 24,
  },

  mainView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },

  imageView: {
    marginBottom: 15,
    flexBasis: '50%',
    justifyContent: 'flex-end',
  },

  textView: {
    flexBasis: '30%',
  },

  buttonsView: {
    height: '20%',
    backgroundColor: '#00344A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: 5,
    padding: 10,
    height: 45,
    width: 300,
    overflow: 'hidden',
    borderRadius: 22,
  },
});
