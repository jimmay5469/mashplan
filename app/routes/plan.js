import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(localStorage.getItem('sessions')) {
        resolve(JSON.parse(localStorage.getItem('sessions')));
      } else {
        Ember.$.getJSON('https://cmprod-speakers.azurewebsites.net/api/sessionsdata').done(resolve).fail(reject);
      }
    })
    .then(function(data) {
      localStorage.setItem('sessions', JSON.stringify(data));
      return data;
    })
    .then(function(data) {
      return data.filter(function(item) {
        return item.SessionType !== 'Kidz Mash' && item.SessionType !== 'CodeMash Schedule Item';
      });
    });
  },
  actions: {
    refreshSessions: function() {
      localStorage.removeItem('sessions');
      this.refresh();
    }
  }
});
