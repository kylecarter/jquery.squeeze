# jquery.squeeze - A jQuery plugin for creating dynamic page accordions

This plugin will take a jQuery object or collection and convert them into accordion elements. The script will add to the page dynamically triggers for expanding and closing the accordion. The plugin will also accept a jQuery object or collection to use as a trigger for the accordion.

#### Basic Usage:
`$('.myAccordion').Squeeze( options );`

#### Options - These can be passed to the plugin as a Javascript object.

`closedHeight`
default = 0
dataType = number
This is used to set how much accordion content will be showing in the accordion closed state. This is useful for creating "Read More" or "Show More" accordions used to expose additional content on the page with a default amount. This setting adds a height value to the accordion element adjust this value as needed depending on how much or little you want to expose.

`speed`
default = 600
dataType = string | number
How fast the accordion changes animate. Any valid jQuery animate function values are acceptable (i.e., 300, 600, 'fast', 'slow', etc).

`triggerCustom`
default = false
dataType = boolean
If you have an element on the page you want to use as the accordion trigger you can use this to pass it to the script either as a jQuery selector string (i.e., '.myTrigger') or as a jQuery object or collection (i.e. $('.myTrigger')). Custom triggers must have a data-target="#myAccordion" attribute add to them where 'myAccordion' is the idea of the accordion element the trigger controls. This said the accordion element must also have an id that corresponds to data-target of the custom trigger. NOTE: the value of data-target="#myAccordion" remember to include the '#'.

`triggerInsertLogic`
default = function
dataType = function
If triggerCustom = false (i.e., the default value of triggerCustom), the plugin will dynamically add an anchor element to the page to act as the trigger for an accordion element. The element can be added one of two ways using the default function logic provided in the script or by passing your own custom function to triggerInsertLogic. The function will be provided three variables trigger, context, settings. trigger is the current element being added to the page; context is the current accordion element; settings are the options being used by the script. This function is only called when triggerCustom = false.

`triggerClassName`
default = 'js-accordion-trigger'
dataType = string
This can be a space delimited string (i.e., 'btn btn-primary btn-lg') that will be assigned to triggers created by the script. This information is not used if triggerCustom = false.

`triggerAdjustText`
default = true
dataType = boolean
This can be a string representing an HTML element or plain text. If true, the plugin uses the values of triggerOpenText and triggerCloseText to change the trigger text based on the current state of the accordion. Set to false if you do not want the trigger text to change.

`triggerOpenText`
default = 'Show More'
dataType = string
Text used for plugin generated triggers and closed state of accordion trigger.

`triggerCloseText`
default = 'Show Less'
dataType = string
Text used for plugin generated triggers and open state of accordion trigger.

`triggerLocation`
default = 'after'
only values = 'after' | 'before'
dataType = string
This tells the plugin where to insert triggers it generates. Triggers can be added before or after their corresponding accordion elements.
