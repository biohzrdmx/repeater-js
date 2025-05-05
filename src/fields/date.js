(() => {
    class DateField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('min', 'max', 'step');
        }

        render(id) {
            const markup = this.adapter.markup('date', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('date');
                const attributes = this.getAttributes();
                return `<input type="date" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.DateField = DateField;
})();