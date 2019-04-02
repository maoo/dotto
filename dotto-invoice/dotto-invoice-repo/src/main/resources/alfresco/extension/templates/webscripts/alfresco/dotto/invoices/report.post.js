var now = new Date();
var year = now.getFullYear();

// Identify Dotto root folder for reports
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties = ctxt.getBean("global-properties", java.util.Properties);
var dottoRootFolder = properties["dotto.invoice.root.folder"];
var reportsRootFolder = companyhome;
if (dottoRootFolder) {
  reportsRootFolder = companyhome.childByNamePath(dottoRootFolder);
}

// Force creation of report folder
var reportsPath = properties["dotto.report.root.folder"] + "/" + year;
var pathArray = reportsPath.split("/");
var reportsParentFolder = reportsRootFolder;
for each(var pathItem in pathArray) {
    logger.system.out("Checking " + pathItem + " on nodeRef " + reportsParentFolder);
    if (reportsParentFolder.childByNamePath(pathItem) == null) {
        reportsParentFolder = reportsParentFolder.createFolder(pathItem);
    } else {
        reportsParentFolder = reportsParentFolder.childByNamePath(pathItem);
    }
}

// Extract file from formdata
var file = null;
for each(field in formdata.fields) {
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
    report = reportsParentFolder.createFile(file.filename);
    report.properties.content.write(file.content);
    report.save();
}
