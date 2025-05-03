(() => {
    class RepeaterField extends Repeater.AbstractField {

        container;

        nestedRepeater;

        init(element, callback) {
            this.element = element;
            this.container = this.element.querySelector('.repeater-nested');
            this.nestedRepeater = Repeater.create(this.container, this.options.schema, new Repeater.BootstrapAdapter);
            this.container.addEventListener('repeater.changed', (e) => {
                callback( this.nestedRepeater.save(false) );
            });
        }

        refresh() {
            this.nestedRepeater.load( this.item.model.getField(this.options.name, []) );
        }

        render(id) {
            return '<div class="repeater-nested"></div>';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.RepeaterField = RepeaterField;
})();