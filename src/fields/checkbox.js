(() => {
    class CheckboxField extends Repeater.AbstractField {

        inputs;

        disabled;

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.disabled = false;
        }

        init(element, callback) {
            this.element = element;
            this.inputs = this.element.querySelectorAll('input');
            this.element.addEventListener('change', (e) => {
                e.stopImmediatePropagation();
                callback(this.disabled ? null : this.getValues());
            });
        }

        refresh() {
            this.setValue(this.item.model.getField(this.options.name, []));
        }

        conditional(result) {
            this.disabled = !result;
            this.inputs.forEach((input) => {
                input.disabled = !result;
            });
            this.element.classList.toggle(this.adapter.classes('hide'), !result);
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

        setValue(initial) {
            if (this.inputs instanceof NodeList) {
                this.inputs.forEach(input => {
                    if (initial.includes(input.value)) {
                        input.checked = true;
                    }
                });
            }
        }

        getValues() {
            const values = [];
            this.inputs.forEach(input => {
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