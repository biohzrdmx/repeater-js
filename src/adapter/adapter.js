(() => {
    class AbstractAdapter {

        customClasses;

        customMarkup;

        constructor(customClasses = {}, customMarkup = {}) {
            this.customClasses = customClasses;
            this.customMarkup = customMarkup;
        }

        registerCustomClass(type, callback) {
            this.customClasses[type] = callback;
        }

        registerCustomMarkup(type, callback) {
            this.customMarkup[type] = callback;
        }

        classes(type) {
            throw 'Method classes must be implemented';
        }

        markup(type, field, id) {
            throw 'Method markup must be implemented';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.AbstractAdapter = AbstractAdapter;
})();
