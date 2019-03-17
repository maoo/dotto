# Dotto Document Platform

## Dotto Invoicing

### List of pending invoices
To get a list of pending invoices, given a `$COMPANY_NAME`, invoke:

`curl http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/pending/$COMPANY_NAME`

Result:
```
{
    "pendingInvoices" : [
        "be8177a0-50a4-4755-a2e9-f27a449129b67",
        "9db76769-96de-4de4-bdb4-a127130af362"
    ]
}
```
Please note that the maximum amount of results is 1000; paging is not implemented yet.

### Get Invoice binary file
To get the binary file of an invoice, whose ID is `$INVOICE_ID`, invoke:

`curl -O http://admin:admin@localhost:8080/alfresco/service/api/node/content/workspace/SpacesStore/$INVOICE_ID`

### Mark invoice as processed
To mark an invoice, whose ID is `$INVOICE_ID` and name is `$FILE_NAME`, as processed, invoke:

`curl -X PUT -H "Content-Type: application/json" http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/processed/$INVOICE_ID/$FILE_NAME`

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

### Update invoice state
Similar to processed, to mark an invoice with any of the available states, invoke:

```
export STATE=errore_conversione
curl -X POST -H "Content-Type: application/json" http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/update/$INVOICE_ID/$STATE
```

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

TODO - gestire workflow fatture scartate
### Attach notification to an existing invoice
To mark an invoice as processed, given a `$FILE_NAME`, invoke:
`curl -X POST -F file=@alfresco.log http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/notification/$STATUS/$COMPANY_NAME/$FILE_NAME`

TODO - status is not set
TODO - add links to notifications

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```

### Store a passive invoice in Dotto
To store a passive invoice in Dotto, invoke:
```
export INVOICE_NAME=test
export COMPANY_NAME=RagSoc1
curl -X POST -F file=@alfresco.log http://admin:admin@localhost:8080/alfresco/service/dotto/invoices/passive/$COMPANY_NAME/$INVOICE_NAME
```

If all goes fine, you'll get the following result:
```
{ "result": "200" }
```