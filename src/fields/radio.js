(() => {
    class RadioField extends Repeater.AbstractField {

        init(element, callback) {
            const inputs = element.querySelectorAll('input');
            element.addEventListener('change', (e) => {
                e.stopImmediatePropagation();
                callback(this.getValue(inputs));
            });
            callback(this.getValue(inputs));
        }

        render(id) {
            const markup = this.adapter.markup('radio', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('radio');
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
                    options.push(`<input type="radio" name="${id}[]" id="${id}_${index}" class="${classes}" value="${value}"><label for="${id}_${index}">${label}</label>`);
                    index++;
                });
                return options.join("\n");
            }
        }

        getValue(inputs) {
            let value = null;
            inputs.forEach(input => {
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