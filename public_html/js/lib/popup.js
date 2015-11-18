// Backbone.Popup.js v0.3.2
//
// Copyright (C) 2015 
// Maxim Pedchenko
Backbone.Popup = Backbone.View.extend({
    className: 'popup-container',
    pClassName: 'popup',
    paClassName: 'popup-visible',
    animationDuration: 300,
    popupContainer: null,
    initialize: function() {},
    showPopup: function() {
        this.ensureModalContainer();
        this.popupContainer.append(this.$el).hide().toggleClass(this.paClassName).show();
    },
    hidePopup: function(callback) {
        this.popupContainer.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", (function(event) {
            this.popupContainer.remove();
            if (typeof callback === 'function' && callback) {
                callback();
            };
        }).bind(this));
        this.popupContainer.toggleClass(this.paClassName);
    },
    ensureModalContainer: function() {
        this.popupContainer = $('<div>', {
            class: this.pClassName
        }).appendTo('body');
    },
});