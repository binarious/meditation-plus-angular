(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular2-material/core'), require('rxjs/Observable'), require('rxjs/add/operator/map')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular2-material/core', 'rxjs/Observable', 'rxjs/add/operator/map'], factory) :
    (factory((global.md = global.md || {}, global.md.tabs = global.md.tabs || {}),global.ng.core,global.ng.common,global.md.core,global.Rx,global.Rx.Observable.prototype));
}(this, (function (exports,_angular_core,_angular_common,_angular2Material_core,rxjs_Observable,rxjs_add_operator_map) { 'use strict';

var __extends = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Used to flag tab labels for use with the portal directive */
var MdTabLabel = (function (_super) {
    __extends(MdTabLabel, _super);
    function MdTabLabel(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    MdTabLabel = __decorate$1([
        _angular_core.Directive({
            selector: '[md-tab-label]',
        }), 
        __metadata$1('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], MdTabLabel);
    return MdTabLabel;
}(_angular2Material_core.TemplatePortalDirective));

var __extends$1 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Used to flag tab contents for use with the portal directive */
var MdTabContent = (function (_super) {
    __extends$1(MdTabContent, _super);
    function MdTabContent(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    MdTabContent = __decorate$2([
        _angular_core.Directive({
            selector: '[md-tab-content]'
        }), 
        __metadata$2('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], MdTabContent);
    return MdTabContent;
}(_angular2Material_core.TemplatePortalDirective));

var __decorate$3 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Used in the `md-tab-group` view to display tab labels */
var MdTabLabelWrapper = (function () {
    function MdTabLabelWrapper(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * Sets focus on the wrapper element
     */
    MdTabLabelWrapper.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    MdTabLabelWrapper = __decorate$3([
        _angular_core.Directive({
            selector: '[md-tab-label-wrapper]'
        }), 
        __metadata$3('design:paramtypes', [_angular_core.ElementRef])
    ], MdTabLabelWrapper);
    return MdTabLabelWrapper;
}());

var __decorate$4 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** The ink-bar is used to display and animate the line underneath the current active tab label. */
var MdInkBar = (function () {
    function MdInkBar(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * @param element
     */
    MdInkBar.prototype.alignToElement = function (element) {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'left', this._getLeftPosition(element));
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', this._getElementWidth(element));
    };
    /**
     * Generates the pixel distance from the left based on the provided element in string format.
     * @param element
     * @returns {string}
     */
    MdInkBar.prototype._getLeftPosition = function (element) {
        return element ? element.offsetLeft + 'px' : '0';
    };
    /**
     * Generates the pixel width from the provided element in string format.
     * @param element
     * @returns {string}
     */
    MdInkBar.prototype._getElementWidth = function (element) {
        return element ? element.offsetWidth + 'px' : '0';
    };
    MdInkBar = __decorate$4([
        _angular_core.Directive({
            selector: 'md-ink-bar',
        }), 
        __metadata$4('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
    ], MdInkBar);
    return MdInkBar;
}());

var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var MdTabChangeEvent = (function () {
    function MdTabChangeEvent() {
    }
    return MdTabChangeEvent;
}());
var MdTab = (function () {
    function MdTab() {
        // TODO: Replace this when BooleanFieldValue is removed.
        this._disabled = false;
    }
    Object.defineProperty(MdTab.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (value != null && "" + value !== 'false');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        _angular_core.ContentChild(MdTabLabel), 
        __metadata('design:type', MdTabLabel)
    ], MdTab.prototype, "label", void 0);
    __decorate([
        _angular_core.ContentChild(MdTabContent), 
        __metadata('design:type', MdTabContent)
    ], MdTab.prototype, "content", void 0);
    __decorate([
        _angular_core.Input('disabled'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], MdTab.prototype, "disabled", null);
    MdTab = __decorate([
        _angular_core.Directive({
            selector: 'md-tab'
        }), 
        __metadata('design:paramtypes', [])
    ], MdTab);
    return MdTab;
}());
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
var MdTabGroup = (function () {
    function MdTabGroup(_zone) {
        this._zone = _zone;
        this._isInitialized = false;
        this._selectedIndex = 0;
        this._onFocusChange = new _angular_core.EventEmitter();
        this._onSelectChange = new _angular_core.EventEmitter();
        this._focusIndex = 0;
        this._groupId = nextId++;
    }
    Object.defineProperty(MdTabGroup.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            if (value != this._selectedIndex && this.isValidIndex(value)) {
                this._selectedIndex = value;
                if (this._isInitialized) {
                    this._onSelectChange.emit(this._createChangeEvent(value));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    MdTabGroup.prototype.isValidIndex = function (index) {
        if (this._tabs) {
            var tab = this._tabs.toArray()[index];
            return tab && !tab.disabled;
        }
        else {
            return true;
        }
    };
    Object.defineProperty(MdTabGroup.prototype, "_selectedIndexChange", {
        /** Output to enable support for two-way binding on `selectedIndex`. */
        get: function () {
            return this.selectChange.map(function (event) { return event.index; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusChange", {
        get: function () {
            return this._onFocusChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "selectChange", {
        get: function () {
            return this._onSelectChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Waits one frame for the view to update, then upates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    MdTabGroup.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            window.requestAnimationFrame(function () {
                _this._updateInkBar();
            });
        });
        this._isInitialized = true;
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    MdTabGroup.prototype._updateInkBar = function () {
        this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
    };
    Object.defineProperty(MdTabGroup.prototype, "_currentLabelWrapper", {
        /**
         * Reference to the current label wrapper; defaults to null for initial render before the
         * ViewChildren references are ready.
         */
        get: function () {
            return this._labelWrappers && this._labelWrappers.length
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTabGroup.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this._focusIndex;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            if (this.isValidIndex(value)) {
                this._focusIndex = value;
                if (this._isInitialized) {
                    this._onFocusChange.emit(this._createChangeEvent(value));
                }
                if (this._labelWrappers && this._labelWrappers.length) {
                    this._labelWrappers.toArray()[value].focus();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MdTabGroup.prototype._createChangeEvent = function (index) {
        var event = new MdTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    };
    /** Returns a unique id for each tab label element */
    MdTabGroup.prototype._getTabLabelId = function (i) {
        return "md-tab-label-" + this._groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    MdTabGroup.prototype._getTabContentId = function (i) {
        return "md-tab-content-" + this._groupId + "-" + i;
    };
    MdTabGroup.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case _angular2Material_core.RIGHT_ARROW:
                this.focusNextTab();
                break;
            case _angular2Material_core.LEFT_ARROW:
                this.focusPreviousTab();
                break;
            case _angular2Material_core.ENTER:
                this.selectedIndex = this.focusIndex;
                break;
        }
    };
    /**
     * Moves the focus left or right depending on the offset provided.  Valid offsets are 1 and -1.
     */
    MdTabGroup.prototype.moveFocus = function (offset) {
        if (this._labelWrappers) {
            var tabs = this._tabs.toArray();
            for (var i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this.isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    };
    /** Increment the focus index by 1 until a valid tab is found. */
    MdTabGroup.prototype.focusNextTab = function () {
        this.moveFocus(1);
    };
    /** Decrement the focus index by 1 until a valid tab is found. */
    MdTabGroup.prototype.focusPreviousTab = function () {
        this.moveFocus(-1);
    };
    __decorate([
        _angular_core.ContentChildren(MdTab), 
        __metadata('design:type', _angular_core.QueryList)
    ], MdTabGroup.prototype, "_tabs", void 0);
    __decorate([
        _angular_core.ViewChildren(MdTabLabelWrapper), 
        __metadata('design:type', _angular_core.QueryList)
    ], MdTabGroup.prototype, "_labelWrappers", void 0);
    __decorate([
        _angular_core.ViewChildren(MdInkBar), 
        __metadata('design:type', _angular_core.QueryList)
    ], MdTabGroup.prototype, "_inkBar", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], MdTabGroup.prototype, "selectedIndex", null);
    __decorate([
        _angular_core.Output('selectedIndexChange'), 
        __metadata('design:type', rxjs_Observable.Observable)
    ], MdTabGroup.prototype, "_selectedIndexChange", null);
    __decorate([
        _angular_core.Output('focusChange'), 
        __metadata('design:type', rxjs_Observable.Observable)
    ], MdTabGroup.prototype, "focusChange", null);
    __decorate([
        _angular_core.Output('selectChange'), 
        __metadata('design:type', rxjs_Observable.Observable)
    ], MdTabGroup.prototype, "selectChange", null);
    MdTabGroup = __decorate([
        _angular_core.Component({selector: 'md-tab-group',
            template: "<div class=\"md-tab-header\" role=\"tablist\" (keydown)=\"handleKeydown($event)\"> <div class=\"md-tab-label\" role=\"tab\" md-tab-label-wrapper *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.md-tab-active]=\"selectedIndex == i\" [class.md-tab-disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"> <template [portalHost]=\"tab.label\"></template> </div> <md-ink-bar></md-ink-bar> </div> <div class=\"md-tab-body-wrapper\"> <div class=\"md-tab-body\" role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [class.md-tab-active]=\"selectedIndex == i\" [attr.aria-labelledby]=\"_getTabLabelId(i)\"> <template [ngIf]=\"selectedIndex == i\"> <template [portalHost]=\"tab.content\"></template> </template> </div> </div> ",
            styles: [":host { display: flex; flex-direction: column; font-family: Roboto, \"Helvetica Neue\", sans-serif; } /** The top section of the view; contains the tab labels */ .md-tab-header { overflow: hidden; position: relative; display: flex; flex-direction: row; border-bottom: 1px solid #e0e0e0; flex-shrink: 0; } /** Wraps each tab label */ .md-tab-label { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; } .md-tab-label:focus { outline: none; opacity: 1; background-color: rgba(178, 223, 219, 0.3); } .md-tab-disabled { cursor: default; pointer-events: none; } /** The bottom section of the view; contains the tab bodies */ .md-tab-body-wrapper { position: relative; overflow: hidden; flex-grow: 1; display: flex; } /** Wraps each tab body */ .md-tab-body { display: none; overflow: auto; box-sizing: border-box; flex-grow: 1; flex-shrink: 1; } .md-tab-body.md-tab-active { display: block; } /** The colored bar that underlines the active tab */ md-ink-bar { position: absolute; bottom: 0; height: 2px; background-color: #009688; transition: 350ms ease-out; } /*# sourceMappingURL=tab-group.css.map */ "],
        }), 
        __metadata('design:paramtypes', [_angular_core.NgZone])
    ], MdTabGroup);
    return MdTabGroup;
}());
var MdTabsModule = (function () {
    function MdTabsModule() {
    }
    MdTabsModule.forRoot = function () {
        return {
            ngModule: MdTabsModule,
            providers: []
        };
    };
    MdTabsModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular2Material_core.PortalModule],
            // Don't export MdInkBar or MdTabLabelWrapper, as they are internal implementatino details.
            exports: [MdTabGroup, MdTabLabel, MdTabContent, MdTab],
            declarations: [MdTabGroup, MdTabLabel, MdTabContent, MdTab, MdInkBar, MdTabLabelWrapper],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabsModule);
    return MdTabsModule;
}());

exports.MdTabChangeEvent = MdTabChangeEvent;
exports.MdTab = MdTab;
exports.MdTabGroup = MdTabGroup;
exports.MdTabsModule = MdTabsModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));