import React, { createContext, useContext, useState } from 'react';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [account, setAccount] = useState('');

  // Function to update account value
  const updateAccount = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <AccountContext.Provider value={{ account, updateAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}