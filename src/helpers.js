export const renderTerms = (taxonomy, seperator) => {
  return Object
    .keys(taxonomy)
    .map(key => taxonomy[key]['name'])
    .join(seperator);
}
