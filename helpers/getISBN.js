module.exports = function getISBN(industryIDs) {
  let id;
  if (Array.isArray(industryIDs)) {
    id = industryIDs.find(idNum => idNum.type === 'ISBN_13');
    if (!id) id = industryIDs.find(idNum => idNum.type === 'ISBN_10');
  }
  if (id) {
    return id.identifier;
  }
  return '';
};
