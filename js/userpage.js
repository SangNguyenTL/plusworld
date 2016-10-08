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
 * Handles the User Profile UI.
 */
vnb.UserPage = class {

  /**
   * Initializes the user's profile UI.
   * @constructor
   */

  constructor() {
    // Firebase SDK.
    this.database = firebase.database();
    this.auth = firebase.auth();
	this._GET = {};
	location.search.substr(1).split("&").forEach(function(item) {this._GET[item.split("=")[0]] = item.split("=")[1]});
    $(document).ready(() => {
      // DOM Elements.
      this.userAvatar = $('.profile-userpic .img-responsive');
      this.userUsername = $('.profile-usertitle-name');
      this.userLinkSettingProfile = $('.link-account-setting');
	  this.userTasks = $('.link-user-task');

      // Event bindings.
      loadUser(this._GET["uid"]);
    });
  }


  /**
   * Displays the given user information in the UI.
   */
  loadUser(userId) {
    this.userId = userId;

    // Reset the UI.
    this.clear();

    // If users is the currently signed-in user we hide the "Follow" Checkbox.
    if (this.auth.currentUser && userId === this.auth.currentUser.uid) {
      this.userLinkSettingProfile.hide();
      this.userTasks.hide();
    } else {
      this.userLinkSettingProfile.show();
      this.userTasks.show();
    }

    // Load user's profile.
    vnb.firebase.loadUserProfile(userId).then(snapshot => {
      const userInfo = snapshot.val();
      if (userInfo) {
        this.userAvatar.attr('src',
            `${userInfo.profile_picture || 'https://lh3.googleusercontent.com/-Mbql_y7O1uU/V_jWZZ4dPeI/AAAAAAAFVJw/x3zTVFfRJgk/s0/user.png'}`);
        this.userUsername.text(userInfo.full_name || 'Anonymous');

      } else {
        var data = {
          message: 'This user does not exists.',
          timeout: 5000
        };
		window.location.href = "http://"+window.location.hostname;
      }
    });
  }

  /**
   * Clears the UI and listeners.
   */
  clear() {
    
  }

};

vnb.userPage = new vnb.UserPage();
