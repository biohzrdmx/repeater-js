(() => {
    class PasswordField extends Repeater.TextField {

        render(id) {
            const markup = this.adapter.markup('password', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('password');
                const attributes = this.getAttributes();
                return `<input type="password" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.PasswordField = PasswordField;
})();