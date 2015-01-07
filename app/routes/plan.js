import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    type: {
      refreshModel: true
    }
  },
  model: function(params) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(localStorage.getItem('sessions')) {
        resolve(JSON.parse(localStorage.getItem('sessions')));
      } else {
        Ember.$.getJSON('https://cmprod-speakers.azurewebsites.net/api/sessionsdata').done(resolve).fail(reject);
      }
    })
    .then(function(data) {
      if(!localStorage.getItem('sessions')) {
        localStorage.setItem('sessions', JSON.stringify(data));
      }
      return data;
    })
    .then(function(data) {
      switch(params.type) {
        case 'kidzmash':
          console.log('kidzmash');
          return data.filter(function(item) {
            return item.SessionType === 'Kidz Mash';
          });
        case 'codemash':
          console.log('codemash');
          return data.filter(function(item) {
            return item.SessionType === 'CodeMash Schedule Item';
          });
        default:
          console.log('sessions');
          return data.filter(function(item) {
            return item.SessionType !== 'Kidz Mash' && item.SessionType !== 'CodeMash Schedule Item';
          });
      }
    });
  },
  actions: {
    refreshSessions: function() {
      localStorage.removeItem('sessions');
      this.refresh();
    }
  }
});
