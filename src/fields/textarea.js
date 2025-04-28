(() => {
    class TextAreaField extends Repeater.AbstractField {

        init(element, callback) {
            const textarea = element.querySelector('textarea');
            textarea.addEventListener('input', (e) => {
                callback(textarea.value);
            });
            callback(textarea.value);
        }

        render(id) {
            const classes = this.adapter.classes('textarea');
            return `<textarea id="${id}_0" class="${classes}"></textarea>`;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextAreaField = TextAreaField;
})();
