import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this.scrollHere();
  },
  scrollHere: function() {
    if (!this.$()) { return; }
    window.$('html, body').animate({
      scrollTop: this.$().offset().top
    }, 1000);
  }.observes('controller.model')
});
