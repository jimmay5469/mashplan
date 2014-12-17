import Ember from 'ember';

export default Ember.ArrayController.extend({
  sessionTimes: Ember.computed.map('model', function(item) { return item.SessionStartTime; }),
  uniqueSessionTimes: Ember.computed.uniq('sessionTimes'),
  groupedSessionTimes: function() {
    var groupObj = this.get('uniqueSessionTimes').reduce(function(grouping,item) {
      var day = moment(item).startOf('day');
      if (grouping[day]) {
        grouping[day].push(item);
      } else {
        grouping[day] = [item];
      }
      return grouping;
    }, {});
    return Object.keys(groupObj).map(function(key) {
      return { key: key, values: groupObj[key] };
    });
  }.property('uniqueSessionTimes')
});
