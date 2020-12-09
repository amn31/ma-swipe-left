
import * as M from 'materialize-css';
import * as $ from 'jquery';
import * as JQuery from 'jquery';
/**
 * Options pouvant être utilisées pour initialiszer le composant
 *
 * @description Options pouvant être utilisées
 *
 * @param rightWidth   largeur en pixel de la div de droite pouvant être visualisée
 * @param onOpen  method appelée lors de l'ouverture de la div de droite
 * @param onClose  method appelée lors de la fermeture de la div de droite 
 * @param onChange  method appelée lors d'un changement l'ouverture/fermeture de la div de droite
 * @param classOnSwipe class CSS de la div de gauche lors qu'un click survient
 */
export interface SwipeLeftOption {
    
    rightWidth?: number;
    onOpen?:  (elem:any) => void;
    onClose?: (elem:any) => void;
    onChange?: (elem:any,state:boolean) => void;
    classOnSwipe?: string;
}

class MASwipeLeft {
    constructor() {
    }

    init(cfg?: SwipeLeftOption) {
        this.start();
        //JQuery('.collection-swipe').collection_swipe(cfg);
        ($(".collection-swipe") as any).collection_swipe(cfg);
        //console.log('$.fn.collection_swipe ', JQuery.fn.collection_swipe)
    }

