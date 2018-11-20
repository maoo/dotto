#!/bin/bash

if [ -z "$1" ]; then
	echo "Error: no version parameter was passed"
	echo "usage: ./dotto-deploy.sh <version>"
	exit -1
fi

DISTRO_PATH=~/dotto-distro-$1
HOSTNAME=$(hostname)
ALFRESCO_ROOT=/opt/alfresco-community

cp -Rf DISTRO_PATH/*.war $ALFRESCO_ROOT/tomcat/webapps
rm -rf $ALFRESCO_ROOT/tomcat/webapps/{alfresco,share}

cp -Rf /srv/salt/envs/$HOSTNAME/alfresco-global.properties $ALFRESCO_ROOT/tomcat/shared/classes
