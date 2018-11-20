package it.session.dotto;

public class DottoModel  {

	public static final String NAMESPACE_DOTTO_CONTENT_MODEL = "https://session.it/dotto/model/content/1.0";

	public static final String ASPECT_ARCHIVE = "archivable";
	public static final String ASPECT_INVOICE = "invoiceable";

	public static final String PROP_INVOICE_ID = "invoiceId";
	public static final String PROP_INVOICE_STATUS = "invoiceStatus";
	public static final String PROP_INVOICE_RESPONSES = "invoiceResponses";

	public static final String PROP_ARCHIVE_ID = "archiveId";
	public static final String PROP_ARCHIVE_STATUS = "archiveStatus";
	public static final String PROP_ARCHIVE_RESPONSES = "archiveResponses";

	public static final String INVOICE_STATUS_NOT_SUBMITTED = "Not submitted";
	public static final String INVOICE_STATUS_FAILED = "Failed";
	public static final String INVOICE_STATUS_IN_PROGRESS = "In Progress";
	public static final String INVOICE_STATUS_INVOICED = "Invoiced";

	public static final String ARCHIVE_STATUS_NOT_SUBMITTED = "Not submitted";
	public static final String ARCHIVE_STATUS_FAILED = "Failed";
	public static final String ARCHIVE_STATUS_IN_PROGRESS = "In Progress";
	public static final String ARCHIVE_STATUS_INVOICED = "Archived";
}
