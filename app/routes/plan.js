import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON('https://cmprod-speakers.azurewebsites.net/api/sessionsdata').done(resolve).fail(reject);
    })
    .then(function(data) {
      return data.filter(function(item) {
        return item.SessionType !== 'Kidz Mash' && item.SessionType !== 'CodeMash Schedule Item';
      });
    });
  }
});
