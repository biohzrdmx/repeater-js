(() => {
    class TextAreaField extends Repeater.AbstractField {

        init(element, callback, initial = '') {
            const textarea = element.querySelector('textarea');
            textarea.value = initial;
            textarea.addEventListener('input', (e) => {
                callback(textarea.value);
            });
            callback(textarea.value);
        }

        render(id) {
            const markup = this.adapter.markup('textarea', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('textarea');
                return `<textarea name="${id}" id="${id}_0" class="${classes}"></textarea>`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextAreaField = TextAreaField;
})();
