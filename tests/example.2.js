AJS.namespace('Bamboo.Widget');

Bamboo.Widget.Autocomplete = Brace.View.extend({

    mixins: [
        Bamboo.EventBusMixin
    ],

    initialize: function(options) {
        this.onRegisterEvents();
    }

});
