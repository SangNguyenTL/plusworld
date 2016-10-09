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
	var $_GET = this.$_GET();
    $(document).ready(() => {
      // DOM Elements.
	  $(".post-page").html(this.buidHtml());
      this.userAvatar = $('.profile-userpic .img-responsive');
      this.userUsername = $('.profile-usertitle-name');
      this.userLinkSettingProfile = $('.link-account-setting');
	  this.userTasks = $('.link-user-task');
	  this.position = $('.profile-usertitle-job');
	  this.navUserPage = $('.nav.user-page');
      // Event bindings.
      this.loadUser($_GET["uid"]);
    });
  }
  $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
  }

  /**
   * Displays the given user information in the UI.
   */
  loadUser(userId) {
	  
	if(userId == undefined && window.location.pathname.match(/profile/))
	{
		window.location.href = "http://"+window.location.hostname;
		return
	}
	
	if(userId == undefined){
		return
	}
    this.userId = userId;

    // Reset the UI.
    this.clear();


    // Load user's profile.
    vnb.firebase.loadUserProfile(userId).then(snapshot => {
      const userInfo = snapshot.val();
	  this.userInfo = userInfo;
      if (userInfo) {
        this.userAvatar.attr('src',
            `${userInfo.profile_picture || 'https://lh3.googleusercontent.com/-Mbql_y7O1uU/V_jWZZ4dPeI/AAAAAAAFVJw/x3zTVFfRJgk/s0/user.png'}`);
        this.userUsername.text(userInfo.full_name || 'Anonymous');
		vnb.firebase.loadNameUserPositions().then(snapshot => {
			if(snapshot.val())
			this.position.text(snapshot.val()[this.userInfo.positions[0]]);
		});
		  var liElement = '<li class="active">'+
							'<a href="#Overview">'+
							'<i class="glyphicon glyphicon-home"></i>'+
							'Overview </a>'+
						   '</li>';
		  if(this.auth.currentUser && userId === this.auth.currentUser.uid || Object.values().indexOf(0))
			  liElement += '<li>'+
							'<a href="#Account_Settings">'+
							'<i class="glyphicon glyphicon-user"></i>'+
							'Account Settings </a>'+
						   '</li>';
		  else
			vnb.firebase.loadUserPositions(this.auth.currentUser.uid).then(snapshot => {
				if(snapshot.val() && snapshot.val().indexOf(0) != -1){
					liElement += '<li>'+
						'<a href="#Account_Settings">'+
						'<i class="glyphicon glyphicon-user"></i>'+
						'Account Settings </a>'+
					   '</li>';
				}
			});
		
		this.navUserPage.html(liElement);   
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
  buidHtml(){
	  return '<div class="container"><div class="row profile"><div class="col-md-3"><div class="profile-sidebar"><div class="profile-userpic"><img alt="" class="img-responsive" src="" /></div><div class="profile-usertitle"><div class="profile-usertitle-name"></div><div class="profile-usertitle-job"></div></div><div class="profile-userbuttons"><button class="btn btn-success btn-sm" type="button">Follow</button><button class="btn btn-danger btn-sm" type="button">Message</button></div><div class="profile-usermenu"><ul class="nav user-page"></ul></div></div></div><div class="col-md-9"><div class="profile-content"></div></div></div></div>';
  }
};

vnb.userPage = new vnb.UserPage();
