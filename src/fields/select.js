(() => {
    class SelectField extends Repeater.AbstractField {

        select;

        init(element, callback) {
            this.element = element;
            this.select = this.element.querySelector('select');
            this.select.addEventListener('change', (e) => {
                callback(this.select.value);
            });
        }

        refresh() {
            this.select.value = this.item.model.getField(this.options.name);
        }

        render(id) {
            const markup = this.adapter.markup('select', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('select');
                const options = [];
                this.options.options.forEach((option) => {
                    let value, label;
                    if (option instanceof Object) {
                        value = Object.keys(option)[0];
                        label = Object.values(option)[0];
                    } else {
                        value = label = option;
                    }
                    options.push(`<option value="${value}">${label}</option>`);
                });
                return `<select name="${id}" id="${id}_0" class="${classes}">${options.join()}</select>`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.SelectField = SelectField;
})();