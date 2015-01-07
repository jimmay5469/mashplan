import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      time: params.time,
      sessions: this.modelFor('plan')
    };
  }
});
