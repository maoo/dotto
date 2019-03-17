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
    logger.system.out("INFO - Looking for Dotto Invoice root folder, navigating to "+pathItem);
    pendingRootFolder = pendingRootFolder.childByNamePath(pathItem);
  }
}

var activeInvoicePath = pendingRootFolder.qnamePath + "/cm:" + companyName + "/" + properties["dotto.invoice.active.path"];
var pathQuery = "PATH:'"+ activeInvoicePath + "//*' AND dotto:invoiceStatus:'in_attesa'";
logger.system.out("INFO - Searching for... "+pathQuery);

var def = {
    query: pathQuery,
    store: "workspace://SpacesStore",
    language: "fts-alfresco",
    sort: [sort],
    page: paging 
};
model["results"] = search.query(def);