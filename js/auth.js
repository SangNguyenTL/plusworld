/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

window.vnb = window.vnb || {};

/**
 * Handles the user auth flows and updating the UI depending on the auth state.
 */
vnb.Auth = class {

  /**
   * Returns a Promise that completes when auth is ready.
   * @return Promise
   */
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

  /**
   * Initializes Friendly Pix's auth.
   * Binds the auth related UI components and handles the auth flow.
   * @constructor
   */
  constructor() {
    // Firebase SDK
    this.database = vnb.firebase.database;
    this.auth = vnb.firebase.auth;
    this._waitForAuthPromiseResolver = new $.Deferred();

    $(document).ready(() => {
      // Pointers to DOM Elements
      const signedInUserContainer = $('.fp-signed-in-user-container');
      this.signedInUserAvatar = $('.fp-avatar', signedInUserContainer);
      this.signedInUsername = $('.fp-username', signedInUserContainer);
      this.signOutButton = $('.fp-sign-out');
      this.signedOutOnlyElements = $('.fp-signed-out-only');
      this.signedInOnlyElements = $('.fp-signed-in-only');
      this.usernameLink = $('.fp-usernamelink');

      // Event bindings
      this.signOutButton.click(() => this.auth.signOut());
      this.signedInOnlyElements.hide();
    });
	console.log("Start");
    this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
  }

  /**
   * Displays the signed-in user information in the UI or hides it and displays the
   * "Sign-In" button if the user isn't signed-in.
   */
  onAuthStateChanged(user) {
    // We ignore token refresh events.
    if (user && this.userId === user.uid) {
      return;
    }

    if (window.vnb.router) {
      window.vnb.router.reloadPage();
    }
    this._waitForAuthPromiseResolver.resolve();
    $(document).ready(() => {
      if (!user) {
        this.signedOutOnlyElements.show();
        this.signedInOnlyElements.hide();
        this.userId = null;
        this.signedInUserAvatar.src('http://truyen.vnsharing.site/views/public/imgs/noavatar_blue.jpg');
		console.log(uiConfig);
        firebaseUi.start('#firebaseui-auth-container', uiConfig);
      } else {
		  console.log("A");
        this.signedOutOnlyElements.hide();
        this.signedInOnlyElements.show();
        this.userId = user.uid;
        this.signedInUserAvatar.src("${user.photoURL || 'http://truyen.vnsharing.site/views/public/imgs/noavatar_blue.jpg'}");
        this.signedInUsername.text(user.displayName || 'Anonymous');
        this.usernameLink.attr('href', `/user/${user.uid}`);
        vnb.firebase.saveUserData(user.photoURL, user.displayName);
      }
    });
  }
};

vnb.auth = new vnb.Auth();
