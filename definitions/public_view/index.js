const index_config = require("./index.json").configs;

index_config.forEach((stage) => {
    const stage_name = stage.stage;

    stage.file_paths.forEach((path) => {
        const file_config = require(path);

        file_config.configs.forEach((table_config) => {
            const table_name = table_config.table_name;

            const dataset_name =
                table_config.dataset_name ?? file_config.default_configs.dataset_name;

            publish(`vw__${stage_name}__${dataset_name}__${table_name.replace('tbl__', '')}`, {
                type: "view",
                schema: `${stage_name}__public_view`,
                description: `Alias for ${table_name} staging view`,
                tags: [`${stage_name}__public_view`, stage_name, "public_view", dataset_name, table_name]
            }).query((ctx) => {
                return common.generate_public_view(
                    `${stage_name}__${dataset_name}`,
                    `${table_name}`,
                );
            });
        });
    });
});