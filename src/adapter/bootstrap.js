(() => {
    class BootstrapAdapter extends window.Repeater.AbstractAdapter {

        classes(type) {
            switch(type) {
                case 'hide':
                    return 'd-none';
                case 'row':
                    return 'row g-3';
                case 'column':
                    return 'col-lg';
                case 'repeater':
                    return 'repeater-bootstrap';
                case 'field':
                    return 'mb-3';
                case 'button':
                    return 'btn btn-primary';
                case 'label':
                    return 'mb-1';
                case 'text':
                case 'password':
                case 'date':
                case 'time':
                case 'datetime':
                case 'number':
                case 'textarea':
                    return 'form-control';
                case 'color':
                    return 'form-control form-control-color';
                case 'range':
                    return 'form-range';
                case 'select':
                    return 'form-select';
                default:
                    const custom = this.customClasses[type] || null;
                    return custom ? custom() : '';
            }
        }

        markup(type, field, id) {
            const attributes = field.getAttributes();
            switch(type) {
                case 'phone':
                    return this.phoneMarkup(field, id, attributes);
                case 'email':
                    return this.emailMarkup(field, id, attributes);
                case 'url':
                    return this.urlMarkup(field, id, attributes);
                case 'checkbox':
                    return this.checkboxMarkup(field, id, attributes);
                case 'radio':
                    return this.radioMarkup(field, id, attributes);
                case 'toggle':
                    return this.toggleMarkup(field, id, attributes);
                default:
                    const custom = this.customMarkup[type] || null;
                    return custom ? custom(field, id, attributes) :  null;
            }
        }

        phoneMarkup(field, id, attributes) {
            return `<div class="input-group">
                <span class="input-group-text">${window.Repeater.icon('phone', {'class': 'text-muted'})}</span>
                <input type="tel" name="${id}" id="${id}_0" ${attributes} class="form-control">
            </div>`;
        }

        emailMarkup(field, id, attributes) {
            return `<div class="input-group">
                <span class="input-group-text">${window.Repeater.icon('email', {'class': 'text-muted'})}</span>
                <input type="email" name="${id}" id="${id}_0" ${attributes} class="form-control">
            </div>`;
        }

        urlMarkup(field, id, attributes) {
            return `<div class="input-group">
                <span class="input-group-text">${window.Repeater.icon('web', {'class': 'text-muted'})}</span>
                <input type="url" name="${id}" id="${id}_0" ${attributes} class="form-control">
            </div>`;
        }

        toggleMarkup(field, id, attributes) {
            const label = field.options.details || field.options.label;
            return `<div class="form-check form-switch">
                <input type="checkbox" name="${id}" id="${id}_0" ${attributes} class="form-check-input">
                <label class="form-check-label" for="${id}_0">${label}</label>
            </div>`;
        }

        radioMarkup(field, id) {
            const options = [];
            let index = 0;
            const source = typeof field.options.options === 'function' ? field.options.options(field) : field.options.options;
            source.forEach((option) => {
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
            const source = typeof field.options.options === 'function' ? field.options.options(field) : field.options.options;
            source.forEach((option) => {
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
