if (typeof Dotto == "undefined" || !Dotto)
{
   var Dotto = {};
}

Dotto.RuleConfigActionCustom = function(htmlId)
{
    Dotto.RuleConfigActionCustom.superclass.constructor.call(this, htmlId);

   // Re-register with our own name
   this.name = "Dotto.RuleConfigActionCustom";
   Alfresco.util.ComponentManager.reregister(this);

   // Instance variables
   this.customisations = YAHOO.lang.merge(this.customisations, Dotto.RuleConfigActionCustom.superclass.customisations);
   this.renderers = YAHOO.lang.merge(this.renderers, Dotto.RuleConfigActionCustom.superclass.renderers);

   return this;
};

YAHOO.extend(Dotto.RuleConfigActionCustom, Alfresco.RuleConfigAction,
    {
       customisations:
       {         
          MoveReplaced:
          {
             text: function(configDef, ruleConfig, configEl)
             {
                  // Display as path
                  this._getParamDef(configDef, "destination-folder")._type = "path";
                  return configDef;
             },
             edit: function(configDef, ruleConfig, configEl)
             {
                 // Hide all parameters since we are using a custom ui but set default values
                 this._hideParameters(configDef.parameterDefinitions);
    
                 // Make parameter renderer create a "Destination" button that displays an destination folder browser
                 configDef.parameterDefinitions.splice(0,0,{
                    type: "arca:destination-dialog-button",
                    displayLabel: this.msg("label.to"),
                    _buttonLabel: this.msg("button.select-folder"),
                    _destinationParam: "destination-folder"
                 });
                 return configDef;
             }
          },
       },
    
    });