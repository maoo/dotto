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

public class MarkInvoiceAsProcessedAction extends ActionExecuterAbstractBase {
	private static Log logger = LogFactory.getLog(MarkInvoiceAsProcessedAction.class);

	private NodeService nodeService;

	public MarkInvoiceAsProcessedAction(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
	    String status = (String)action.getParameterValue(DottoInvoiceModel.PROP_INVOICE_STATUS);

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
				DottoInvoiceModel.PROP_INVOICE_PROCESSED), true);
		nodeService.setProperties(actionedUponNodeRef,properties);
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
	}
}
