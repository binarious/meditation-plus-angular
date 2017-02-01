import { ChangeDetectorRef, PipeTransform, OnDestroy } from '@angular/core';
import * as moment from 'moment';
export declare class CalendarPipe implements PipeTransform, OnDestroy {
    private _cdRef;
    /**
     * @private Internal reference counter, so we can clean up when no instances are in use
     * @type {number}
     */
    private static _refs;
    private static _timer;
    private static _midnight;
    constructor(_cdRef: ChangeDetectorRef);
    transform(value: Date | moment.Moment, ...args: any[]): any;
    ngOnDestroy(): void;
    private static _initTimer();
    private static _removeTimer();
    private static _getMillisecondsUntilUpdate();
}
