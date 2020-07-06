import {StyleSheet} from 'react-native';

export const appStyles = StyleSheet.create({
  baseView: {
    flex: 1,
    backgroundColor: '#00344A',
    paddingHorizontal: 24,
  },
});

export const signUpStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },

  closeButtonView: {
    alignSelf: 'flex-start',
    width: '95%',
  },

  textView: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formView: {
    height: '60%',
    width: '80%',
    justifyContent: 'center',
  },

  textInput: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#0B4A65',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 13,
    marginBottom: 15,
  },

  textWithPrefixInput: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#0B4A65',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 13,
    marginBottom: 15,
    flexDirection: 'row',
  },

  buttonsView: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },

  buttonContainer: {
    marginTop: 5,
    padding: 10,
    height: 45,
    width: 300,
    overflow: 'hidden',
    borderRadius: 22,
  },

  textUnderButtonView: {
    marginTop: 10,
  },

  helpText: {
    textAlign: 'center',
    color: '#7B9EAD',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  normalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  prefixText: {
    color: 'white',
    flexBasis: '20%',
    textAlign: 'right',
    marginRight: 5,
  },

  multipleTextInputView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '20%',
    width: '80%',
    justifyContent: 'center',
    borderRadius: 5,
  },

  modalTitle: {
    color: 'black',
    fontWeight: 'bold',
  },

  modalText: {
    color: 'black',
    marginTop: 5,
  },
});

export const logInStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },

  closeButtonView: {
    alignSelf: 'flex-start',
    width: '95%',
  },

  logoView: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formView: {
    height: '20%',
    width: '80%',
    justifyContent: 'center',
  },

  textView: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#0B4A65',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 13,
    marginBottom: 15,
  },

  textWithPrefixInput: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#0B4A65',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 13,
    marginBottom: 15,
    flexDirection: 'row',
  },

  prefixText: {
    color: 'white',
    flexBasis: '20%',
    textAlign: 'right',
    marginRight: 5,
  },

  textUnderButtonView: {
    marginTop: 10,
  },

  multipleTextInputView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonsView: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },

  buttonContainer: {
    marginTop: 5,
    padding: 10,
    height: 45,
    width: 300,
    overflow: 'hidden',
    borderRadius: 22,
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  normalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  helpText: {
    textAlign: 'center',
    color: '#7B9EAD',
  },
});
