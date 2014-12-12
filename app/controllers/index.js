import Ember from 'ember';

export default Ember.ArrayController.extend({
  sessionTimes: Ember.computed.map('model', function(item) { return item.SessionTime; }),
  uniqueSessionTimes: Ember.computed.uniq('sessionTimes')
});
