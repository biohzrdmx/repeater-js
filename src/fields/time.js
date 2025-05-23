(() => {
    class TimeField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('min', 'max', 'step');
        }

        render(id) {
            const markup = this.adapter.markup('time', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('time');
                const attributes = this.getAttributes();
                return `<input type="time" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.TimeField = TimeField;
    window.Repeater.fields = window.Repeater.fields || {};
    window.Repeater.fields.time = window.Repeater.TimeField;
})();