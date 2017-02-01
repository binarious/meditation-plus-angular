var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, Input, HostBinding, ChangeDetectionStrategy, ElementRef, Renderer, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanFieldValue } from '@angular2-material/core';
import { MdRippleModule } from '@angular2-material/core';
// TODO(jelbourn): Make the `isMouseDown` stuff done with one global listener.
// TODO(kara): Convert attribute selectors to classes when attr maps become available
export var MdButton = (function () {
    function MdButton(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
        this._isKeyboardFocused = false;
        /** Whether a mousedown has occurred on this element in the last 100ms. */
        this._isMouseDown = false;
        /** Whether the ripple effect on click should be disabled. */
        this.disableRipple = false;
    }
    Object.defineProperty(MdButton.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    MdButton.prototype._setMousedown = function () {
        var _this = this;
        // We only *show* the focus style when focus has come to the button via the keyboard.
        // The Material Design spec is silent on this topic, and without doing this, the
        // button continues to look :active after clicking.
        // @see http://marcysutton.com/button-focus-hell/
        this._isMouseDown = true;
        setTimeout(function () { _this._isMouseDown = false; }, 100);
    };
    MdButton.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    MdButton.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "md-" + color, isAdd);
        }
    };
    MdButton.prototype._setKeyboardFocus = function () {
        this._isKeyboardFocused = !this._isMouseDown;
    };
    MdButton.prototype._removeKeyboardFocus = function () {
        this._isKeyboardFocused = false;
    };
    /** TODO(hansl): e2e test this function. */
    MdButton.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    MdButton.prototype.getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    MdButton.prototype.isRoundButton = function () {
        var el = this._elementRef.nativeElement;
        return el.hasAttribute('md-icon-button') ||
            el.hasAttribute('md-fab') ||
            el.hasAttribute('md-mini-fab');
    };
    MdButton.prototype.isRippleEnabled = function () {
        return !this.disableRipple;
    };
    __decorate([
        Input(),
        BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], MdButton.prototype, "disableRipple", void 0);
    MdButton = __decorate([
        Component({selector: 'button[md-button], button[md-raised-button], button[md-icon-button], ' +
                'button[md-fab], button[md-mini-fab]',
            inputs: ['color'],
            host: {
                '[class.md-button-focus]': '_isKeyboardFocused',
                '(mousedown)': '_setMousedown()',
                '(focus)': '_setKeyboardFocus()',
                '(blur)': '_removeKeyboardFocus()',
            },
            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> ",
            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /** * This mixin overrides default button styles like the gray background, * the border, and the outline. */ /** Applies a property to an md-button element for each of the supported palettes. */ /** Applies a focus style to an md-button element for each of the supported palettes. */ [md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; background: transparent; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab], .md-primary[md-button], .md-primary[md-icon-button] { color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab], .md-accent[md-button], .md-accent[md-icon-button] { color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab], .md-warn[md-button], .md-warn[md-icon-button] { color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-primary[disabled][md-button], .md-primary[disabled][md-icon-button], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-accent[disabled][md-button], .md-accent[disabled][md-icon-button], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], .md-warn[disabled][md-button], .md-warn[disabled][md-icon-button], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab], [disabled][disabled][md-button], [disabled][disabled][md-icon-button] { color: rgba(0, 0, 0, 0.38); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } .md-button-focus.md-primary[md-raised-button]::after, .md-button-focus.md-primary[md-fab]::after, .md-button-focus.md-primary[md-mini-fab]::after, .md-button-focus.md-primary[md-button]::after, .md-button-focus.md-primary[md-icon-button]::after { background-color: rgba(0, 150, 136, 0.12); } .md-button-focus.md-accent[md-raised-button]::after, .md-button-focus.md-accent[md-fab]::after, .md-button-focus.md-accent[md-mini-fab]::after, .md-button-focus.md-accent[md-button]::after, .md-button-focus.md-accent[md-icon-button]::after { background-color: rgba(156, 39, 176, 0.12); } .md-button-focus.md-warn[md-raised-button]::after, .md-button-focus.md-warn[md-fab]::after, .md-button-focus.md-warn[md-mini-fab]::after, .md-button-focus.md-warn[md-button]::after, .md-button-focus.md-warn[md-icon-button]::after { background-color: rgba(244, 67, 54, 0.12); } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); background-color: #fafafa; transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { color: white; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { color: rgba(255, 255, 255, 0.870588); } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { color: white; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { color: rgba(0, 0, 0, 0.38); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { background-color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { background-color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { background-color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { background-color: rgba(0, 0, 0, 0.12); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button]:hover.md-primary::after, [md-icon-button]:hover.md-primary::after { background-color: rgba(0, 150, 136, 0.12); } [md-button]:hover.md-accent::after, [md-icon-button]:hover.md-accent::after { background-color: rgba(156, 39, 176, 0.12); } [md-button]:hover.md-warn::after, [md-icon-button]:hover.md-warn::after { background-color: rgba(244, 67, 54, 0.12); } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], MdButton);
    return MdButton;
}());
export var MdAnchor = (function (_super) {
    __extends(MdAnchor, _super);
    function MdAnchor(elementRef, renderer) {
        _super.call(this, elementRef, renderer);
        this._disabled = null;
    }
    Object.defineProperty(MdAnchor.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAnchor.prototype, "isAriaDisabled", {
        get: function () {
            return this.disabled ? 'true' : 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdAnchor.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            // The presence of *any* disabled value makes the component disabled, *except* for false.
            this._disabled = (value != null && value != false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    MdAnchor.prototype._haltDisabledEvents = function (event) {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    __decorate([
        HostBinding('tabIndex'), 
        __metadata('design:type', Number)
    ], MdAnchor.prototype, "tabIndex", null);
    __decorate([
        HostBinding('attr.aria-disabled'), 
        __metadata('design:type', String)
    ], MdAnchor.prototype, "isAriaDisabled", null);
    __decorate([
        HostBinding('attr.disabled'),
        Input('disabled'), 
        __metadata('design:type', Object)
    ], MdAnchor.prototype, "disabled", null);
    MdAnchor = __decorate([
        Component({selector: 'a[md-button], a[md-raised-button], a[md-icon-button], a[md-fab], a[md-mini-fab]',
            inputs: ['color'],
            host: {
                '[class.md-button-focus]': '_isKeyboardFocused',
                '(mousedown)': '_setMousedown()',
                '(focus)': '_setKeyboardFocus()',
                '(blur)': '_removeKeyboardFocus()',
                '(click)': '_haltDisabledEvents($event)',
            },
            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> ",
            styles: ["/** * A collection of mixins and CSS classes that can be used to apply elevation to a material * element. * See: https://www.google.com/design/spec/what-is-material/elevation-shadows.html * Examples: * * * .md-foo { *   @include $md-elevation(2); * *   &:active { *     @include $md-elevation(8); *   } * } * * <div id=\"external-card\" class=\"md-elevation-z2\"><p>Some content</p></div> * * For an explanation of the design behind how elevation is implemented, see the design doc at * https://goo.gl/Kq0k9Z. */ /** * The css property used for elevation. In most cases this should not be changed. It is exposed * as a variable for abstraction / easy use when needing to reference the property directly, for * example in a will-change rule. */ /** The default duration value for elevation transitions. */ /** The default easing value for elevation transitions. */ /** * Applies the correct css rules to an element to give it the elevation specified by $zValue. * The $zValue must be between 0 and 24. */ /** * Returns a string that can be used as the value for a transition property for elevation. * Calling this function directly is useful in situations where a component needs to transition * more than one property. * * .foo { *   transition: md-elevation-transition-property-value(), opacity 100ms ease; *   will-change: $md-elevation-property, opacity; * } */ /** * Applies the correct css rules needed to have an element transition between elevations. * This mixin should be applied to elements whose elevation values will change depending on their * context (e.g. when active or disabled). */ /** * This mixin overrides default button styles like the gray background, * the border, and the outline. */ /** Applies a property to an md-button element for each of the supported palettes. */ /** Applies a focus style to an md-button element for each of the supported palettes. */ [md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; background: transparent; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab], .md-primary[md-button], .md-primary[md-icon-button] { color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab], .md-accent[md-button], .md-accent[md-icon-button] { color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab], .md-warn[md-button], .md-warn[md-icon-button] { color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-primary[disabled][md-button], .md-primary[disabled][md-icon-button], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-accent[disabled][md-button], .md-accent[disabled][md-icon-button], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], .md-warn[disabled][md-button], .md-warn[disabled][md-icon-button], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab], [disabled][disabled][md-button], [disabled][disabled][md-icon-button] { color: rgba(0, 0, 0, 0.38); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } .md-button-focus.md-primary[md-raised-button]::after, .md-button-focus.md-primary[md-fab]::after, .md-button-focus.md-primary[md-mini-fab]::after, .md-button-focus.md-primary[md-button]::after, .md-button-focus.md-primary[md-icon-button]::after { background-color: rgba(0, 150, 136, 0.12); } .md-button-focus.md-accent[md-raised-button]::after, .md-button-focus.md-accent[md-fab]::after, .md-button-focus.md-accent[md-mini-fab]::after, .md-button-focus.md-accent[md-button]::after, .md-button-focus.md-accent[md-icon-button]::after { background-color: rgba(156, 39, 176, 0.12); } .md-button-focus.md-warn[md-raised-button]::after, .md-button-focus.md-warn[md-fab]::after, .md-button-focus.md-warn[md-mini-fab]::after, .md-button-focus.md-warn[md-button]::after, .md-button-focus.md-warn[md-icon-button]::after { background-color: rgba(244, 67, 54, 0.12); } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); background-color: #fafafa; transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { color: white; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { color: rgba(255, 255, 255, 0.870588); } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { color: white; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { color: rgba(0, 0, 0, 0.38); } .md-primary[md-raised-button], .md-primary[md-fab], .md-primary[md-mini-fab] { background-color: #009688; } .md-accent[md-raised-button], .md-accent[md-fab], .md-accent[md-mini-fab] { background-color: #9c27b0; } .md-warn[md-raised-button], .md-warn[md-fab], .md-warn[md-mini-fab] { background-color: #f44336; } .md-primary[disabled][md-raised-button], .md-primary[disabled][md-fab], .md-primary[disabled][md-mini-fab], .md-accent[disabled][md-raised-button], .md-accent[disabled][md-fab], .md-accent[disabled][md-mini-fab], .md-warn[disabled][md-raised-button], .md-warn[disabled][md-fab], .md-warn[disabled][md-mini-fab], [disabled][disabled][md-raised-button], [disabled][disabled][md-fab], [disabled][disabled][md-mini-fab] { background-color: rgba(0, 0, 0, 0.12); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button]:hover.md-primary::after, [md-icon-button]:hover.md-primary::after { background-color: rgba(0, 150, 136, 0.12); } [md-button]:hover.md-accent::after, [md-icon-button]:hover.md-accent::after { background-color: rgba(156, 39, 176, 0.12); } [md-button]:hover.md-warn::after, [md-icon-button]:hover.md-warn::after { background-color: rgba(244, 67, 54, 0.12); } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; background-color: #9c27b0; color: rgba(255, 255, 255, 0.870588); width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], MdAnchor);
    return MdAnchor;
}(MdButton));
export var MdButtonModule = (function () {
    function MdButtonModule() {
    }
    MdButtonModule.forRoot = function () {
        return {
            ngModule: MdButtonModule,
            providers: []
        };
    };
    MdButtonModule = __decorate([
        NgModule({
            imports: [CommonModule, MdRippleModule],
            exports: [MdButton, MdAnchor],
            declarations: [MdButton, MdAnchor],
        }), 
        __metadata('design:paramtypes', [])
    ], MdButtonModule);
    return MdButtonModule;
}());

//# sourceMappingURL=button.js.map
