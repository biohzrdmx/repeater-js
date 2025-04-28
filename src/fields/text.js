(() => {
    class TextField extends Repeater.AbstractField {

        init(element, callback) {
            const input = element.querySelector('input');
            input.addEventListener('input', (e) => {
                callback(input.value);
            });
            callback(input.value);
        }

        render(id) {
            const classes = this.adapter.classes('text');
            return `<input type="text" id="${id}_0" class="${classes}" value="">`;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TextField = TextField;
})();