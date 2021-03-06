var SignupView = Backbone.View.extend({

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1 id="h">Sign Up</h1>\
      <div class="right"><button id="goLogin" type="button" class="button">Sign In</button></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="usernamePassword">\
      <div class="logo">Assassins</div>\
      <div class="editor flex-none">\
        <div class="fields well">\
          <div class="field"><label for="username">Username</label><input type="text" name="username" id="username"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
          <div class="field"><label for="retype">Retype</label><input type="password" name="password" id="retype"></div>\
        </div>\
        <button id="check" class="black large">Create an Account</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #goLogin': 'goLogin',
    'click #check': 'validate',
    'keypress input': 'keypress'
  },

  goLogin: function (){ this.model.trigger('goLogin'); },
  keypress: function (e){ if(e.which === 13) { this.validate(); }},
  
  validate: function (){
    var model = this.model;
    if ($('#username')[0].value.length < 1){
      alert("Please enter a username!");
    } else if ($('#username')[0].value.length > 20){
      $('#username')[0].value = '';
      $('#password')[0].value = '';
      $('#retype')[0].value = ''
      alert("Username length exceeds limit!");
    } else if ($('#password')[0].value.length < 1){
      alert("Please enter a password!");
    } else if ($('#password')[0].value.length > 20){
      $('#username')[0].value = '';
      $('#password')[0].value = '';
      $('#retype')[0].value = ''
      alert("Password length exceeds limit!");
    } else if($('#password')[0].value !== $('#retype')[0].value) {
      $('#password')[0].value = '';
      $('#retype')[0].value = '';
      alert("Please retype password!");
    } else if ($('#username')[0].value.match(/</i) || $('#password')[0].value.match(/</i)){
      $('#username')[0].value = '';
      $('#password')[0].value = '';
      $('#retype')[0].value = '';
      alert("Invalid character '<'");
    } else {
      $.ajax({
        url:"/checkUsername",
        type: "post",  
        data: { username: $('#username')[0].value.toLowerCase(), password: $('#password')[0].value },
        success: function (data){
          if (data){
            $('#username')[0].value = '';
            $('#password')[0].value = '';
            $('#retype')[0].value = '';
            alert("Username already taken.");
          } else {
            model.saveUsername({ username: $('#username')[0].value.toLowerCase(), password: $('#password')[0].value });
          }
        }
      });
    }
  },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});