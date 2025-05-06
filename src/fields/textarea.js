(() => {
    class TextAreaField extends Repeater.AbstractField {

        textarea;

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('placeholder', 'maxlength', 'minlength', 'rows', 'autocomplete', 'disabled', 'readonly', 'required');
        }

        init(element, callback) {
            this.element = element;
            this.textarea = this.element.querySelector('textarea');
            this.textarea.addEventListener('input', (e) => {
                callback(this.textarea.disabled ? null : this.textarea.value);
            });
            this.textarea.addEventListener('blur', (e) => {
                const transformed = this.applyTransform(this.textarea.value);
                if (transformed !== null) {
                    this.textarea.value = transformed;
                    callback(this.textarea.disabled ? null : this.textarea.value);
                }
            });
        }

        refresh() {
            this.textarea.value = this.item.model.getField(this.options.name);
        }

        conditional(result) {
            this.textarea.disabled = !result;
            this.element.classList.toggle(this.adapter.classes('hide'), !result);
        }

        render(id) {
            const markup = this.adapter.markup('textarea', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('textarea');
                const attributes = this.getAttributes();
                return `<textarea name="${id}" id="${id}_0" ${attributes} class="${classes}"></textarea>`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextAreaField = TextAreaField;
})();
