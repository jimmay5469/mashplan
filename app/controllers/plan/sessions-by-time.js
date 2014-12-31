import Ember from 'ember';

export default Ember.ArrayController.extend({
  SessionStartTime: function() {
    var model = this.get('model');
    if (!model.length) {
      return null;
    }
    return model[0].SessionStartTime;
  }.property('model')
});
