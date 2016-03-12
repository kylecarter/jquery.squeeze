(function($) {

    $.fn.Squeeze = function( options ) {

        var State = (function() {

            var change = function( settings, accordion ) {

                animate( settings, accordion );
                accordion.trigger.el.toggleClass('accordion-open');
                if (settings.triggerAdjustText) { update( settings, accordion.trigger.el ); }

            } //change

            var update = function( settings, el ) {
                if (el.hasClass('accordion-open')) {
                    el.html(settings.triggerCloseText);
                } else {
                    el.html(settings.triggerOpenText);
                }
            }

            var animate = function( settings, accordion ) {

                var expand = accordion.el,
                    realHeight = accordion.realHeight;
                if (expand.hasClass('collapsed')) {
                    expand.removeClass('collapsed').addClass('expanding').animate({
                        height: realHeight
                    }, settings.speed, function() {
                            expand.removeClass('expanding').addClass('expanded').removeAttr('style').attr({
                                'aria-expanded': true
                            });
                        });
                } else {
                    expand.removeClass('expanded').addClass('collapsing').css({
                        overflow: 'hidden',
                    }).animate({
                        height: settings.closedHeight
                    }, settings.speed, function() {
                            expand.removeClass('collapsing').addClass('collapsed').css({
                                height: settings.closedHeight,
                            }).attr({
                                'aria-expanded': false
                            });
                        });
                }
            } // animate

            return {
                change: change
            }
        })(); // State

        var Accordion = function ( jObject ) {

            this.el = $(jObject);
            this.realHeight = this.el.outerHeight();
            this.prototype = {
                constructor: Accordion,
                render: function ( settings, i ) {

                    var accordion = this;
                    if (isNaN(settings.closedHeight)) { throw new Error('options.closedHeight must be a number.') }
                    accordion.el.attr({
                        'aria-expanded': false
                    }).css({
                        height: !isNaN(settings.closedHeight) ? settings.closedHeight : 0,
                        overflow: 'hidden'
                    }).addClass('collapsed');

                    accordion.trigger = new Trigger( settings.triggerInsertLogic );
                    accordion.trigger.render( settings, accordion.el, i );
                    accordion.trigger.el.on('click touch', function() {
                        State.change( settings, accordion );
                    });

                } //render
            }; //prototype

            return {
                el: this.el,
                realHeight: this.realHeight,
                trigger: this.trigger,
                render: this.prototype.render,
                constructor: this.prototype.constructor,
            };
        }

        var Trigger = function( insertLogic ) {

            this.el = '';
            this.prototype = {
                constructor: Trigger,

                render: function( settings, context, i ) {

                    var trigger;
                    if (settings.triggerCustom) {
                        var elm = settings.triggerCustom instanceof jQuery ? settings.triggerCustom.selector : settings.triggerCustom;
                        if (!$(elm + '[data-target="#' + context.attr('id') + '"]')) {
                            throw new Error('triggerCutom elements must have the data-target attribute referencing the element to expand.');
                            return;
                        }
                        trigger = $(elm + '[data-target="#' + context.attr('id') + '"]');
                        trigger.attr({
                            'role': 'button',
                            'aria-controls': trigger.attr('data-target').replace('#', '')
                        })
                    } else {
                        if (!context.attr('id')) { context.attr('id', 'squeeze' + i); }
                        trigger = this.create( settings, context );
                        if (typeof this.insert !== 'function') {
                            throw new Error('options.triggerInsertLogic must be a function.');
                            return;
                        }
                        this.insert( trigger, context, settings );
                    }
                    this.el = trigger;

                }, //render

                create: function( settings, context ) {

                    return $('<a/>', {
                        'href': 'javascript:void(0)',
                        'class': settings.triggerClassName,
                        'data-target': '#' + context.attr('id'),
                        'aria-controls': context.attr('id'),
                        'role': 'button'
                    }).html(settings.triggerOpenText);

                }, //create

            } //prototype
            this.prototype.insert = insertLogic;

            return {
                el: this.el,
                constructor: this.prototype.constructor,
                render: this.prototype.render,
                insert: this.prototype.insert,
                create: this.prototype.create
            };
        }

        var settings = $.extend({
            closedHeight: 0,
            speed: 600,
            triggerCustom: false,
            triggerInsertLogic: function( trigger, context, settings ) {
                if (!(/^(?:after|before)$/).test(settings.triggerLocation)) {
                    throw new Error('options.triggerLocaiton must be a value of "before" or "after".');
                    return;
                }
                var placement = settings.triggerLocation !== 'after' ? 'insertBefore' : 'insertAfter';
                trigger[placement](context);
            },
            triggerClassName: 'js-accordion-trigger',
            triggerAdjustText: true,
            triggerOpenText: 'Show More',
            triggerCloseText: 'Show Less',
            triggerLocation: 'after'
        }, options);

        if (this.length < 1) { return this; }
        $(this).each(function(i) {
            var accordion = new Accordion( this );
            accordion.render( settings, i );
        });

        return this;

    }

})(jQuery);
