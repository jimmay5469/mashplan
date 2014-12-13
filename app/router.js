import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('plan', { path: '/' }, function(){
    this.route('sessions-by-time', { path: '/:time' });
  });
});

export default Router;
