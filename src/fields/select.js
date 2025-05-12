(() => {
    class SelectField extends Repeater.AbstractField {

        select;

        init(element, callback) {
            this.element = element;
            this.select = this.element.querySelector('select');
            this.select.addEventListener('change', (e) => {
                callback(this.select.disabled ? null : this.select.value);
            });
        }

        refresh() {
            this.select.value = this.item.model.getField(this.options.name);
        }

        conditional(result) {
            this.select.disabled = !result;
            this.element.classList.toggle(this.adapter.classes('hide'), !result);
            if (!result) {
                this.select.value = '';
                this.select.dispatchEvent(new Event('change'));
            }
        }

        render(id) {
            const markup = this.adapter.markup('select', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('select');
                const options = [];
                if (this.options.grouped) {
                    this.addGroups(this.options, options);
                } else {
                    this.addOptions(this.options, options);
                }
                return `<select name="${id}" id="${id}_0" class="${classes}">${options.join()}</select>`;
            }
        }

        addOptions(source, options) {
            const sourceOptions = typeof source.options === 'function' ? source.options(this) : source.options;
            sourceOptions.forEach((option) => {
                let value, label;
                if (option instanceof Object) {
                    value = Object.keys(option)[0];
                    label = Object.values(option)[0];
                } else {
                    value = label = option;
                }
                options.push(`<option value="${value}">${label}</option>`);
            });
        }

        addGroups(source, options) {
            const sourceOptions = typeof source.options === 'function' ? source.options(this) : source.options;
            sourceOptions.forEach((group) => {
                const groupOptions = [];
                groupOptions.push(`<optgroup label="${group.label}">`);
                this.addOptions(group, groupOptions);
                groupOptions.push('</optgroup>');
                options.push(groupOptions.join());
            });
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.SelectField = SelectField;
})();