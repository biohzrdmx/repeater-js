(() => {
    class EmailField extends Repeater.TextField {

        render(id) {
            const markup = this.adapter.markup('email', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('email');
                return `<input type="email" name="${id}" id="${id}_0" placeholder="${this.options.placeholder ?? ''}" class="${classes}" value="">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.EmailField = EmailField;
})();