/**
 * Loads main app
 * 
 * At the moment, it 
 *  - gets the auth token (which could refactored/moved a login screen)
 *  - tries to send the contacts to the server (currently API giving 500 error,
 *    maybe something wrong with data being sent)
 * 
 * TODO:
 *  - fix contacts upload
 *  - fix unnecessary rerenders
 *  - refactor/clean up code
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
import axios from 'axios';
import Contacts from 'react-native-contacts';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {cleanContacts} from './helpers.js';

const ROOT_URL = 'https://antisocial-network-api.herokuapp.com';

const App = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getEverything = async () => {
      const getAuthToken = async () => {
        const response = await axios.post(
          `${ROOT_URL}/auth/login`,
          '{"email": "admin@mail.com", "password": "admin"}',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data.access_token;
      };

      setAuthToken(await getAuthToken());

      if (Platform.OS === 'ios') {
        Contacts.getAll((err, contacts) => {
          if (err) {
            throw err;
          }
          setAllContacts(contacts);
        });
      } else if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message:
              'This app would like to view your contacts and upload them to the server.',
          },
        ).then(() => {
          Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
              throw err;
            } else {
              setAllContacts(contacts);
            }
          });
        });
      }
    };

    getEverything();
  }, []);

  useEffect(() => {
    const getEverything = async () => {
      if (allContacts.length > 0) {
        const sendContactsToServer = async (authToken, allContacts) => {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          };

          // should be userId where it's hardcoded 1
          const cleanedContacts = cleanContacts(1, allContacts);
          console.log(cleanedContacts);

          const createContactsResponse = await axios.post(
            `${ROOT_URL}/api/v1/contacts`,
            JSON.stringify(cleanedContacts),
            {
              headers,
            },
          );

          console.log(createContactsResponse.response);
        };

        await sendContactsToServer(authToken, allContacts);
      }
    };

    getEverything();
  }, [authToken, allContacts]);

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
