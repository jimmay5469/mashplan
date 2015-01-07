import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: 'plan'.w(),
  type: Ember.computed.alias('controllers.plan.type'),
  isSessionView: Ember.computed.alias('controllers.plan.isSessionView'),
  filteredModel: function() {
    var _this = this;
    if(this.get('type') === 'sessions') {
      return this.get('model.sessions').filter(function(item) { return item.SessionStartTime === _this.get('time'); });
    } else {
      return this.get('model.sessions').filter(function(item) { return moment(item.SessionStartTime).day() === moment(_this.get('time')).day(); });
    }
  }.property('model'),
  sessionStartTime: function() {
    var model = this.get('filteredModel');
    if (!model.length) {
      return null;
    }
    return model[0].SessionStartTime;
  }.property('filteredModel')
});
