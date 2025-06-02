export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  // Check if it's a valid card number (16 digits)
  return /^\d{16}$/.test(cleanNumber);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  // Format: MM/YY
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiryDate)) return false;

  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  // Check if the card is expired
  if (parseInt(year) < currentYear || 
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    return false;
  }

  return true;
};

export const validateCVV = (cvv: string): boolean => {
  // CVV should be 3 or 4 digits
  return /^\d{3,4}$/.test(cvv);
};

export const validatePostalCode = (postalCode: string): boolean => {
  // Indian postal code format (6 digits)
  return /^\d{6}$/.test(postalCode);
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Indian phone number format (10 digits)
  return /^\d{10}$/.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
}; 