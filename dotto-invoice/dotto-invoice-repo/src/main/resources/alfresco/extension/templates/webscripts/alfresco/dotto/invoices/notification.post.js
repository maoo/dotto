var now = new Date();
var datePath = "/" + now.getFullYear() + '/' + now.getMonth() + "/" + now.getDate();
var status = url.templateArgs.status;
var companyName = url.templateArgs.companyname;
var filename = url.templateArgs.filename;

// Identify Dotto root folder for notifications - notificationsRootFolder
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);
var dottoRootFolder = properties["dotto.invoice.root.folder"];
var notificationsRootFolder = companyhome;
if (dottoRootFolder) {
  notificationsRootFolder = companyhome.childByNamePath(dottoRootFolder);
}

// Force creation of notification folder
var notificationsPath = companyName + "/" + properties["dotto.invoice.notifications.folder"]  + datePath;
var pathArray = notificationsPath.split("/");
var notificationsParentFolder = notificationsRootFolder;
for each (var pathItem in pathArray) {
    if (notificationsParentFolder.childByNamePath(pathItem) == null) {
        notificationsParentFolder = notificationsParentFolder.createFolder(pathItem);
    } else {
        notificationsParentFolder = notificationsParentFolder.childByNamePath(pathItem);
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
  notification = notificationsParentFolder.createFile(file.filename);
  notification.properties.content.guessMimetype(file.filename);
  notification.properties.content.write(file.content);
  notification.save();
}

// Updating invoice status and link notification to invoice
var filename = url.templateArgs.filename;

var query = {
  query: "dotto:invoiceName:'" + filename + "'",
  store: "workspace://SpacesStore",
  language: "fts-alfresco"
};
var invoice = search.query(query)[0];
invoice.properties["dotto:invoiceStatus"] = status;
invoice.createAssociation(notification, 'dotto:notifications');
invoice.save();