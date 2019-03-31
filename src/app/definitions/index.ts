export const stripAndFilterTags = (tags: string) => {
  const commaSeparatedTags = tags.replace(/(;|\n)+/g, ',');

  const filteredTags = commaSeparatedTags.split(',')
    .filter(tag => tag.toString().trim());

  return filteredTags.join(',');
};
