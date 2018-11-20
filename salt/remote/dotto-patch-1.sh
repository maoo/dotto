#!/bin/bash

SOFFICE_SCRIPT="https://gist.githubusercontent.com/maoo/2f6db53757be46c61099ebb5f3ef8346/raw/faaf050d0df8074cfb2cfe36a26ac2542668687d/soffice.sh"

$BACKUP_DIR=~

# Packages needed below
yum install -y zip unzip

# Where the current Alfresco installation resides
ALFRESCO_ROOT=/opt/alfresco-community
cd $ALFRESCO_ROOT

# 1. Shutdown the instance
/etc/init.d/alfresco stop
sleep 5
kill $(ps aux | grep -i 'alfresco' | awk '{print $2}')

# 2. Make a backup
zip -r $BACKUP_DIR/dotto-backup-`date +%F`.zip amps amps_share logs tomcat solr4

# 3. Cleanup the instance
rm -rf *.log *.log.* alfresco.ico README.txt bin/{*.dll,*.bat} uninstall* licenses modules
rm -rf tomcat/{temp/*,shared/classes/alfresco-global.properties.sample,logs/*}
rm -rf tomcat/webapps/{awe,awe.war,host-manager,manager,wqms*}

# 4. Deleting indexes, if corrupted
rm -rf alf_data/solr4/index/{workspace/*,archive/*}

# 5. Configure LibreOffice watcher
curl $SOFFICE_SCRIPT > /usr/bin/soffice.sh
chmod +x /usr/bin/soffice.sh
crontab -l > mycron
if ! grep -q soffice.log mycron; then
    echo "*/15 * * * * /usr/bin/soffice.sh start >> $ALFRESCO_ROOT/logs/soffice.log" >> mycron
    crontab mycron
fi
rm -f mycron

# 6. Configure logging
rm -f tomcat/shared/classes/alfresco/extension/dotto-log4j.properties
touch tomcat/shared/classes/alfresco/extension/dotto-log4j.properties
cat <<EOT >> tomcat/shared/classes/alfresco/extension/dotto-log4j.properties
log4j.rootLogger=error, File
log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
log4j.appender.File.File=$ALFRESCO_ROOT/logs/alfresco.log
log4j.appender.File.Append=true
log4j.appender.File.DatePattern='.'yyyy-MM-dd
log4j.appender.File.layout=org.apache.log4j.PatternLayout
log4j.appender.File.layout.ConversionPattern=%d{yyyy-MM-dd} %d{ABSOLUTE} %-5p [%c] [%t] %m%n
# MAO - Logging esteso per le trasformazioni documenti
log4j.logger.org.alfresco.repo.content.transform.TransformerDebug=DEBUG
log4j.logger.org.alfresco.enterprise.repo.content=DEBUG
EOT

if ! grep -q /opt/alfresco-community/logs/alfresco.log tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties; then
    sed -i 's/=alfresco.log/=\/opt\/alfresco-community\/logs\/alfresco.log/g' tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties
fi

if ! grep -q /opt/alfresco-community/logs/share.log tomcat/webapps/share/WEB-INF/classes/log4j.properties; then
    sed -i 's/=share.log/=\/opt\/alfresco-community\/logs\/share.log/g' tomcat/webapps/share/WEB-INF/classes/log4j.properties
fi

if ! grep -q /opt/alfresco-community/logs/solr.log solr4/log4j-solr.properties; then
    sed -i 's/=solr.log/=\/opt\/alfresco-community\/logs\/solr.log/g' solr4/log4j-solr.properties
fi

rm -rf /etc/logrotate.d/tomcat
touch /etc/logrotate.d/tomcat
cat <<EOT >> /etc/logrotate.d/tomcat
/opt/alfresco-community/tomcat/logs/catalina.out {
        copytruncate
        daily
        rotate 7
        compress
        missingok
        size 5M
        postrotate
            /opt/alfresco-community/alfresco.sh restart tomcat
        endscript
}
EOT
/usr/sbin/logrotate /etc/logrotate.conf

rm -rf /etc/logrotate.d/soffice
touch /etc/logrotate.d/soffice
cat <<EOT >> /etc/logrotate.d/soffice
/opt/alfresco-community/logs/soffice.log {
        copytruncate
        daily
        rotate 7
        compress
        missingok
        size 1M
}
EOT
