import { ChangeDetectorRef, PipeTransform, OnDestroy } from '@angular/core';
import * as moment from 'moment';
export declare class TimeAgoPipe implements PipeTransform, OnDestroy {
    private _cdRef;
    private _currentTimer;
    constructor(_cdRef: ChangeDetectorRef);
    transform(value: Date | moment.Moment, omitSuffix?: boolean): string;
    ngOnDestroy(): void;
    _removeTimer(): void;
    _getSecondsUntilUpdate(momentInstance: moment.Moment): number;
}
