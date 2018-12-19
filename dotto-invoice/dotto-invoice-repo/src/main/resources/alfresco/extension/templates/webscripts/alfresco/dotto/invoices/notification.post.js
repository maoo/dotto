var now = new Date();
var month = parseInt(now.getMonth())+1;
var datePath = "/" + now.getFullYear() + '/' + month + "/" + now.getDate();

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
    logger.system.out("Checking "+pathItem + " on nodeRef "+notificationsParentFolder);
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
  notification.properties.content.write(file.content);
  notification.properties.content.mimetype = "text/html";
  // notification.properties.content.guessMimetype(file.filename);
  notification.save();
}

// Updating invoice status and link notification to invoice
var filename = url.templateArgs.filename;

var activeInvoicePath = notificationsRootFolder.qnamePath + "/cm:" + companyName + "/" + properties["dotto.invoice.active.path"];
var pathQuery = "PATH:'"+ activeInvoicePath + "//*'";

var query = {
  query: pathQuery + " AND dotto:invoiceName:'" + filename + "'",
  store: "workspace://SpacesStore",
  language: "fts-alfresco"
};

// logger.system.out("Running query...");
// logger.system.out(pathQuery + " AND dotto:invoiceName:'" + filename + "'");

var invoice = search.query(query)[0];

// logger.system.out("Found invoice: "+invoice);
// logger.system.out("Setting status: '"+status+"'");

invoice.properties["dotto:invoiceStatus"] = status;
invoice.save();
invoice.createAssociation(notification, 'dotto:notifications');
invoice.save();