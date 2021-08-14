

define([
    'jquery',
    'owlcarousel'
], function ($, $t) {
    'use strict';

    $.widget('trang.owlWidget', {
        owlObj: undefined,
        options: {
            nav: true,
            dots: true,
            margin: 20,
            stagePadding: 0,
            autoWidth : false,
            minScreenDestroy: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                }
            }
        },

        /** @inheritdoc */
        _create: function () {
            var self = this;
            this.owlObj = this.element.owlCarousel({
                nav: this.options.nav,
                dots: this.options.dots,
                margin: this.options.margin,
                stagePadding: this.options.stagePadding,
                autoWidth : this.options.autoWidth,
                minScreenDestroy : this.options.minScreenDestroy,
                responsive: this.options.responsive
            });
            if(!this.options.minScreenDestroy) {
                self.initSlider();
            } else {
                self.initResponsive(this.options.minScreenDestroy);
                self.updateResize(this.options.minScreenDestroy);
            }
        },

        updateResize: function (minScreenWidth) {
            var self = this;
            $(window).resize(function() {
                self.initResponsive(minScreenWidth);
            });
        },

        initResponsive: function (minScreenWidth) {
            var self = this;
            var windowWidth = $(window).width();
            if(windowWidth > minScreenWidth) {
                if (this.owlObj) {
                    this.owlObj.trigger('destroy.owl.carousel');
                    this.owlObj.removeClass('owl-carousel');
                }
            } else {
                if (this.owlObj && !this.element.hasClass('owl-loaded')) {
                    if (!this.element.hasClass('owl-carousel')) {
                        this.owlObj.addClass('owl-carousel');
                    }
                    self.initSlider();
                } else if (!this.owlObj) {
                    self.initSlider();
                }
            }
        },

        initSlider: function () {
            this.owlObj = this.element.owlCarousel({
                nav: this.options.nav,
                dots: this.options.dots,
                margin: this.options.margin,
                stagePadding: this.options.stagePadding,
                autoWidth : this.options.autoWidth,
                responsive: this.options.responsive
            });
        }

    });

    return $.trang.owlWidget;
});

