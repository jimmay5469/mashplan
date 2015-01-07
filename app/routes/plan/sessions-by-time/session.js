import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.modelFor('plan').find(function(item) { return item.Id.toString() === params.Id; });
  }
});
