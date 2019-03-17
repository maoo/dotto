var invoiceId = url.templateArgs.invoiceid;
var state = url.templateArgs.state;
var invoice = search.findNode("workspace://SpacesStore/"+invoiceId);
// logger.system.out("Updating state for workspace://SpacesStore/"+invoiceId+" - state: "+state);
invoice.properties["dotto:invoiceStatus"] = state;
if (state == "errore_conversione") {
    invoice.properties["dotto:invoiceMessagge"] = "Errore di conversione fattura; verificare il formato";
}
invoice.save();