
var f_token;
var f_uid;
var f_auth_id;
var myApp = new Framework7();
var $$ = Dom7;
var view1, view2, view3;
var user_offers;
var business_notifs; 

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
        
        
               cordova.plugins.stripe.setPublishableKey('pk_test_SlHSaf1IHRTUDWENH6xdunK9');
             //LIVE  cordova.plugins.stripe.setPublishableKey('pk_live_igOGntn7DYUc72yYBPvKvViq');



       // this.stripe.createCardToken(card)
    //.then((res: any) => console.log(res));


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
      f_auth_id = firebase.auth().currentUser.uid;
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


function addUser(){


alert('adding user');
 var d_unix = Math.round(+new Date()/1000);
    var suffix = f_auth_id.substr(f_auth_id.length - 5);
            f_uid = suffix + '_' + d_unix;

       $.post( "http://www.recountify.com/savecustomer.php", {uid:f_auth_id} )
  .done(function( data ) {    

alert(data);
    
           
firebase.database().ref('users/' + f_auth_id).update({
customer_id:data,
    created:d_unix,
    suffix:suffix
  });           
           
});  


}

function getPreferences(){
firebase.database().ref('users/' + f_auth_id).once("value",function(snapshot) {
    var userexists = snapshot.child('customer_id').exists(); // true

    alert(userexists);
    
   
    
    if (userexists){
    
        f_uid = snapshot.child('suffix').val() + '_' + snapshot.child('created').val();
     if (business_notifs){firebase.database().ref('business_notifs/' + f_uid).off('value', business_notifs);}
    business_notifs = firebase.database().ref('business_notifs/' +f_uid).on('value', function(snapshot2) {
alert(JSON.stringify(snapshot2.val()));
 
        if (snapshot2.val()){
$('.offersul').empty();
var objs = snapshot2.val();

$.each(objs, function(i, obk) {            
            
$.each(obk, function(i, obj) {

    $('.offersul').append(
    ' <li onclick="payModal()">'+
                '       <a href="#" class="item-content">'+
     '           <div class="item-media">'+
      '              <img src="path/to/img.jpg">'+
       '         </div>'+
        '        <div class="item-inner">'+
         '           <div class="item-title-row">'+
          '              <div class="item-title">'+obj.category+' </div>'+
           '             <div class="item-after">0 <i class="pe-7s-portfolio"></i></div>'+
            '        </div>'+
             '       <div class="item-subtitle">'+obj.brand+' / '+obj.model+'</div>'+
              '      <div class="item-text">Your offer: $ '+obj.offer+'</div>'+
               ' </div>'+
           ' </a>'+
        '</li>'
    );
    
    
    });
    });
        
    }
    else{
    
     $('.offersul').empty();
            $('.offersul').append('<div class="content-block-title">No offers received yet</div>');
        
    }
    
    });   

       
    
    
    
    
    
  

    
        }
        
        else{
            addUser();
           
        }
    
    });
 

    
}

function populateOffers(){


    user_offers = firebase.database().ref('user_offers/' +f_uid).once('value', function(snapshot) {

        
        if (snapshot.val()){
$('.accordianul').empty();
var objs = snapshot.val();

$.each(objs, function(i, obj) {

    $('.accordianul').append(
    ' <li onclick="payModal()">'+
                '       <a href="#" class="item-content">'+
     '           <div class="item-media">'+
      '              <img src="path/to/img.jpg">'+
       '         </div>'+
        '        <div class="item-inner">'+
         '           <div class="item-title-row">'+
          '              <div class="item-title">'+obj.category+' </div>'+
           '             <div class="item-after">0 <i class="pe-7s-portfolio"></i></div>'+
            '        </div>'+
             '       <div class="item-subtitle">'+obj.brand+' / '+obj.model+'</div>'+
              '      <div class="item-text">Your offer: $ '+obj.offer+'</div>'+
               ' </div>'+
           ' </a>'+
        '</li>'
    );
    
    
    });
        }
    
    });

}


function loadElements(){

     
    var stripe = Stripe('pk_test_SlHSaf1IHRTUDWENH6xdunK9');
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '18px',
    lineHeight: '22px'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

    
    card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});
    
    var form = document.getElementById('payment-form');
    
    
    var ownerInfo = {
  owner: {
    name: 'Jenny Rosen',
    address: {
      line1: 'Nollendorfstraße 27',
      city: 'Berlin',
      postal_code: '10777',
      country: 'DE',
    },
    email: 'jenny.rosen@example.com'
  },
};
    
form.addEventListener('submit', function(event) {
  event.preventDefault();

    


  stripe.createSource(card, ownerInfo).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
        alert(JSON.stringify(errorElement.textContent));
    } else {
      // Send the source to your server
      stripeSourceHandler(result.source);
        
    }
    
    
    
    
    
    
    

  });

});

}

