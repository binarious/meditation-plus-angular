(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.md = global.md || {}, global.md.progressBar = global.md.progressBar || {}),global.ng.core,global.ng.common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// TODO(josephperrott): Benchpress tests.
// TODO(josephperrott): Add ARIA attributes for progressbar "for".
/**
 * <md-progress-bar> component.
 */
var MdProgressBar = (function () {
    function MdProgressBar() {
        /** Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow. */
        this._value = 0;
        /** Buffer value of the progress bar. Defaults to zero. */
        this._bufferValue = 0;
        /**
         * Mode of the progress bar.
         *
         * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
         * 'determinate'.
         * Mirrored to mode attribute.
         */
        this.mode = 'determinate';
    }
    Object.defineProperty(MdProgressBar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = clamp(v || 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdProgressBar.prototype, "bufferValue", {
        get: function () {
            return this._bufferValue;
        },
        set: function (v) {
            this._bufferValue = clamp(v || 0);
        },
        enumerable: true,
        configurable: true
    });
    /** Gets the current transform value for the progress bar's primary indicator. */
    MdProgressBar.prototype._primaryTransform = function () {
        var scale = this.value / 100;
        return { transform: "scaleX(" + scale + ")" };
    };
    /**
     * Gets the current transform value for the progress bar's buffer indicator.  Only used if the
     * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
     */
    MdProgressBar.prototype._bufferTransform = function () {
        if (this.mode == 'buffer') {
            var scale = this.bufferValue / 100;
            return { transform: "scaleX(" + scale + ")" };
        }
    };
    __decorate([
        _angular_core.Input(),
        _angular_core.HostBinding('attr.aria-valuenow'), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "value", null);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "bufferValue", null);
    __decorate([
        _angular_core.Input(),
        _angular_core.HostBinding('attr.mode'), 
        __metadata('design:type', Object)
    ], MdProgressBar.prototype, "mode", void 0);
    MdProgressBar = __decorate([
        _angular_core.Component({selector: 'md-progress-bar',
            host: {
                'role': 'progressbar',
                'aria-valuemin': '0',
                'aria-valuemax': '100',
            },
            template: "<!-- The background div is named as such because it appears below the other divs and is not sized based on values. --> <div class=\"md-progress-bar-background\"></div> <div class=\"md-progress-bar-buffer\" [ngStyle]=\"_bufferTransform()\"></div> <div class=\"md-progress-bar-primary md-progress-bar-fill\" [ngStyle]=\"_primaryTransform()\"></div> <div class=\"md-progress-bar-secondary md-progress-bar-fill\"></div> ",
            styles: ["/** In buffer mode a repeated SVG object is used as a background.  Each of the following defines the SVG object for each of the class defined colors. Each string is a URL encoded version of: <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" enable-background=\"new 0 0 5 2\" xml:space=\"preserve\" viewBox=\"0 0 5 2\" preserveAspectRatio=\"none slice\"> <circle cx=\"1\" cy=\"1\" r=\"1\" fill=\"{INJECTED_COLOR}\"/> </svg> */ :host { display: block; height: 5px; overflow: hidden; position: relative; transform: translateZ(0); transition: opacity 250ms linear; width: 100%; /** * The progress bar buffer is the bar indicator showing the buffer value and is only visible beyond the current value * of the primary progress bar. */ /** * The secondary progress bar is only used in the indeterminate animation, because of this it is hidden in other uses. */ /** * The progress bar fill fills the progress bar with the indicator color. */ /** * A pseudo element is created for each progress bar bar that fills with the indicator color. */ } :host .md-progress-bar-background { background: url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27#b2dfdb%27%2F%3E%3C%2Fsvg%3E\"); background-repeat: repeat-x; background-size: 10px 4px; height: 100%; position: absolute; visibility: hidden; width: 100%; } :host .md-progress-bar-buffer { background-color: #b2dfdb; height: 100%; position: absolute; transform-origin: top left; transition: transform 250ms ease; width: 100%; } :host .md-progress-bar-secondary { visibility: hidden; } :host .md-progress-bar-fill { animation: none; height: 100%; position: absolute; transform-origin: top left; transition: transform 250ms ease; width: 100%; } :host .md-progress-bar-fill::after { animation: none; background-color: #00897b; content: ''; display: inline-block; height: 100%; position: absolute; width: 100%; } :host[color='accent'] .md-progress-bar-background { background: url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27#e1bee7%27%2F%3E%3C%2Fsvg%3E\"); background-repeat: repeat-x; background-size: 10px 4px; } :host[color='accent'] .md-progress-bar-buffer { background-color: #e1bee7; } :host[color='accent'] .md-progress-bar-fill::after { background-color: #8e24aa; } :host[color='warn'] .md-progress-bar-background { background: url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%271.1%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20xmlns%3Axlink%3D%27http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%27%20x%3D%270px%27%20y%3D%270px%27%20enable-background%3D%27new%200%200%205%202%27%20xml%3Aspace%3D%27preserve%27%20viewBox%3D%270%200%205%202%27%20preserveAspectRatio%3D%27none%20slice%27%3E%3Ccircle%20cx%3D%271%27%20cy%3D%271%27%20r%3D%271%27%20fill%3D%27#ffcdd2%27%2F%3E%3C%2Fsvg%3E\"); background-repeat: repeat-x; background-size: 10px 4px; } :host[color='warn'] .md-progress-bar-buffer { background-color: #ffcdd2; } :host[color='warn'] .md-progress-bar-fill::after { background-color: #e53935; } :host[mode='query'] { transform: rotateZ(180deg); } :host[mode='indeterminate'] .md-progress-bar-fill, :host[mode='query'] .md-progress-bar-fill { transition: none; } :host[mode='indeterminate'] .md-progress-bar-primary, :host[mode='query'] .md-progress-bar-primary { animation: md-progress-bar-primary-indeterminate-translate 2000ms infinite linear; left: -145.166611%; } :host[mode='indeterminate'] .md-progress-bar-primary.md-progress-bar-fill::after, :host[mode='query'] .md-progress-bar-primary.md-progress-bar-fill::after { animation: md-progress-bar-primary-indeterminate-scale 2000ms infinite linear; } :host[mode='indeterminate'] .md-progress-bar-secondary, :host[mode='query'] .md-progress-bar-secondary { animation: md-progress-bar-secondary-indeterminate-translate 2000ms infinite linear; left: -54.888891%; visibility: visible; } :host[mode='indeterminate'] .md-progress-bar-secondary.md-progress-bar-fill::after, :host[mode='query'] .md-progress-bar-secondary.md-progress-bar-fill::after { animation: md-progress-bar-secondary-indeterminate-scale 2000ms infinite linear; } :host[mode='buffer'] .md-progress-bar-background { animation: md-progress-bar-background-scroll 250ms infinite linear; visibility: visible; } :host-context([dir='rtl']) { transform: rotateY(180deg); } /** The values used for animations in md-progress-bar, both timing and transformation, can be considered magic values. They are sourced from the Material Design example spec and duplicate the values of the original designers definitions. The indeterminate state is essentially made up of two progress bars, one primary (the one that is shown in both the determinate and indeterminate states) and one secondary, which essentially mirrors the primary progress bar in appearance but is only shown to assist with the indeterminate animations. KEYFRAME BLOCK	                    DESCRIPTION primary-indeterminate-translate     Translation of the primary progressbar across the screen primary-indeterminate-scale         Scaling of the primary progressbar as it's being translated across the screen secondary-indeterminate-translate   Translation of the secondary progressbar across the screen secondary-indeterminate-scale       Scaling of the secondary progressbar as it's being translated across the screen Because two different transform animations need to be applied at once, the translation is applied to the outer element and the scaling is applied to the inner element, which provides the illusion necessary to make the animation work. */ /** Animations for indeterminate and query mode. */ @keyframes md-progress-bar-primary-indeterminate-translate { 0% { transform: translateX(0); } 20% { animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582); transform: translateX(0); } 59.15% { animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635); transform: translateX(83.67142%); } 100% { transform: translateX(200.61106%); } } @keyframes md-progress-bar-primary-indeterminate-scale { 0% { transform: scaleX(0.08); } 36.65% { animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1); transform: scaleX(0.08); } 69.15% { animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1); transform: scaleX(0.66148); } 100% { transform: scaleX(0.08); } } @keyframes md-progress-bar-secondary-indeterminate-translate { 0% { animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969); transform: translateX(0); } 25% { animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371); transform: translateX(37.65191%); } 48.35% { animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203); transform: translateX(84.38617%); } 100% { transform: translateX(160.27778%); } } @keyframes md-progress-bar-secondary-indeterminate-scale { 0% { animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969); transform: scaleX(0.08); } 19.15% { animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371); transform: scaleX(0.4571); } 44.15% { animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203); transform: scaleX(0.72796); } 100% { transform: scaleX(0.08); } } /** Animation for buffer mode. */ @keyframes md-progress-bar-background-scroll { to { transform: translateX(-10px); } } /*# sourceMappingURL=progress-bar.css.map */ "],
            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressBar);
    return MdProgressBar;
}());
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.max(min, Math.min(max, v));
}
var MdProgressBarModule = (function () {
    function MdProgressBarModule() {
    }
    MdProgressBarModule.forRoot = function () {
        return {
            ngModule: MdProgressBarModule,
            providers: []
        };
    };
    MdProgressBarModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [MdProgressBar],
            declarations: [MdProgressBar],
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressBarModule);
    return MdProgressBarModule;
}());

exports.MdProgressBar = MdProgressBar;
exports.MdProgressBarModule = MdProgressBarModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));