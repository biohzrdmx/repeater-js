(() => {
    class Model {

        id;

        fields;

        metadata;

        constructor(id) {
            this.id = id;
            this.fields = {};
            this.metadata = {};
            this.changed = [];
        }

        addField(name, value) {
            this.fields[name] = value;
        }

        updateField(name, value) {
            this.fields[name] = value;
        }

        getField(name, defaultValue = null) {
            return this.fields[name] || defaultValue;
        }

        setMetadata(name, value) {
            this.metadata[name] = value;
        }

        getMetadata(name, defaultValue = null) {
            return this.metadata[name] || defaultValue;
        }

        serialize() {
            const serialized = {};
            Object.entries(this.metadata).forEach(([name, value]) => {
                serialized[`_${name}`] = value;
            });
            Object.entries(this.fields).forEach(([name, value]) => {
                if (value !== null) {
                    serialized[name] = value;
                }
            });
            return serialized;
        }

        unserialize(data) {
            Object.keys(this.fields).forEach(field => {
                this.fields[field] = data[field] || null;
            })
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Model = Model;
})();