function stripeSourceHandler(source) {
  // Insert the source ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeSource');
  hiddenInput.setAttribute('value', source.id);
  form.appendChild(hiddenInput);

    
    alert(JSON.stringify(source));
        $.post( "http://www.recountify.com/newcard.php", {uid:f_auth_id,newtoken:source.id,amount:100,currency:'AUD'} )
  .done(function( data ) {  
            alert(data);
            });
    
  // Submit the form
 // form.submit();
}

var mycards;
function getCards(){
mycards = '';
    
    $('.newcarddiv').show();
       $.post( "http://www.recountify.com/getcards.php", {uid:f_auth_id} )
  .done(function( data ) {    

           
           
   

    
if (data == '[]'){
    $('#payment-form').show();


    if( $(".cards-loader").css('display') == 'block') {alert('card-element is empty');loadElements();}
    else{alert('card-element is not empty');}
    

    
    

    
    
   
    
}
           else{
alert(data);
               var result9 = JSON.parse(data); 

               mycards = result9;
               
alert(result9[0].id);  
                 

               

               
               
              $('#existing-form').show();

                             $('#payment-form').remove();

     
               
               
               alert('got cards - need to put source in and add a button to change or add new card');}
           

    $('.cards-loader').hide();
    
});  

}



function payModal(){

    var popupHTML = '<div class="popup buypop" style="height:100%;overflow: hidden;">'+
                    
     '   <div class="navbar" style="background-color:#00bcd4;">'+
    '<div class="navbar-inner">'+
   '    <div class="left"><a href="#" class="close-popup link" style="color:white;margin-left:-10px;"><i class="pe-7s-angle-left pe-3x"></i></a></div>'+
  '  <div class="center" style="color:white;">Select Offer</div>'+
  '  <div class="right"></div>'+
        
 '   </div>'+
'</div>'+
'<div class="pages" style="height:100%;overflow: hidden;">'+
'<div data-page="buypage" class="page" style="height:100%;overflow: hidden;">'+

      '<div class="newcarddiv" style="position:absolute;width:100%;z-index:5000000;background-color:#f7f7f8;bottom:60px;display:none;">'+

       '  <div class="col-25 cards-loader" style="padding-top:5px;padding-bottom:5px;text-align:center;margin:0 auto;">'+
     '   <span class="preloader"></span>'+
    '  </div>'+
 
        '<div id="existing-form" style="display:none;font-size:18px;line-height:22px;padding-top:20px;">'+
    '<div class="selectedsource" style="float:left;padding-bottom:20px;color:#31325F"><i class="pe-7s-credit pe-lg" style="margin-right:5px;margin-left:5px;"></i> 4242  10/20</div>'+
        
        '<div style="float:right;"><a href="#" class="button" style="margin-right:5px;" onclick="mySources()">Change</a></div>'+
        
    '  <button class="button external active button-big" style="margin:0 auto;width:100%;border-radius:0px;">Pay $490.00</button>'+

    '</div>'+
        
        
       ' <form action="/charge" method="post" id="payment-form" style="display:none;">'+
 ' <div class="form-row" style="padding-left:5px;padding-top:20px;">'+
   ' <label for="card-element">'+
   ' </label>'+
   ' <div id="card-element">'+

   ' </div>'+


    '<div id="card-errors" role="alert" style="height:20px;display:block;color:white;"></div>'+
  '</div>'+
'  <button class="button external active button-big" style="margin:0 auto;width:100%;border-radius:0px;">Pay $490.00</button>'+

'</form>'+
        
        '</div>'+
        
        '<div class="page-content" style="height:calc(100% - 44px);overflow:scroll;background-color:white;padding-bottom:132px;">'+
   

        '<div class="list-block media-list" style="margin-bottom:0px;margin-top:0px;">'+
    '<ul>'+
        ' <li>'+
                '       <div class="item-content item-link">'+
     '           <div class="item-media">'+
      '              			<img src="https://thegoodguys.sirv.com/products/50027226/50027226_105374.PNG" style="width:50px;">'+
       '         </div>'+
        '        <div class="item-inner">'+
         '           <div class="item-title-row">'+
          '              <div class="item-title">Dishwasher </div>'+
         //  '             <div class="item-after">0 <i class="pe-7s-portfolio"></i></div>'+
            '        </div>'+
             '       <div class="item-subtitle">Bosch</div>'+
                     '       <div class="item-subtitle">SMAU187GH4567 XX8</div>'+

              '      <div class="item-text">You offered to pay: $490.00</div>'+
               ' </div>'+
           ' </div>'+
        '</li>'+
    '</ul>'+
    '</div>'+
        
                   ' <div class="content-block-title">Available offers</div>'+

        
           '<div class="list-block media-list" style="margin-bottom:0px;margin-top:0px;">'+
    '<ul class="radioul">'+

    '</ul>'+
    '</div>'+

'</br></br></br></br></br></br></br>hhh</br></br></br></br></br></br>jjj</br></br></br></br></br>kkk'+
        '</div></div></div>'+
                  '</div>';
  myApp.popup(popupHTML);
   myApp.sizeNavbars();


 return firebase.database().ref('business_notifs/' +f_uid).once('value').then(function(snapshot) {

     if (snapshot.val()){
$('.radioul').empty();
var objs = snapshot.val();

$.each(objs, function(i, obk) {            
            
$.each(obk, function(i, obj) {

    $('.radioul').append(
   ' <li onclick="getCards()">'+
'              <label class="label-radio item-content">'+
        '                <input type="radio" name="my-radio">'+

     '           <div class="item-media">'+
      '              <img src="'+obj.image+'" style="width:50px;">'+
       '         </div>'+

        '        <div class="item-inner">'+
         '           <div class="item-title-row">'+
          '              <div class="item-title">$'+obj.new_offer+'</div>'+
         //  '             <div class="item-after">0 <i class="pe-7s-portfolio"></i></div>'+
            '        </div>'+
             '       <div class="item-subtitle">JB HI-FI</div>'+
              '      <div class="item-text">Delivery included</div>'+
               ' </div>'+
           ' </label>'+
        '</li>'
    );
    
    
    });
    });
        
    }
     

});
    
    
    
}



