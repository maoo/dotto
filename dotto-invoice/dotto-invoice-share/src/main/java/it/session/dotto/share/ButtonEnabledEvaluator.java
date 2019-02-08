package it.session.dotto.share;

import java.io.InputStream;
import java.util.Properties;

import org.alfresco.web.evaluator.BaseEvaluator;
import org.json.simple.JSONObject;

public class ButtonEnabledEvaluator extends BaseEvaluator {

    private boolean enabled;

    public ButtonEnabledEvaluator(String propertyName) {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
       Properties prop = new Properties();
       InputStream in = classLoader.getResourceAsStream("alfresco-global.properties");       
       try {
            prop.load(in);
            this.enabled = new Boolean(prop.getProperty(propertyName));
            in.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }       
    }
    @Override
    public boolean evaluate(JSONObject jsonObject) {
        return this.enabled;
    }
}