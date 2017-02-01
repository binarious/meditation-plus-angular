import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortalDirective } from '@angular2-material/core';
/** Used to flag tab labels for use with the portal directive */
export declare class MdTabLabel extends TemplatePortalDirective {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
