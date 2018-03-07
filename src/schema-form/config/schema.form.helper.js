angular.module('opengate-angular-js').config(function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {
    'use strict';
    var helper = function(name, schema, options) {
        var f;
        if (schema.type === 'string' && schema.format === 'helperdialog') {
            f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            //f.key = sfPathProvider.stringify(options.path);
            f.type = 'helperdialog';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        } else if (schema.type === 'boolean') {
            f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'boolean';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(helper);
    schemaFormProvider.defaults.boolean.unshift(helper);

    // schemaFormProvider.defaults.radios.unshift(helper);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'helperdialog', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'boolean', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.boolean.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'checkboxes', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.checkboxes.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radios', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radios.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radiobuttons', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radiobuttons.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radios-inline', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radiosinline.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    var customUiSelect = function(name, schema, options) {
        if (schema.type === 'string' && schema.format === 'customuiselect') {
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
        'schema-form/views/schema.form.entity.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datastream', // Form type that should render this add-on
        'schema-form/views/schema.form.datastream.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

});