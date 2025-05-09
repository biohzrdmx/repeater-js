(() => {
    class RepeaterField extends Repeater.AbstractField {

        container;

        disabled;

        nestedRepeater;

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.disabled = false;
        }

        init(element, callback) {
            this.element = element;
            this.container = this.element.querySelector('.repeater-nested');
            this.nestedRepeater = Repeater.create(this.container, this.options.schema, new Repeater.BootstrapAdapter);
            this.container.addEventListener('repeater.changed', (e) => {
                callback( this.disabled ? null : this.nestedRepeater.save(false) );
            });
        }

        refresh() {
            this.nestedRepeater.load( this.item.model.getField(this.options.name, []) );
        }

        conditional(result) {
            this.disabled = !result;
            this.element.classList.toggle(this.adapter.classes('hide'), !result);
            if (!result) {
                this.nestedRepeater.clear();
            }
        }

        render(id) {
            return '<div class="repeater-nested"></div>';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.RepeaterField = RepeaterField;
})();