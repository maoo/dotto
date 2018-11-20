# Installing the Salt Master
```
yum install salt-ssh
```

## Add SSH authorized key (from deployer to Salt Master)
```
cat ~/.ssh/id_rsa.pub > pubkey
cat pubkey >> ~/.ssh/authorized_keys
```

## Init Salt keys
This is needed only once to init the .pub key on salt master node
```
salt-ssh '*' test.ping
```

## Configure file roots
Edit `/etc/salt/master`
```
file_roots:
  base:
    - /srv/salt
```

## Add host to Salt
This is for each client; will ask for password on prompt
```
ssh-copy-id -i /etc/salt/pki/master/ssh/salt-ssh.rsa.pub root@staging.dottodoc.it
```

In `/etc/salt/roster`, add:
```
staging:
  host: 147.135.251.196
  user: root
  passwd: xxx
```

Then copy /srv/salt contents with modules.

## Test
salt-ssh '*' test.ping