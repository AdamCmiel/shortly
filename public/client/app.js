window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="divLogin"></div> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
        <li><a href="#" class="login">Login</a></li> \
        <li><a href="#" class="logout">Logout</a></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  loginTemplate: _.template('<form class="loginForm"><label>Username</label><input class="username" type="text" placeholder="username..."></input><input class="password" type="text" placeholder="****"></input><input type="submit" id="submitButton" value="login"></input></form>'),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "click li a.login": "renderLoginView",
    "click  #submitButton": "postLogin"
    // "submit form.login": "postLogin"
    // "click li a.logout": "render"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
    //$('form.login').submit(this.postLogin);
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.$el.find('#container').html( linksView.render().el );
    $('.divLogin').append(this.loginTemplate());

    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  },

  renderLoginView: function(e){
    e && e.preventDefault();
  },

  postLogin: function(e){
    e && e.preventDefault();
    var username = $('.username').val();
    var password = $('.password').val();
    var postData = {
      username: username,
      password: password
    };
    $.post('/users/create', JSON.stringify(postData), function(something){console.log(something)});
  }

});