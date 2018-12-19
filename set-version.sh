NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
    echo "Missing <version>"
    echo "usage: ./set-version.sh <version>"
    exit -1
fi

mvn versions:set -DgenerateBackupPoms=false -DnewVersion=$NEW_VERSION