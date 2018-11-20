# Dotto Deployment

First, make sure your SSH keys are authorized on hopoff.dottodoc.it and you can `ssh root@hopoff.dottodoc.it` without the need of a password.

# Test script execution

salt-ssh '*' state.apply dotto.sls