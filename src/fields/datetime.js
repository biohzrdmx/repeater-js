(() => {
    class DateTimeField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('min', 'max', 'step');
        }

        render(id) {
            const markup = this.adapter.markup('datetime', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('datetime');
                const attributes = this.getAttributes();
                return `<input type="datetime-local" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.DateTimeField = DateTimeField;
    window.Repeater.fields = window.Repeater.fields || {};
    window.Repeater.fields.datetime = window.Repeater.DateTimeField;
})();