#!/bin/bash

export DISTRO_PATH=./target/dotto-distro-$(mvn -q -Dexec.executable=echo -Dexec.args='${project.version}' --non-recursive exec:exec)

# Building the Alfresco Repo and Share WAR files
mvn clean install
mvn alfresco:run -Dmaven.alfresco.startTomcat=false

# Building the Dotto Invoice AMP files
cd dotto-invoice/dotto-invoice-repo ; mvn package assembly:single ; cd -
cd dotto-invoice/dotto-invoice-share ; mvn package assembly:single ; cd -
cd dotto-share ; mvn package assembly:single ; cd -

# Moving files to the DISTRO_PATH, ready for GitHub release
mkdir -p $DISTRO_PATH && mv target/*.war $DISTRO_PATH
mv $DISTRO_PATH/platform.war $DISTRO_PATH/alfresco.war
mv dotto-share/target/dotto-share*.amp $DISTRO_PATH
mv dotto-invoice/dotto-invoice-repo/target/dotto-invoice-repo*.amp $DISTRO_PATH
mv dotto-invoice/dotto-invoice-share/target/dotto-invoice-share*.amp $DISTRO_PATH

echo "distro completed, listing files below."
ls -l $DISTRO_PATH