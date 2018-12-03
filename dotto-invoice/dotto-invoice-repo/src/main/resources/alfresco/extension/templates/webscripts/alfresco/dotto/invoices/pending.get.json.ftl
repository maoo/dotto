{
    "pendingInvoices" : [
        <#list results as result>
            "${result.nodeRef.id}"
            <#if result_has_next>, </#if>
        </#list>
    ]
}