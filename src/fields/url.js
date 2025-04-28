(() => {
    class UrlField extends Repeater.AbstractField {

        init(element, callback) {
            const input = element.querySelector('input');
            input.addEventListener('input', (e) => {
                callback(input.value);
            });
            callback(input.value);
        }

        render(id) {
            const markup = this.adapter.markup('url', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('url');
                return `<input type="url" name="${id}" id="${id}_0" class="${classes}" value="">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.UrlField = UrlField;
})();