package it.session.dotto.invoice.actions;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import it.session.dotto.invoice.DottoInvoiceModel;

public class SubmitInvoiceAction extends ActionExecuterAbstractBase {
	private static Log logger = LogFactory.getLog(SubmitInvoiceAction.class);

	private NodeService nodeService;
	private List<String> allowedStatuses = Arrays.asList(new String[]{DottoInvoiceModel.INVOICE_STATUS_FAILED, DottoInvoiceModel.INVOICE_STATUS_NOT_PROCESSED});

	public SubmitInvoiceAction(NodeService nodeService) {
		this.nodeService = nodeService;
		logger.debug("SubmitInvoiceAction constructor invoked");
	}

	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
	    String status = (String)action.getParameterValue(DottoInvoiceModel.PROP_INVOICE_STATUS);
		logger.debug("SubmitInvoiceAction invoked on nodeRef "+actionedUponNodeRef.toString());
		logger.debug("Doc status: "+status);
		// Check if status is ok, otherwise skip the action and log something
	    if (status == null || this.allowedStatuses.contains(status)) {
			Map<QName, Serializable> properties = nodeService.getProperties(actionedUponNodeRef);

			// Add the related aspect
			this.nodeService.addAspect(
				actionedUponNodeRef,
				QName.createQName(
					DottoInvoiceModel.NAMESPACE_DOTTO_CONTENT_MODEL,
					DottoInvoiceModel.ASPECT_INVOICE), new HashMap<QName, Serializable>());

			// Marking document with ws status in progress
			properties.put(
				QName.createQName(
					DottoInvoiceModel.NAMESPACE_DOTTO_CONTENT_MODEL,
					DottoInvoiceModel.PROP_INVOICE_STATUS), DottoInvoiceModel.INVOICE_STATUS_NOT_PROCESSED);
			logger.debug(
				"SubmitInvoiceAction - Status set to " +
				DottoInvoiceModel.INVOICE_STATUS_NOT_PROCESSED);

			nodeService.setProperties(actionedUponNodeRef,properties);
		} else {
			// TODO - give some visual feedback to user, ie throwing exception
			logger.info("Skipping SubmitInvoiceAction execution, due to status: " + status);
		}
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
	}
}
