module.exports.generate_public_view = (
  dataset_name,
  table_name,
) => `
     SELECT *
       FROM \`${dataset_name}.${table_name}\`
`;
