import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this.scrollHere();
  },
  scrollHere: function() {
    if (!this.$()) { return; }
    if (window.$('html, body').is(':animated')) { return; }
    window.$('html, body').animate({
      scrollTop: this.$().offset().top
    }, 300);
  }.observes('controller.model')
});
