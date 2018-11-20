add script:
    file.managed:
    - name: /srv/salt/dotto-deploy.sh
    - source: /srv/salt/dotto-deploy.sh

run script:
    cmd.run:
    - name: /srv/salt/dotto-deploy.sh