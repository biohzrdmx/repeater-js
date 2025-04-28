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
                    const custom = this.customClasses[type] || null;
                    return custom ? custom() : '';
            }
        }

        markup(type, field, id) {
            switch(type) {
                case 'email':
                    return this.emailMarkup(field, id);
                case 'url':
                    return this.urlMarkup(field, id);
                case 'checkbox':
                    return this.checkboxMarkup(field, id);
                case 'radio':
                    return this.radioMarkup(field, id);
                default:
                    const custom = this.customMarkup[type] || null;
                    return custom ? custom(field, id) :  null;
            }
        }

        emailMarkup(field, id) {
            return `<div class="input-group">
                <span class="input-group-text">${window.Repeater.icon('email', {'class': 'text-muted'})}</span>
                <input type="email" name="${id}" id="${id}_0" class="form-control" value="">
            </div>`;
        }

        urlMarkup(field, id) {
            return `<div class="input-group">
                <span class="input-group-text">${window.Repeater.icon('web', {'class': 'text-muted'})}</span>
                <input type="url" name="${id}" id="${id}_0" class="form-control" value="">
            </div>`;
        }

        radioMarkup(field, id) {
            const options = [];
                let index = 0;
                field.options.options.forEach((option) => {
                    let value, label;
                    if (option instanceof Object) {
                        value = Object.keys(option)[0];
                        label = Object.values(option)[0];
                    } else {
                        value = label = option;
                    }
                    options.push(`<div class="form-check">
                        <input type="radio" name="${id}[]" id="${id}_${index}" class="form-check-input" value="${value}">
                        <label for="${id}_${index}" class="form-check-label">${label}</label>
                    </div>`);
                    index++;
                });
                return options.join("\n");
        }

        checkboxMarkup(field, id) {
            const options = [];
                let index = 0;
                field.options.options.forEach((option) => {
                    let value, label;
                    if (option instanceof Object) {
                        value = Object.keys(option)[0];
                        label = Object.values(option)[0];
                    } else {
                        value = label = option;
                    }
                    options.push(`<div class="form-check">
                        <input type="checkbox" name="${id}[]" id="${id}_${index}" class="form-check-input" value="${value}">
                        <label for="${id}_${index}" class="form-check-label">${label}</label>
                    </div>`);
                    index++;
                });
                return options.join("\n");
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.BootstrapAdapter = BootstrapAdapter;
})();
