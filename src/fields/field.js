(() => {
    class AbstractField {

        item;

        adapter;

        options;

        element;

        attributes;

        constructor(item, options, adapter) {
            this.item = item;
            this.options = options;
            this.adapter = adapter;
            this.attributes = [];
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

        conditional(result) {
            throw 'Method conditional must be implemented';
        }

        render(id) {
            throw 'Method render must be implemented';
        }

        applyTransform(value) {
            let transformed = value;
            if (typeof this.options.transform !== 'undefined') {
                switch(this.options.transform.type) {
                    case 'lowercase':
                        transformed = value.toLowerCase();
                    break;
                    case 'uppercase':
                        transformed = value.toUpperCase();
                    break;
                    case 'titlecase':
                        transformed = value.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
                    break;
                    case 'slug':
                        transformed = this.slug(transformed);
                        break;
                    default:
                        throw new Error(`Transform "${this.options.transform.type}" is not supported`);
                }
                if (typeof this.options.transform.target === 'undefined') {
                    return transformed;
                } else {
                    const field = this.item.fields[this.options.transform.target] || null;
                    if (field) {
                        const value = this.item.model.getField(field.options.name);
                        const empty = value === '' || value === null;
                        const overwrite = this.options.transform.overwrite || false;
                        if (empty || overwrite) {
                            this.item.model.updateField(field.options.name, transformed);
                            field.refresh();
                        }
                    }
                }
            }
            return null;
        }

        slug(str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
            const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            const to   = "aaaaeeeeiiiioooouuuunc------";
            for (let i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
            str = str.replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            return str;
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
