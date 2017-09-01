
var f_token;
var myApp = new Framework7();
var $$ = Dom7;
var view1, view2, view3;

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
      
setTimeout(function(){ $( ".ploader" ).slideUp();$( ".toolbar" ).show(); }, 2000);
       


    
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


        
        
        
        
    

    

function startApp(){


   firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});
    
    
}



var pickerDevice = myApp.picker({
    input: '#picker-cat',
    cols: [
        {
            textAlign: 'center',
            values: ['Dishwashers','Ovens','Cooktops','Rangehoods','Microwaves','Refrigerators','Freezers','Washing machines','Dryers']
        }
    ]
});


