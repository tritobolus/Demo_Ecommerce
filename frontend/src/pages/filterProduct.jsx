import Fuse from "fuse.js";

export const filterProduct = (products, searchQuery) => {
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["product_brand", "description", "product_model", "product_name"],
  };

  const fuse = new Fuse(products, fuseOptions);

  // Change the pattern
  const searchPattern = searchQuery;
  const result = fuse.search(searchPattern)
  console.log("from filter.js",result)
  return result
};



