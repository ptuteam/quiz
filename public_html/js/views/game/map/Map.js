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
        map: null,
        mapStructure: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 3,
            '5': 2,
            '6': 1
        },
        el: '#map',
        events: {
            'click': 'onItemClick'
        },
        initialize: function(map) {
            this.map = map;
        },
        render: function() {
            var orderNumber = 0;

            for (key in this.mapStructure) {
                var number = this.mapStructure[key];

                var row = document.createElement('div');
                row.className = 'b-map__row';

                for (j = 0; j < number; ++j) {
                    row.appendChild(new Area(this.map.segments[orderNumber]).el);
                    orderNumber++;
                }

                this.getElement().appendChild(row);
            }
        },
        getElement: function() {
            if (this.el === undefined) {
                this.el = document.getElementById('map');
            }
            return this.el;
        },
        onItemClick: function(event) {
            console.log(event);
            this.trigger("ItemClicked", {itemID: $(event.target).index() + 1});
        }
    });
    return View;
});