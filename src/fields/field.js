(() => {
    class AbstractField {

        item;

        adapter;

        options;

        element;

        attributes = [];

        constructor(item, options, adapter) {
            this.item = item;
            this.options = options;
            this.adapter = adapter;
        }

        label(id) {
            const classes = this.adapter.classes('label');
            return `<label for="${id}_0" class="${classes}">${this.options.label}</label>`;
        }

        init(element, callback) {
            throw 'Method init must be implemented';
        }

        refresh() {
            throw 'Method refresh must be implemented';
        }

        render(id) {
            throw 'Method render must be implemented';
        }

        getAttributes() {
            let attributes = [];
            this.attributes.forEach(attribute => {
                if (this.options.hasOwnProperty(attribute)) {
                    const value = this.options[attribute];
                    if ( typeof value == "boolean" ) {
                        attributes.push(attribute);
                    } else {
                        attributes.push(`${attribute}="${value}"`);
                    }
                }
            });
            return attributes.join(' ');
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.AbstractField = AbstractField;
})();
