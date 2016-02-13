define(['models/game/map/Map'], function(Map) {
    var Area = Backbone.View.extend({
        area:{},
        className: 'b-map__item',
        initialize: function(area) {
            this.area = area;

            this.buildView();
        },
        buildView: function() {
            this.el.innerHTML = this.area.value;
            this.$el.addClass('b-map__item_player_' + this.area.owner.playerID);
        }
    });

    var View = Backbone.View.extend({
        mapStructure: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 3,
            '5': 2,
            '6': 1
        },
        events: {
            'click .b-map__item': 'onItemClick'
        },
        el: '#map',
        initialize: function(map) {
            this.map = map;
        },
        render: function() {
            this.setElement(document.getElementById("map"));

            var orderNumber = 0;

            for (key in this.mapStructure) {
                var number = this.mapStructure[key];

                var row = document.createElement('div');
                row.className = 'b-map__row';

                for (j = 0; j < number; ++j) {
                    row.appendChild(new Area(this.map.segments[orderNumber]).el);
                    orderNumber++;
                }

                this.el.appendChild(row);
            }
        },
        onItemClick: function(event) {
           this.trigger("ItemClicked", {itemID: event.target.getAttribute("areaid")});
        }
    });
    return View;
});