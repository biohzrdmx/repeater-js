(() => {
    class TextAreaField extends Repeater.AbstractField {

        textarea;

        init(element, callback) {
            this.element = element;
            this.textarea = this.element.querySelector('textarea');
            this.textarea.addEventListener('input', (e) => {
                callback(this.textarea.value);
            });
        }

        refresh() {
            this.textarea.value = this.item.model.getField(this.options.name);
        }

        render(id) {
            const markup = this.adapter.markup('textarea', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('textarea');
                return `<textarea name="${id}" id="${id}_0" placeholder="${this.options.placeholder ?? ''}" class="${classes}"></textarea>`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextAreaField = TextAreaField;
})();
