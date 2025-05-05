(() => {
    class RangeField extends Repeater.TextField {

        constructor(element, options, adapter) {
            super(element, options, adapter);
            this.attributes = ['min', 'max', 'step', 'value'];
        }

        render(id) {
            const markup = this.adapter.markup('range', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('range');
                const attributes = this.getAttributes();
                return `<input type="range" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.RangeField = RangeField;
})();