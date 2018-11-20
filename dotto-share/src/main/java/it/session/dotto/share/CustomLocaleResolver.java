package it.session.dotto.share;

import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import org.springframework.extensions.surf.mvc.LocaleResolver;
import org.springframework.extensions.surf.util.I18NUtil;

public class CustomLocaleResolver extends LocaleResolver {

    private String language;

    public CustomLocaleResolver(String language) {
        this.language = language;
    }
    
    public Locale resolveLocale(HttpServletRequest request) {
    Locale locale = new Locale(this.language);
    I18NUtil.setLocale(locale);

    return locale;
    }
}