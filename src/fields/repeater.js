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
            this.nestedRepeater = Repeater.create(this.container, this.options.schema ?? {}, this.item.repeater.adapter);
            this.container.addEventListener('repeater.changed', (e) => {
                callback( this.disabled ? null : this.nestedRepeater.save(false) );
            });
            this.nestedRepeater.nestingLevel = (this.item.repeater.nestingLevel ?? 0) + 1;
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
    window.Repeater.fields = window.Repeater.fields || {};
    window.Repeater.fields.repeater = window.Repeater.RepeaterField;
})();