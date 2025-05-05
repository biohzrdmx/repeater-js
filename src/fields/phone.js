(() => {
    class PhoneField extends Repeater.TextField {

        render(id) {
            const markup = this.adapter.markup('phone', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('phone');
                const attributes = this.getAttributes();
                return `<input type="tel" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.PhoneField = PhoneField;
})();