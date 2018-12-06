var sort = { 
  column: "@{http://www.alfresco.org/model/content/1.0}created", 
  ascending: false
};

var paging = { 
  maxItems: 1000,
  skipCount: 0
};

var companyName = url.templateArgs.companyname;
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);

var dottoRootFolder = properties["dotto.invoice.root.folder"];
var pendingRootFolder = companyhome;
if (dottoRootFolder) {
  for each (var pathItem in dottoRootFolder.split("/")) {
    pendingRootFolder = pendingRootFolder.childByNamePath(pathItem);
  }
}

var activeInvoicePath = pendingRootFolder.qnamePath + "/cm:" + companyName + "/" + properties["dotto.invoice.active.path"];
var pathQuery = "PATH:'"+ activeInvoicePath + "//*'";

var def = {
    query: pathQuery + " AND dotto:invoiceStatus:'in_attesa'",
    store: "workspace://SpacesStore",
    language: "fts-alfresco",
    sort: [sort],
    page: paging 
};
model["results"] = search.query(def);