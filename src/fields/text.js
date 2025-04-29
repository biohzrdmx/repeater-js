(() => {
    class TextField extends Repeater.AbstractField {

        init(element, callback, initial = '') {
            const input = element.querySelector('input');
            input.value = initial;
            input.addEventListener('input', (e) => {
                callback(input.value);
            });
            callback(input.value);
        }

        render(id) {
            const markup = this.adapter.markup('text', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('text');
                return `<input type="text" name="${id}" id="${id}_0" class="${classes}" value="">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextField = TextField;
})();