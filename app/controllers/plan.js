import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['type'],
  type: 'sessions',
  groupedSessionTimes: function() {
    var sessionTimes = this.get('model').map(function(item) { return item.SessionStartTime; });
    var uniqueSessionTimes = sessionTimes.filter(function(value, index, arr) { return arr.indexOf(value) === index; });
    var groupObj = uniqueSessionTimes.reduce(function(grouping,item) {
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
  }.property('model')
});
