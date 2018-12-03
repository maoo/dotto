# Dotto Document Platform

## Dotto Invoicing

### List of pending invoices
To get a list of pending invoices, invoke:

`curl http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/pending`

Result:
```
{
    "pendingInvoices" : [
        "workspace://SpacesStore/be8177a0-50a4-4755-a2e9-f27a449129b67",
        "workspace://SpacesStore/9db76769-96de-4de4-bdb4-a127130af362"
    ]
}
```
Please note that the maximum amount of results is 1000; paging is not implemented yet.

### Get Invoice binary file
To get the binary file of an invoice, whose ID is `{invoiceId}`, invoke:

`curl -O http://admin:admin@localhost:8080/alfresco/service/api/node/content/workspace/SpacesStore/{invoiceId}`

### Mark invoice as processed
To mark an invoice, whose ID is `{invoiceId}`, as processed, invoke:

`curl -X PUT -H "Content-Type: application/json" http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/processed/{invoiceId}`

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

### Attach notification to an existing invoice
To mark an invoice as processed, given a `{invoiceId}`, invoke:
`curl -X POST -F file=@alfresco.log -F key1=value1 http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/notification/{invoiceId}`

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

### Store a passive invoice in Dotto
To store a passive invoice in Dotto, invoke:
`curl -X POST -F file=@alfresco.log -F key1=value1 http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/passive`

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

## Sample run

curl http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/pending

INVOICE_ID=`curl http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/pending | grep -v "]" | grep -v "{" | grep -v "pendingInvoices" | grep -m1 "" | | tr -d '"' | tr -d '[:space:]'`

curl -O http://admin:admin@localhost:8080/alfresco/service/api/node/content/workspace/SpacesStore/$INVOICE_ID

curl -X PUT -H "Content-Type: application/json" http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/processed/$INVOICE_ID

curl -X POST -F file=@alfresco.log -F key1=value1 http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/notification/$INVOICE_ID
curl -X POST -F file=@share.log -F key1=value1 http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/notification/$INVOICE_ID

curl -X POST -F file=@alfresco.log -F key1=value1 http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/passive

