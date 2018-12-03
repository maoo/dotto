var invoiceId = url.templateArgs.invoiceid;
var filename = url.templateArgs.filename;
var invoice = search.findNode("workspace://SpacesStore/"+invoiceId);
logger.system.out("Processing workspace://SpacesStore/"+invoiceId);
invoice.properties["dotto:invoiceStatus"] = "processato";
invoice.properties["dotto:invoiceName"] = filename;
invoice.save();