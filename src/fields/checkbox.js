(() => {
    class CheckboxField extends Repeater.AbstractField {

        init(element, callback, initial = '') {
            const inputs = element.querySelectorAll('input');
            this.setValue(inputs, initial);
            element.addEventListener('change', (e) => {
                e.stopImmediatePropagation();
                callback(this.getValues(inputs));
            });
            callback(this.getValues(inputs));
        }

        render(id) {
            const markup = this.adapter.markup('checkbox', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('checkbox');
                const options = [];
                let index = 0;
                this.options.options.forEach((option) => {
                    let value, label;
                    if (option instanceof Object) {
                        value = Object.keys(option)[0];
                        label = Object.values(option)[0];
                    } else {
                        value = label = option;
                    }
                    options.push(`<input type="checkbox" name="${id}[]" id="${id}_${index}" class="${classes}" value="${value}"><label for="${id}_${index}">${label}</label>`);
                    index++;
                });
                return options.join("\n");
            }
        }

        setValue(inputs, initial) {
            if (Array.isArray(inputs)) {
                inputs.forEach(input => {
                    if (initial.includes(input.value)) {
                        input.checked = true;
                    }
                });
            }
        }

        getValues(inputs) {
            const values = [];
            inputs.forEach(input => {
                if (input.checked) {
                    values.push(input.value);
                }
            });
            return values;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.CheckboxField = CheckboxField;
})();