function mySources(){
 
    var popupHTML = '<div class="popup sourcespop" style="height:100%;overflow: hidden;">'+
                    
     '   <div class="navbar" style="background-color:#00bcd4;">'+
    '<div class="navbar-inner">'+
   '    <div class="left"></div>'+
  '  <div class="center" style="color:white;">My Payment Sources</div>'+
  '  <div class="right"></div>'+
        
 '   </div>'+
'</div>'+
'<div class="pages" style="height:100%;overflow: hidden;">'+
'<div data-page="buypage" class="page" style="height:100%;overflow: hidden;">'+

      '<div class="" style="position:absolute;width:100%;z-index:5000000;background-color:#f7f7f8;bottom:60px;">'+

 
       
        
      
        '  <button class="button external active button-big" onclick="closeSources();" style="margin:0 auto;width:100%;border-radius:0px;">Done</button>'+

        '</div>'+
        
        '<div class="page-content" style="height:calc(100% - 44px);overflow:scroll;background-color:white;padding-bottom:132px;">'+
   

    
        
                   ' <div class="content-block-title">Select card</div>'+

        
           '<div class="list-block media-list" style="margin-bottom:0px;margin-top:0px;">'+
    '<ul class="sourcesul">'+

    '</ul>'+
    '</div>'+
        

                   ' <div class="content-block-title">Add New Card</div>'+
        
         ' <form action="/charge" method="post" id="payment-form">'+
 ' <div class="form-row" style="padding-left:5px;padding-top:20px;">'+
   ' <label for="card-element">'+
   ' </label>'+
   ' <div id="card-element">'+

   ' </div>'+


    '<div id="card-errors" role="alert" style="height:20px;display:block;color:white;"></div>'+
  '</div>'+

'</form>'+
        

        '</div></div></div>'+
                  '</div>';
  myApp.popup(popupHTML);
    loadElements();
    
    
    for (i = 0; i < mycards.length; i++) { 

        $('.sourcesul').append(' <li onclick="">'+
'              <label class="label-radio item-content">'+
        '                <input type="radio" name="source-radio">'+

     '           <div class="item-media">'+
      '<i class="pe-7s-credit pe-lg" style="margin-right:5px;margin-left:5px;"></i>'+
       '         </div>'+

        '        <div class="item-inner" style="padding-left:0px;">'+
         '           <div class="item-title-row">'+
          '              <div class="item-title" style="font-size:18px;color:#31325F">**** **** **** 4242</div>'+
           '             <div class="item-after" style="font-size:18px;">10/20</div>'+
            '        </div>'+
               ' </div>'+
           ' </label>'+
        '</li>'
        
        //  '<li><div style="font-size:18px;line-height:22px;padding-top:20px;">'+
    //'<div class="selectedsource" style="float:left;padding-bottom:20px;"> 4242  10/20</div>'+


    );
        
}
    
        
    
   myApp.sizeNavbars();

} 

function closeSources(){

    myApp.closeModal('.sourcespop');
    
}

function chargeCard(){

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
       
cordova.plugins.stripe.createCardToken(card, onSuccesscc, onErrorcc);

}

function onSuccesscc(tokenId) {
alert(JSON.stringify(tokenId));

    //char
    

    
   
}

function onErrorcc(errorMessage) {
    alert('Error getting card token', errorMessage);
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


function businessOffer(){
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);

var targetData = {
   posted:f_uid,
    timestamp: t_unix,
    category:'s_category',
    brand:'s_brand',
    model:'s_model',
    offer:'490.00',
    accept_offer:'Y',
    quanity:'2',
    offerid:'666',
    id:newPostKey
   };

  
    var updates = {};
      updates['business_notifs/'+f_uid+'/-Kt19JvEdgPk5H3ds85Q'] = targetData;
      updates['business_notifs/666/-Kt19JvEdgPk5H3ds85Q'] = targetData;
    return firebase.database().ref().update(updates).then(function() {
      alert('business offer sent');
    //clearSearch();
      
  });
}

function submitOffer(){

    alert(f_uid);
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
    id:newPostKey
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
