/**
 * Extracts and remoulds the data to fit API specs for
 * contacts upload
 * 
 */
export const cleanContacts = (user_id = 1, contacts) => {
  return contacts.map(c => {
    const first_name = c.givenName;
    const last_name = c.familyName;
    const mobileEntry = c.phoneNumbers.find(n => n.label === 'mobile');
    const phone = mobileEntry ? mobileEntry.number : undefined;

    const workEntry = c.emailAddresses.find(e => e.label === 'work')
    const personalEntry = c.emailAddresses.find(e => e.label === 'home')

    const email_personal = personalEntry ? personalEntry.email : undefined;
    const email_work = workEntry ? workEntry.email : undefined;

    return {
      user_id,
      first_name,
      last_name,
      phone,
      email_personal,
      email_work
    };
  });
};
