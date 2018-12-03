package it.session.dotto.invoice;

public class DottoInvoiceModel  {

	public static final String NAMESPACE_DOTTO_CONTENT_MODEL = "https://session.it/dotto/model/content/1.0";

	public static final String ASPECT_INVOICE = "invoiceable";

	public static final String PROP_INVOICE_STATUS = "invoiceStatus";

	public static final String INVOICE_STATUS_NOT_PROCESSED = "in_attesa";
	public static final String INVOICE_STATUS_FAILED = "scartata";
}
