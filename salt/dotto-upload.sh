#!/bin/bash

HOPOFF_HOST=147.135.251.196
HOPOFF_USER=root

DOTTO_VERSION=$(mvn -q -Dexec.executable=echo -Dexec.args='${project.version}' --non-recursive exec:exec)

DISTRO_PATH=target/dotto-distro-$DOTTO_VERSION

mvn install
mvn clean alfresco:run -Dmaven.alfresco.startTomcat=false
mkdir -p $DISTRO_PATH
mv target/*.war $DISTRO_PATH
mv $DISTRO_PATH/platform.war $DISTRO_PATH/alfresco.war

# Copy salt modules and host data
mkdir $DISTRO_PATH/salt
cp -rf salt/remote/* $DISTRO_PATH/salt/

scp -r $DISTRO_PATH $HOPOFF_USER@$HOPOFF_HOST:~

ssh -t $HOPOFF_USER@$HOPOFF_HOST "cp -Rf ~/dotto-distro-$DOTTO_VERSION/salt/* /srv/salt"
