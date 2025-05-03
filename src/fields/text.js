(() => {
    class TextField extends Repeater.AbstractField {

        input;

        init(element, callback) {
            this.element = element;
            this.input = this.element.querySelector('input');
            this.input.addEventListener('input', (e) => {
                callback(this.input.value);
            });
        }

        refresh() {
            this.input.value = this.item.model.getField(this.options.name);
        }

        render(id) {
            const markup = this.adapter.markup('text', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('text');
                return `<input type="text" name="${id}" id="${id}_0" placeholder="${this.options.placeholder ?? ''}" class="${classes}" value="">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextField = TextField;
})();