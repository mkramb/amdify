(function(AJS, Backbone, templateNamespace) {

    AJS.namespace('Bamboo.Views.ActionTip');

    Bamboo.Views.ActionTip = Backbone.View.extend({

        defaults: {
            content: '',
            params: {
                onTop: false
            }
        },

        initialize: function(options) {
            this.settings = AJS.$.extend(this.defaults, options || {});

            if (!this.settings.label) {
                this.settings.label = AJS.$.trim(this.$el.text());
            }

            var params = AJS.$.extend({
                hideCallback: _.bind(this.onClose, this),
                container: 'body',
                noBind: true
            }, this.settings.params);

            this.dialog = AJS.InlineDialog(
                this.$el, this.$el.attr('id'),
                _.bind(this.onShow, this), params
            );

            this.registerEvents();
        }

    });

}(AJS, Backbone, bamboo.widget.actionTip));
