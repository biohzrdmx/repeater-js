(() => {
    class BootstrapAdapter extends window.Repeater.AbstractAdapter {

        classes(type) {
            switch(type) {
                case 'repeater':
                    return 'repeater-bootstrap';
                case 'field':
                    return 'mb-3';
                case 'button':
                    return 'btn btn-primary';
                case 'label':
                    return 'mb-1';
                case 'text':
                case 'textarea':
                    return 'form-control';
                case 'select':
                    return 'form-select';
                default:
                    return '';
            }
        }

        markup(type, field) {
            switch(type) {
                default:
                    return field;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.BootstrapAdapter = BootstrapAdapter;
})();
