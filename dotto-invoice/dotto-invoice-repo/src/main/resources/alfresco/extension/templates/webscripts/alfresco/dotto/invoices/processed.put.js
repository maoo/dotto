var invoiceId = url.templateArgs.invoiceid;
var invoice = search.findNode("workspace://SpacesStore/"+invoiceId);
logger.system.out("Processing workspace://SpacesStore/"+invoiceId);
invoice.properties["dotto:invoiceStatus"] = "Processed";
invoice.save();