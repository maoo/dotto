var now = new Date();
var datePath = "/" + now.getFullYear() + '/' + now.getMonth() + "/" + now.getDate();

var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);
var notificationsRootPath = properties["dotto.invoice.notifications.path"];
var notificationsParentPath = notificationsRootPath + datePath;
var pathArray = notificationsParentPath.split("/");

// Force creation of notification folder
var notificationsParentFolder = companyhome;
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

// Updating invoice status
var invoiceId = url.templateArgs.invoiceid;
var invoice = search.findNode("workspace://SpacesStore/"+invoiceId);
invoice.createAssociation(notification, 'dotto:notifications');
invoice.save();