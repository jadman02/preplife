
var f_token;
var f_uid;
var myApp = new Framework7();
var $$ = Dom7;
var view1, view2, view3;
var user_offers;
// Export selectors engine




/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var firebaseinit;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        
               cordova.plugins.stripe.setPublishableKey('pk_test_enX3otYbJ4O0lN1xkkx9iOSZ');

    var card = {
  number: '4242424242424242', // 16-digit credit card number
  expMonth: 12, // expiry month
  expYear: 2020, // expiry year
  cvc: '220', // CVC / CCV
  name: 'John Smith', // card holder name (optional)
  address_line1: '123 Some Street', // address line 1 (optional)
  address_line2: 'Suite #220', // address line 2 (optional)
  address_city: 'Toronto', // city (optional)
  address_state: 'Ontario', // state/province (optional)
  address_country: 'Canada', // country (optional)
  postal_code: 'L5L5L5', // Postal Code / Zip Code (optional)
  currency: 'CAD' // Three-letter ISO currency code (optional)
};

function onSuccesscc(tokenId) {

    alert(JSON.stringify(tokenId));
}

function onErrorcc(errorMessage) {
    alert('Error getting card token', errorMessage);
}

       // this.stripe.createCardToken(card)
    //.then((res: any) => console.log(res));
        
cordova.plugins.stripe.createCardToken(card, onSuccesscc, onErrorcc);

        // Add views
view1 = myApp.addView('#view-1');
view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
view3 = myApp.addView('#view-3');

       
//myApp.init(); 


    
    
        firebase.auth().onAuthStateChanged(function(user) {
  

  
  if (user) {
      f_uid = firebase.auth().currentUser.uid;
setTimeout(function(){ $( ".ploader" ).slideUp();$( ".toolbar" ).show(); }, 2000);
       
getPreferences();

    
  } else {
      

      startApp();
alert('no user');
  }
});
 
        

        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        
        
        //
        //alert('Received Event: ' + id);
     //  myApp.init();
        
        // Initialize your app


    

 

        }

};

function getPreferences(){

    if (user_offers){firebase.database().ref('users/' + f_uid).off('value', useroffers);}
    user_offers = firebase.database().ref('user_offers/' +f_uid).on('value', function(snapshot) {

        if (snapshot.val(){
$('.accordianul').empty();
var objs = snapshot.val();

$.each(objs, function(i, obj) {
 
     $('.accordianul').append(
         '<li class="accordion-item">'+
          '  <a href="" class="item-link item-content">'+
           '     <div class="item-inner">'+
            '        <div class="item-title">'+obj.category+'</div>'+
             '   </div>'+
            '</a> '+
            '<div class="accordion-item-content key_'+obj.id+'">No offers received yet</div>'+
        '</li>'
        );
    });
 
    
    
}
        
   });
   
}

function clearSearch(){

    
        $('.blockpick').hide();

    $('.yespick').hide();
$( ".s_category" ).val('');
//$( ".s_brand" ).val('');
//$( ".s_model" ).val('');
$( ".s_offer" ).val('');
$( ".s_quantity" ).val('1');

    
} 

        
function submitOffer(){

    
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);

var s_category = $( ".s_category" ).val();
var s_brand = $( ".s_brand" ).val();
var s_model = $( ".s_model" ).val();
var s_offer = $( ".s_offer" ).val();
var s_quantity = $( ".s_quantity" ).val();

var targetData = {
   posted:f_uid,
    timestamp: t_unix,
    category:s_category,
    brand:'s_brand',
    model:'s_model',
    offer:s_offer,
    quanity:s_quantity,
    id: newPostKey
   };

  
    var updates = {};
  updates['requests/' + newPostKey] = targetData;
      updates['user_offers/' + f_uid + '/' + newPostKey] = targetData;
    

return firebase.database().ref().update(updates).then(function() {
      
    clearSearch();
      
  });

    
    
}        
        
function checkBox(){
if ($('#checkbox').prop('checked')) {
    $('.yespick').show();
    $('.nopick').hide();
}
    else{
    $('.nopick').show();
        $('.yespick').hide();
    }
}        
    

    

function startApp(){

    var mySwiper = myApp.swiper('.swiper-categories', {
    slidesPerView: 3
  });
    

   firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});
    
    
}



var pickerDevice = myApp.picker({
    input: '#picker-cat',
    onClose:function (p){$( ".blockpick" ).show();$('.yespick').show();},
    cols: [
        {
            textAlign: 'center',
            values: ['Dishwasher','Oven','Cooktop','Rangehood','Microwave','Refrigerator','Freezer','Washing machine','Dryer']
        }
    ]
});


