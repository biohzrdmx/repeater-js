(() => {
    class TextField extends Repeater.AbstractField {

        input;

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('placeholder', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'disabled', 'readonly', 'required', 'value');
        }

        init(element, callback) {
            this.element = element;
            this.input = this.element.querySelector('input');
            this.input.addEventListener('input', (e) => {
                callback(this.input.value);
            });
            if (typeof this.input.attributes.value !== 'undefined') {
                this.item.model.updateField(this.options.name, this.input.value);
            }
        }

        refresh() {
            if ( typeof this.input.attributes.value === 'undefined' ) {
                this.input.value = this.item.model.getField(this.options.name);
            }
        }

        render(id) {
            const markup = this.adapter.markup('text', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('text');
                const attributes = this.getAttributes();
                return `<input type="text" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextField = TextField;
})();