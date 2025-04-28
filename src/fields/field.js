(() => {
    class AbstractField {

        adapter;

        options;

        constructor(options, adapter) {
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

        render(id) {
            throw 'Method render must be implemented';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.AbstractField = AbstractField;
})();
