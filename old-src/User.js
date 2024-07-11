/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {Address} address - The address of the user.
 * @property {string} phone - The phone number of the user.
 * @property {string} website - The website of the user.
 * @property {Company} company - The company of the user.
 */

/**
 * @typedef {Object} Address
 * @property {string} street - The street of the user's address.
 * @property {string} suite - The suite of the user's address.
 * @property {string} city - The city of the user's address.
 * @property {string} zipcode - The zipcode of the user's address.
 * @property {Geo} geo - The geographical coordinates of the address.
 */

/**
 * @typedef {Object} Company
 * @property {string} name - The name of the user's company.
 * @property {string} catchPhrase - The catchphrase of the user's company.
 * @property {string} bs - The business slogan of the user's company.
 */

/**
 * @typedef {Object} Geo
 * @property {string} lat - The latitude of the address.
 * @property {string} lng - The longitude of the address.
 */

/**
 * Asynchronously retrieves a user object from a JSON placeholder API based on the provided user ID.
 * 
 * @async
 * @function getUser 
 * @param {number} id - The unique identifier for the user to be retrieved. Must not be null or undefined.
 * @returns {Promise<User>} A promise that resolves to the user object associated with the provided ID.
 * @throws {Error} Throws an error if the id parameter is null or undefined.
 * @throws {TypeError} Throws a TypeError if the id parameter is not a number.
 * @throws {Error} Throws an error if the fetch request fails.
 */

export const getUser = async (id) => {
  if (id === null || id === undefined) {
    throw new Error('Id is required');
  }

  if (typeof id !== 'number') {
    throw new TypeError('Id must be a number');
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    /** @type {User} */
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user');
  }
};