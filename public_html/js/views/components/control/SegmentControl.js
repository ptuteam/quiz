define(['backbone'], function(Backbone) {
    var Segment = Backbone.View.extend({
        title: '',
        selected: false,
        selectedClass: 'b-wrapper__segment_selected',
        initialize: function(options) {
            this.title = options.title;
            this.el.innerHTML = this.title;
        },
        setSelected: function(selected) {
            if (selected) {
                this.$el.addClass(this.selectedClass);
            } else {
                this.$el.removeClass(this.selectedClass);
            }
        }
    });

    var View = Backbone.View.extend({
        selectedIndex: -1,
        segmentEl: 'b-wrapper__segment',
        segments: [],
        className: 'b-wrapper',
        events: {
            'click': 'handleClick'
        },

        initialize: function(segments) {
            this.segments = [];
            for (item in segments) {
                var segment = new Segment({className: this.segmentEl, title: segments[item]});
                this.segments.push(segment);
            }
            this.select(0);
        },
        select: function(index) {
            if (index < this.segments.length && index >= 0) {
                if (this.selectedIndex != index) {
                    this.segments[index].setSelected(true);
                    if (this.selectedIndex != -1) {
                        this.segments[this.selectedIndex].setSelected(false);
                    }
                }
                this.selectedIndex = index;
            }
        },
        render: function() {
            for (var item in this.segments) {
                this.$el.append(this.segments[item].el);
            }
            return this;
        },
        handleClick: function(event) {
            var index = $(event.target).index();
            this.select(index);
            this.trigger('clicked', index);
        }
    });
    return View;
});