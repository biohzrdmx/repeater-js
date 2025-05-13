(() => {
    class RadioField extends Repeater.AbstractField {

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
                callback(this.disabled ? null : this.getValue(this.inputs));
            });
        }

        refresh() {
            this.setValue(this.item.model.getField(this.options.name));
        }

        conditional(result) {
            this.disabled = !result;
            this.inputs.forEach((input) => {
                input.disabled = !result;
            });
            this.element.classList.toggle(this.adapter.classes('hide'), !result);
            if (!result) {
                this.item.model.updateField(this.options.name, null);
                this.inputs.forEach((input) => input.checked = false);
                this.element.dispatchEvent(new Event('change'));
            }
        }

        render(id) {
            const markup = this.adapter.markup('radio', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('radio');
                const options = [];
                let index = 0;
                const source = (typeof this.options.options === 'function' ? this.options.options(this) : this.options.options) ?? [];
                source.forEach((option) => {
                    let value, label;
                    if (option instanceof Object) {
                        value = Object.keys(option)[0];
                        label = Object.values(option)[0];
                    } else {
                        value = label = option;
                    }
                    options.push(`<input type="radio" name="${id}[]" id="${id}_${index}" class="${classes}" value="${value}"><label for="${id}_${index}">${label}</label>`);
                    index++;
                });
                return options.join("\n");
            }
        }

        setValue(initial) {
            this.inputs.forEach(input => {
                if (input.value === initial) {
                    input.checked = true;
                }
            });
        }

        getValue() {
            let value = null;
            this.inputs.forEach(input => {
                if (input.checked) {
                    value = input.value;
                }
            });
            return value;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.RadioField = RadioField;
})();