
import React, { createContext, useContext, useState } from 'react';

/**
 * @import { UserType } from './Components/User/get'
 */

/**
 * @typedef {Object} UserContextType
 * @memberof User
 * @property {UserType[]} user - The current user's data.
 * @property {Function} cacheUser - Function to update the current user's data.
 * @property {Function} getUser - Function to retrieve user data from the cache.
 */

/**
 * @type {React.Context<UserContextType>}
 * @memberof User
 * @description Context to store and cache user data to minimize requests.
 */
const UserContext = createContext({ user: [], getUser: () => {}, cacheUser: () => {} });

/**
 * UserProvider Component.
 * Encapsulates children components to provide them access to the UserContext.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child nodes to render inside the provider.
 * @returns {React.ReactElement} The provider component.
 * @memberof User
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(/** @type {UserType[]} */([]));

  /**
   * Get user data from the cache.
   * 
   * @memberof User
   * @param {number} id - The unique identifier for the user.
   * @returns {UserType} The user data.
   */
  const getUser = (id) => {
    return user.find((u) => u.id === id);
  };

  /**
   * Save user data to the cache if data is not already present.
   * 
   * @memberof User
   * @param {UserType} newUser 
   * @returns {void}
   */
  const cacheUser = (newUser) => {
    if (!getUser(newUser.id)) {
      setUser([...user, newUser]);
    }
  };

  return (
	<UserContext.Provider value={{ user, getUser, cacheUser }}>
    {children}
	</UserContext.Provider>
  );
};

/**
 * Custom hook to use the UserContext.
 * 
 * @memberof User
 * @returns {UserContextType} The current user context.
 */
export const useUser = () => useContext(UserContext);


