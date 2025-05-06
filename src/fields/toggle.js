(() => {
    class ToggleField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('checked');
        }

        init(element, callback) {
            this.element = element;
            this.input = this.element.querySelector('input');
            this.input.addEventListener('input', (e) => {
                callback(this.input.checked);
            });
            if (this.input.checked && this.item.model.getField(this.options.name) === null) {
                this.item.model.updateField(this.options.name, true);
            }
        }

        refresh() {
            this.input.checked = this.item.model.getField(this.options.name, false);
        }

        render(id) {
            const markup = this.adapter.markup('toggle', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('toggle');
                const attributes = this.getAttributes();
                const label = this.options.details || this.options.label;
                return `<input type="checkbox" name="${id}" id="${id}_0" ${attributes} class="${classes}"><label for="${id}_0">${label}</label>`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.ToggleField = ToggleField;
})();