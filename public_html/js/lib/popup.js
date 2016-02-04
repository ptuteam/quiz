// Backbone.Popup.js v0.3.2
//
// Copyright (C) 2015 
// Maxim Pedchenko
Backbone.Popup = Backbone.View.extend({
    className: 'popup__container',
    pClassName: 'popup',
    paClassName: 'popup_visible',
    animationDuration: 300,
    popupContainer: null,
    initialize: function() {
    },
    showPopup: function() {
        this.ensureModalContainer();
        this.popupContainer.append(this.$el).hide().toggleClass(this.paClassName).show();
    },
    hidePopup: function(callback) {
        this.popupContainer.toggleClass(this.paClassName);
        setTimeout((function() {
            this.popupContainer.remove();
            if (typeof callback === 'function' && callback) {
                callback();
            };
            this.onHide();
        }).bind(this), this.animationDuration);
    },
    ensureModalContainer: function() {
        this.popupContainer = $('<div>', {
            class: this.pClassName
        }).appendTo('body');
    },
    present: function() {
        this.render();
        this.showPopup();
    },
    onHide: function() {

    }
});