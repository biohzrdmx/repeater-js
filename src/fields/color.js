(() => {
    class ColorField extends Repeater.TextField {

        render(id) {
            const markup = this.adapter.markup('color', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('color');
                const attributes = this.getAttributes();
                return `<input type="color" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.ColorField = ColorField;
    window.Repeater.fields = window.Repeater.fields || {};
    window.Repeater.fields.color = window.Repeater.ColorField;
})();