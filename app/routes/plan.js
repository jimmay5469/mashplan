import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON('/api/sessionsdata').done(resolve).fail(reject);
    });
  }
});
