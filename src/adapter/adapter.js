(() => {
    class AbstractAdapter {

        classes(type) {
            throw 'Method classes must be implemented';
        }

        markup(field) {
            throw 'Method markup must be implemented';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.AbstractAdapter = AbstractAdapter;
})();
