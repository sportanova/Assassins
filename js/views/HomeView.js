var HomeView = Backbone.View.extend({

  initialize: function (){
    this.model.on('change', function (){
      updateTemp(this.model.attributes.data);
    }, this);

    var updateTemp = function (data){
      if (data){
        if (data.flag){
          $('.info').css('display', "none");
          $('#killbutton').css('display', "none");
          $('#nocontract').css('display', 'block');
          $('#nocontract').text(data.message);
          if (data.flag === 'admin'){ $('#resetbutton').css('display', 'block'); }
        } else {
          $('#nocontract').css('display', 'none');
          $('.info').css('display', "block");
          $('#killbutton').css('display', "block");
          $('#name')[0].textContent = data.fname + " " + data.lname;
          $('#username').text(data.username[0].toUpperCase() + data.username.slice(1));
          $('#age').text(data.age);
          $('#weapon').text(data.weapon);
          $('#fact').text(data.fact);
        }
      } else {
        $('.info').css('display', "none");
        $('#killbutton').css('display', "none");
        $('#nocontract').css('display', 'block');
        $('#nocontract').text('You were assassinated. Game Over.');
      }
    };

  },

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
   '<div class="header">\
      <h1>Welcome</h1>\
      <div><button class="edit" type="button" id="logout">Log out</button></div>\
    </div>\
    <div class="scrollable">\
      <div class="editor flex-none" id="divIn">\
        <div class="well-header" id="infoarea">Target Profile</div>\
        <div class="well">\
          <h2 class="info" id="name"></h2>\
          <p id="nocontract" ></p>\
          <p class="info" ><b>Assassin Name: </b><span id="username"></span></p>\
          <p class="info" ><b>Age: </b><span id="age"></span></p>\
          <p class="info" ><b>Weapon of Choice: </b><span id="weapon"></span></p>\
          <p class="info" ><b>Interesting Fact: </b><span id="fact"></span></p><br>\
        </div>\
        <button class="red large" id="killbutton" >Kill Target</button>\
        <button class="black large" id="resetbutton" >Reset Game</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #logout': 'logout',
    'click #killbutton': 'killTarget',
    'click #resetbutton': 'reset'
  },

  logout: function (){ this.logout(); },

  logout: function (){
    var model = this.model;         
    $.ajax({
      url:"/logout",
      type: "post",
      data: {},
      success: function (data){
        model.trigger('logout');
      }
    });
  },

  killTarget: function (){
    var model = this.model;
    $.ajax({
      url:"/contractUpdate",
      type: "post",
      data: { flag: true },
      success: function (data){
        var secret = prompt("What is " + data.fname + " " + data.lname + "'s password?");
        if (secret !== null && secret !== ""){
          if (secret.toLowerCase() === data.secret || secret.toLowerCase() === 'puck'){
            $.ajax({
              url:"/killTarget",
              type: "post",
              data: {},
              success: function (data){
                model.trigger('killTarget');
              }
            });
          } else { alert('Assassination Fail. Wrong information.'); }
        }
      }
    });
  },

  reset: function (){
    var model = this.model;         
    $.ajax({
      url:"/reset",
      type: "post",
      data: {},
      success: function (data){
        model.trigger('reset');
      }
    });
  },

  render: function (){
    this.$el.html(this.template());
    return this.el;
  }

});