// var sort1 = 
// { 
//   column: "@{http://www.alfresco.org/model/content/1.0}modified", 
//   ascending: false 
// }; 

// var sort2 = 
// { 
//   column: "@{http://www.alfresco.org/model/content/1.0}created", 
//   ascending: false
// };

var paging = { 
  maxItems: 1000,
  skipCount: 0
};

var def = {
    query: "dotto:invoiceStatus:'Not Processed'",
    store: "workspace://SpacesStore",
    language: "fts-alfresco",
    // sort: [sort1, sort2],
    page: paging 
};
model["results"] = search.query(def);