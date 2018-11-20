package it.session.dotto.actions;

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

import it.session.dotto.DottoModel;
import it.session.dotto.client.WSDLClient;

public class InvokeWebService extends ActionExecuterAbstractBase {
	private static Log logger = LogFactory.getLog(InvokeWebService.class);

	private NodeService nodeService;
	private WSDLClient wsdlClient;
	private String wsType;

	private String statusProp;
	private String responsesProp;
	private String idProp;
	private String inProgressStatus;
	private List<String> allowedStatuses;
	private String aspect;

	public InvokeWebService(NodeService nodeService, String wsType, WSDLClient wsdlClient) {
		this.nodeService = nodeService;
		this.wsType = wsType;
		this.wsdlClient = wsdlClient;

		if (this.wsType.equals("invoice")) {
			this.aspect = DottoModel.ASPECT_INVOICE;
			this.statusProp = DottoModel.PROP_INVOICE_STATUS;
			this.responsesProp = DottoModel.PROP_INVOICE_RESPONSES;
			this.idProp = DottoModel.PROP_INVOICE_ID;
			this.allowedStatuses = Arrays.asList(new String[]{DottoModel.INVOICE_STATUS_FAILED, DottoModel.INVOICE_STATUS_NOT_SUBMITTED});
			this.inProgressStatus = DottoModel.INVOICE_STATUS_IN_PROGRESS;
		} else if (this.wsType.equals("archive")) {
			this.aspect = DottoModel.ASPECT_ARCHIVE;
			this.statusProp = DottoModel.PROP_ARCHIVE_STATUS;
			this.responsesProp = DottoModel.PROP_ARCHIVE_RESPONSES;
			this.idProp = DottoModel.PROP_ARCHIVE_ID;
			this.allowedStatuses = Arrays.asList(new String[]{DottoModel.ARCHIVE_STATUS_FAILED, DottoModel.ARCHIVE_STATUS_NOT_SUBMITTED});
			this.inProgressStatus = DottoModel.ARCHIVE_STATUS_IN_PROGRESS;
		}
		logger.debug("InvokeWebService constructor invoked with wsType = "+wsType);
	}

	@Override
	protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
	    String status = (String)action.getParameterValue(statusProp);
		logger.debug("InvokeWebService - executing " + this.wsType);
		logger.debug("NodeRef: "+actionedUponNodeRef.toString());
		logger.debug("Doc status: "+status);
		// Check if status is ok, otherwise skip the action and log something
	    if (status == null || this.allowedStatuses.contains(status)) {
			Map<QName, Serializable> properties = nodeService.getProperties(actionedUponNodeRef);
			ArrayList<String> responses = (ArrayList<String>)properties.get(this.responsesProp);

			// Add the related aspect
			this.nodeService.addAspect(
				actionedUponNodeRef,
				QName.createQName(
					DottoModel.NAMESPACE_DOTTO_CONTENT_MODEL,
					this.aspect), new HashMap<QName, Serializable>());

			// Marking document with ws status in progress
			properties.put(
				QName.createQName(
					DottoModel.NAMESPACE_DOTTO_CONTENT_MODEL,
					this.statusProp), this.inProgressStatus);
			logger.debug(
				"InvokeWebService - Status set to " +
				this.inProgressStatus);

			// TODO - invoke web service
			// String response =
			// 	new Date() +
			// 	" Response: " +
			// 	this.wsdlClient.getHelloPort();
			String response =
				new Date() +
				" Response: hello world!";
			logger.debug("InvokeWebService - Got Web Service response:");
			logger.debug("WS Type: "+this.wsType);
			logger.debug("NodeRef: "+actionedUponNodeRef.toString());
			logger.debug("Response: "+response);

			responses.add(response);
			properties.put(QName.createQName(
					DottoModel.NAMESPACE_DOTTO_CONTENT_MODEL,
					this.responsesProp), responses);
			logger.debug("InvokeWebService - Responses updated");
			logger.info(
				"InvokeWebService - WS " +
				this.wsType + "invoked on doc " +
				actionedUponNodeRef.toString());

			nodeService.setProperties(actionedUponNodeRef,properties);
		} else {
			// TODO - give some visual feedback to user
			logger.info("Skipping WS execution, due to status: " + status);
		}
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
	}
}
