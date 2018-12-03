var now = new Date();
var datePath = "/" + now.getFullYear() + '/' + now.getMonth() + "/" + now.getDate();

var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);
var passiveInvoiceRootPath = properties["dotto.invoice.passiveInvoices.path"];
var passiveInvoicePath = passiveInvoiceRootPath + datePath;
var pathArray = passiveInvoicePath.split("/");

// Force creation of notification folder
var passiveInvoiceFolder = companyhome;
for each (var pathItem in pathArray) {
    if (passiveInvoiceFolder.childByNamePath(pathItem) == null) {
        passiveInvoiceFolder = passiveInvoiceFolder.createFolder(pathItem);
    } else {
        passiveInvoiceFolder = passiveInvoiceFolder.childByNamePath(pathItem);
    }
}

// Extract file from formdata
var file = null;
for each (field in formdata.fields) {
  if (field.name == "file" && field.isFile) {
    file = field;
  }
}

// ensure file has been uploaded
if (file.filename == "") {
  status.code = 400;
  status.message = "Uploaded file cannot be located";
  status.redirect = true;
} else {
  // create document in company home from uploaded file
  invoice = passiveInvoiceFolder.createFile(file.filename);
  invoice.properties.content.guessMimetype(file.filename);
  invoice.properties.content.write(file.content);
  invoice.save();
}