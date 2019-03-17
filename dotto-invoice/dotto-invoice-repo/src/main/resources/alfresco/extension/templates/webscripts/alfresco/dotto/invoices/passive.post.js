var now = new Date();
var month = parseInt(now.getMonth())+1;
var datePath = "/" + now.getFullYear() + '/' + month + "/" + now.getDate();
var companyName = url.templateArgs.companyname;
var invoiceName = url.templateArgs.invoicename;

// Identify Dotto root folder for passive invoices - passiveRootFolder
// TODO - put in common with notification.post.js
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);
var dottoRootFolder = properties["dotto.invoice.root.folder"];
var passiveRootFolder = companyhome;
if (dottoRootFolder) {
  passiveRootFolder = companyhome.childByNamePath(dottoRootFolder);
}

// Force creation of passive folder
var passivePath = companyName + "/" + properties["dotto.invoice.passive.folder"]  + datePath;
var passiveParentFolder = passiveRootFolder;
for each (var pathItem in passivePath.split("/")) {
    if (passiveParentFolder.childByNamePath(pathItem) == null) {
      passiveParentFolder = passiveParentFolder.createFolder(pathItem);
    } else {
      passiveParentFolder = passiveParentFolder.childByNamePath(pathItem);
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
  invoice = passiveParentFolder.createFile(file.filename);
  invoice.properties.content.write(file.content);
  invoice.properties.content.mimetype = "text/html";
  invoice.name = invoiceName + "-" + invoice.name;

  // invoice.properties.content.guessMimetype(file.filename);
  invoice.save();
  logger.system.out("Got passive invoice '" + file.filename + "', mimetype is set to '"+invoice.properties.content.mimetype+"'");
}