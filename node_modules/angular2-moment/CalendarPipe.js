/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
// under systemjs, moment is actually exported as the default export, so we account for that
var momentConstructor = moment.default || moment;
var CalendarPipe = (function () {
    function CalendarPipe(_cdRef) {
        var _this = this;
        this._cdRef = _cdRef;
        // using a single static timer for all instances of this pipe for performance reasons
        CalendarPipe._initTimer();
        CalendarPipe._refs++;
        // values such as Today will need to be replaced with Yesterday after midnight,
        // so make sure we subscribe to an EventEmitter that we set up to emit at midnight
        CalendarPipe._midnight.subscribe(function () { return _this._cdRef.markForCheck(); });
    }
    CalendarPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return momentConstructor(value).calendar();
    };
    CalendarPipe.prototype.ngOnDestroy = function () {
        if (CalendarPipe._refs > 0) {
            CalendarPipe._refs--;
        }
        if (CalendarPipe._refs === 0) {
            CalendarPipe._removeTimer();
        }
    };
    CalendarPipe._initTimer = function () {
        // initialize the timer
        if (!CalendarPipe._midnight) {
            CalendarPipe._midnight = new core_1.EventEmitter();
            var timeToUpdate = CalendarPipe._getMillisecondsUntilUpdate();
            CalendarPipe._timer = window.setTimeout(function () {
                // emit the current date
                CalendarPipe._midnight.emit(new Date());
                // refresh the timer
                CalendarPipe._removeTimer();
                CalendarPipe._initTimer();
            }, timeToUpdate);
        }
    };
    CalendarPipe._removeTimer = function () {
        if (CalendarPipe._timer) {
            window.clearTimeout(CalendarPipe._timer);
            CalendarPipe._timer = null;
            CalendarPipe._midnight = null;
        }
    };
    CalendarPipe._getMillisecondsUntilUpdate = function () {
        var now = momentConstructor();
        var tomorrow = momentConstructor().startOf('day').add(1, 'days');
        var timeToMidnight = tomorrow.valueOf() - now.valueOf();
        return timeToMidnight + 1000; // 1 second after midnight
    };
    /**
     * @private Internal reference counter, so we can clean up when no instances are in use
     * @type {number}
     */
    CalendarPipe._refs = 0;
    CalendarPipe = __decorate([
        core_1.Pipe({ name: 'amCalendar', pure: false }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], CalendarPipe);
    return CalendarPipe;
}());
exports.CalendarPipe = CalendarPipe;
//# sourceMappingURL=CalendarPipe.js.map