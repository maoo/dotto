package it.session.dotto.client;

import javax.xml.ws.WebServiceRef;

import org.apache.commons.logging.Log;

import org.apache.commons.logging.LogFactory;

import it.session.dotto.generated.wsdl.HelloService;
import it.session.dotto.generated.wsdl.HelloPortType;

public class WSDLClient {

	// @WebServiceRef(wsdlLocation="http://localhost:8080/helloservice/hello?wsdl")
	HelloService service;

	private static final String CALLBACK_URL = "http://spring.io/guides/gs-producing-web-service/GetCountryRequest";

    private static Log logger = LogFactory.getLog(WSDLClient.class);

    private String wsdlEndpoint = "http://localhost:8080/ws/Hello_Port";

	public HelloPortType getHelloPort() {
		HelloService request = new HelloService();

		logger.info("Requesting location for HelloPort");

		HelloPortType response = service.getHelloPort();

        logger.info("Response: "+response.sayHello("test"));
		return response;
	}

}