/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Contacts from 'react-native-contacts';

const App = () => {
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Contacts.getAll((err, contacts) => {
        if (err) {
          throw err;
        }
        setAllContacts(contacts);
      });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            throw err;
          } else {
            setAllContacts(contacts);
          }
        });
      });
    }
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contacts</Text>
          {allContacts.map(contact => (
            <Text style={styles.sectionDescription} key={contact.recordID}>
              {' '}
              {contact.givenName + ' ' + contact.familyName}{' '}
            </Text>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default App;
