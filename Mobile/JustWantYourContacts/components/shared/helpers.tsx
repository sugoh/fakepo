export const formatPhoneNumber = (phone: string) => {
  return (
    phone.slice(0, 3) +
    (phone[3] !== undefined ? ' ' + phone.slice(3, 6) : '') +
    (phone[6] !== undefined ? ' ' + phone.slice(6) : '')
  );
};
