Shortly.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    "": "index", //empty string is equivalent to /
    "create": "create"
  },

  index: function() {
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.$el.html( linksView.render().el );
  },

  create: function() {
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.html( linkCreateView.render().el );
  }

});