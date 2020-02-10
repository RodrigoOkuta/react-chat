export default class Auth {
  /**
   * Authenticate an user. Save a token string in Session Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    sessionStorage.setItem('token', token);
  }

  /**
   * Check if an user is authenticated - check if a token is saved in Session Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return sessionStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate an user. Remove a token from Session Storage.
   */
  static deauthenticateUser() {
    sessionStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return sessionStorage.getItem('token');
  }
}
