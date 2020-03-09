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
import Contacts from 'react-native-contacts';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {cleanContacts} from '../shared/helpers';

const ROOT_URL = 'https://antisocial-network-api.herokuapp.com';

export default () => {
  const [allContacts, setAllContacts] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getEverything = async () => {
      const getAuthToken = async () => {
        const response = await fetch(`${ROOT_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: '{"email": "admin@mail.com", "password": "admin"}',
        });

        const {access_token} = await response.json();
        return access_token;
      };

      setAuthToken(await getAuthToken());

      // check platform os and asks for the necessary permissions
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

          // send to server
          await fetch(`${ROOT_URL}/api/v1/contacts`, {
            method: 'POST',
            headers,
            body: JSON.stringify(cleanedContacts),
          });
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
