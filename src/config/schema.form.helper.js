angular.module('opengate-angular-js').config(function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {

    var helper = function(name, schema, options) {
        if (schema.type === 'string' && schema.format == 'helperdialog') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'helperdialog';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
        if (schema.type === 'boolean') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'boolean';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(helper);
    schemaFormProvider.defaults.boolean.unshift(helper);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'helperdialog', // Form type that should render this add-on
        'views/schema.form.helper.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'boolean', // Form type that should render this add-on
        'views/schema.form.helper.boolean.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    var customUiSelect = function(name, schema, options) {
        if (schema.type === 'string' && schema.format == 'customuiselect') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = (schema.properties && schema.properties.type) ? schema.properties.type : 'string';
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(customUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'entity', // Form type that should render this add-on
        'views/schema.form.entity.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datastream', // Form type that should render this add-on
        'views/schema.form.datastream.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

});