    private start() {
        (($.fn) as any).collection_swipe = function (options) {
            var _SwipeLeft = function (cfg: any) {
                var div = cfg.element;
                var settings = cfg.settings;

                var parms = {
                    position_started: 0,
                    maxWithExtract: 200,
                    paddingLeft: 0,
                    width: undefined,
                    bordersRight: 0
                };
                var divLeft;
                var divRight;
                var divIcon;
                var currentSeek = 0;
                var enter = false;
                var isOpened = false;
                var toOpen = false;
                var isPhone = (document.documentElement && document.documentElement.ontouchstart != undefined);

                this.start = function () {


                    divLeft = $(div).find('.collection-swipe-left');
                    divRight = $(div).find('.collection-swipe-right');
                    divIcon = $(div).find('.collection-swipe-icon');
                    var divsClose = $(div).find('.collection-swipe-close');
                    if (!isPhone) {
                        divLeft.on("mousemove", run_moving);
                        divLeft.on("mousedown", start_moving);
                        divLeft.on("mouseup", stop_moving);

                    } else {
                        divLeft.on("touchmove", run_moving);
                        divLeft.on("touchstart", start_moving)
                        divLeft.on("touchend", stop_moving);

                    }

                    if (divsClose)
                        divsClose.each(function (i, elem) {
                            $(elem).on('mousedown', function () {
                                // console.log('divsClose mousedown')
                                setTimeout(closeSlow, 10);
                                return false;
                            });

                        });
                    divIcon.on('mousedown', function () {
                        // console.log('divIcon mousedown '+isOpened)
                        if (isOpened == false) {
                            toOpen = true;
                        }
                        return true;
                    });
                    divIcon.html('chevron_left');
                    divRight.hide();

                }

                function closeSlow() {
                    // console.log('closeSlow')
                    divLeft.css('transition-property', 'margin-left');
                    divLeft.css('transition-duration', '0.2s');
                    divLeft.css('transition-timing-function', 'ease-in');
                    divLeft.css('marginLeft', '0px');

                    close();
                }

                function close() {
                    // console.log('close')
                    divRight.width(0);
                    divLeft.css('transition-timing-function', 'ease-in');
                    divLeft.css('marginLeft', '0px');
                    divLeft.removeClass(settings.classOnSwipe)

                    parms.position_started = 0;
                    currentSeek = 0;
                    divRight.hide();
                    divIcon.html('chevron_left');

                    return true;

                }

                function stop_moving(e) {
                    // console.log('stop_moving')
                    enter = false;
                    var opened;
                    // On ferme si le déplacement s'arrête à 3/4 sinon on ouvre
                    if (Math.abs(currentSeek) < parms.maxWithExtract * 3 / 4 && !toOpen || isOpened) {
                        closeSlow();
                        opened = false;

                    } else {
                        parms.position_started = parms.maxWithExtract * -1;
                        divIcon.html('chevron_right');
                        opened = true;
                        update_css(parms.position_started, opened);
                    }
                    toOpen = false;
                    if (isOpened != opened) {
                        if (opened == false) {
                            settings.onClose(this, div);
                        } else {
                            settings.onOpen(this, div);
                        }
                        isOpened = opened;
                        settings.onChange.call(this, div, opened);

                    }
                }

                // divLeft.on("click", stop_moving)
                function start_moving(e) {
                    // console.log('start_moving')
                    parms.paddingLeft = 0;
                    parms.position_started = 0;
                    parms.maxWithExtract = settings.rightWidth;

                    divLeft.css('transition-property', '');
                    divLeft.css('transition-duration', '');
                    divLeft.css('transition-timing-function', 'ease-out');
                    divRight.css('transition-property', '');
                    divRight.css('transition-duration', '');
                    divRight.css('transition-timing-function', 'ease-in');

                    if (!parms.width) {

                        parms.width = divLeft.width();
                        if (divLeft.css('paddingLeft')) {
                            parms.paddingLeft = parseInt(divLeft.css('paddingLeft'))
                        }
                        parms.bordersRight = settings.bordersRight;
                        parms.position_started = 0;
                        // divLeft.after( "<span><b>Hello</b></span>" );
                    }
                    if (parms.width) {
                        divLeft.addClass(settings.classOnSwipe);
                        enter = true;
                    }

                }

                function update_css(seek, quickOpening?) {

                    if (Math.abs(seek) <= parms.maxWithExtract && seek < 0) {
                        currentSeek = seek;
                        divLeft.css('marginLeft', seek);

                        var w = seek * -1 + parms.paddingLeft * 2 - parms.bordersRight;
                        if (w > 5) {
                            divRight.show();
                            if (quickOpening) {
                                divRight.css('transition-property', 'width');
                                divRight.css('transition-duration', '0.2s');
                                divRight.css('transition-timing-function', 'ease-in');
                            }
                            divRight.width(w);
                        } else {
                            divRight.width(0);
                            divRight.hide();
                        }
                    } else {
                        divRight.hide();

                    }

                }

                function run_moving(e) {
                    if (enter != true) {
                        return;
                    }

                    var xposition;
                    if (!isPhone) {
                        xposition = e.clientX;
                    } else {
                        if (e.touches && e.touches.length > 0)
                            xposition = e.touches[0].clientX;
                    }
                    if (xposition > 0 && !parms.position_started) {
                        parms.position_started = xposition;
                    }
                    if (parms.position_started) {
                        currentSeek = (xposition - parms.position_started);
                        update_css(currentSeek);
                    }
                }
            }



            // Bob's default settings:
            var defaults = {
                isOpened: false,
                bordersRight: 0,
                //rightPercentSize: 50,
                rightWidth: 180,
                classOnSwipe: 'collection-swipe-onclick',
                onOpen: function (el) { }, // A function to be called when sideNav is opened
                onClose: function (el) { }, // A function to be called when sideNav is closed
                onChange: function () { }
            };

            var settings = $.extend({}, defaults, options);

            return this.each(function (index, element) {
                // Plugin code would go here...
                if (element.className.match(/collection-swipe/)) {

                    element.collection = new _SwipeLeft({
                        element: element,
                        settings: settings
                    }).start();
                }
            });

        };

    };

    // start() {


    //     console.log('STARTED');
    //     if (M) {
    //         console.log("M IS STARTED")
    //     }
    //     if ($) {
    //         console.log("$ IS STARTED")
    //     }
    // }
}

export const MA = {
    SwipeLeft: new MASwipeLeft()
}