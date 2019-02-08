package it.session.dotto.share;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
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
            System.out.println("!!!! ALF GLOBAL CONTENT !!!!");
            System.out.println(getStringFromInputStream(in));
            System.out.println("!!!! END ALF GLOBAL CONTENT !!!!");
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

// convert InputStream to String
private static String getStringFromInputStream(InputStream is) {

    BufferedReader br = null;
    StringBuilder sb = new StringBuilder();

    String line;
    try {

        br = new BufferedReader(new InputStreamReader(is));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        if (br != null) {
            try {
                br.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    return sb.toString();

}
}