'use strict';
// Initialize Firebase
var macaddress = require('macaddress');

var config = {
  apiKey: "AIzaSyBLcbAJzKdRTZMVjnQy46CDu7wN3a0-7o0",
  authDomain: "dm-1-project.firebaseapp.com",
  databaseURL: "https://dm-1-project.firebaseio.com",
  projectId: "dm-1-project",
  storageBucket: "dm-1-project.appspot.com",
  messagingSenderId: "440465090449"
};
firebase.initializeApp(config);

var databse = firebase.database();

var signUpBtn = document.getElementById('signUpBtn');
var signInBtn = document.getElementById('signInBtn');
var submitBtn = document.getElementById('submitBtn');

function submitClick() {

  var firebaseRef = firebase.database().ref();
  var emailField = document.getElementById('email').value;
  var passwordField = document.getElementById('password').value;
  var arrayEmail = new Array();
  var arrayMac = new Array();
  var arrayPass = new Array();
  var hasEmail=new Boolean(false)
  var hasMac=new Boolean(false)

  macaddress.one('en0',function (err, mac) {
    if(passwordField.length != 0 && emailField.length != 0){
      //console.log(typeof(passwordField));
      firebaseRef.on('value', function(snapshot){
        snapshot.forEach(function(item){
          arrayEmail.push(item.val().email);
          arrayMac.push(item.val().macAddress);
          arrayPass.push(item.val().password);
        });
      });

      setTimeout(function(){
        console.log("");

      },1000);
      //延时补偿
      setTimeout(function(){
        for(var i = 0; i< arrayEmail.length; i++)
        {
          if(arrayEmail[i] == emailField)
          {
            if(arrayMac[i] === mac)
            {
              hasEmail = true;
              hasMac = true;
              break;
            }else
            {
              hasEmail = false;
              hasMac = false;
              break;

            }
          }else if(arrayMac[i] === mac)
          {
            hasMac = true;
            break;
          }else
          {
            hasEmail = false;
            hasMac = false;
          }
        }
          if(hasMac === true || hasEmail === true)
        {
          window.alert("用户已绑定，如有疑问请联系客服");
        }else
        {
          firebaseRef.push('users/').set({
            email: emailField,
            password: passwordField,
            macAddress: mac,
          });
        window.alert("认证成功！请等待激活申请");
        }
      },1300);
     }else
     {
       window.alert("请填写完整的用户名或密码");
     }
  })





}

  // 下面的代码是firebase自带的注册代码

  // signUpBtn.addEventListener('click', function(){
  //     var emailField = document.getElementById('email').value;
  //     var passwordField = document.getElementById('password').value;

  //     firebase.auth().createUserWithEmailAndPassword(emailField, passwordField).then(function(){
  //       alert('User Created!!!')
  //     }).catch(function(error){
  //         if(error != null){
  //             console.log(error.message);
  //             return;
  //         }
  //     });
  // });

async function loginClick()
{
    var firebaseRef = firebase.database().ref();
    var emailField = document.getElementById('email').value;
    var passwordField = document.getElementById('password').value;
    var arrayEmail = new Array();
    var arrayMac = new Array();
    var arrayPass = new Array();
    var hasEmail=new Boolean(false)
    var hasMac=new Boolean(false)
    var hasPass=new Boolean(false)

    macaddress.one('en0',function (err, mac) {
      if(passwordField.length != 0 && emailField.length != 0){
        //console.log(typeof(passwordField));
        firebaseRef.on('value', function(snapshot){
          snapshot.forEach(function(item){
            //arrayEmail.push(item.val().email);
            arrayMac.push(item.val().macAddress);
            //arrayPass.push(item.val().password);
          });
        });

        setTimeout(function(){
          console.log(mac);

        },1000);
        //延时补偿
        setTimeout(function(){
          firebase.auth().signInWithEmailAndPassword(emailField, passwordField).then(function(){
          for(var i = 0; i< arrayMac.length; i++)
          {
            if(arrayMac[i] == mac)
            {
                hasMac = true;
                break;
            }else
            {
                hasMac = false;
            }
          }

            if(hasMac === true)
            {
              window.alert("登录成功");
              document.location.href = 'index.html';
            }else
            {
              window.alert("本机未与本机绑定，若有问题请联系客服");
            }

          });
        },1300);
       }else
       {
         window.alert("请填写完整的用户名或密码");
       }
  });


}
