(() => {
    class NumberField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes.push('min', 'max', 'step');
        }

        render(id) {
            const markup = this.adapter.markup('number', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('number');
                const attributes = this.getAttributes();
                return `<input type="number" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.NumberField = NumberField;
})();