(() => {
    class SelectField extends Repeater.AbstractField {

        init(element, callback, initial = '') {
            const select = element.querySelector('select');
            select.value = initial;
            select.addEventListener('change', (e) => {
                callback(select.value);
            });
            callback(select.value);
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