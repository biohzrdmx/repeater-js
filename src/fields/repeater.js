(() => {
    class RepeaterField extends Repeater.AbstractField {

        init(element, callback) {
            const container = element.querySelector('.repeater-nested');
            const repeater = Repeater.create(container, this.options.schema, new Repeater.BootstrapAdapter);
            container.addEventListener('repeater.changed', (e) => {
                callback( repeater.save(false) );
            });
            callback( repeater.save(false) );
        }

        render(id) {
            return '<div class="repeater-nested"></div>';
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.RepeaterField = RepeaterField;
})();