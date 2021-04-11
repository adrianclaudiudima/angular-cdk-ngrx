import {AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, OnDestroy, ViewChild} from '@angular/core';
import {CdkPortal, DomPortalOutlet} from '@angular/cdk/portal';

@Component({
  selector: 'app-dom-portal',
  templateUrl: 'dom-portal.component.html',
  styleUrls: ['dom-portal.component.scss']
})
export class DomPortalComponent implements AfterViewInit, OnDestroy {

  @Input()
  selector: string;

  @ViewChild(CdkPortal)
  private portal: CdkPortal;

  private host: DomPortalOutlet;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private applicationRef: ApplicationRef, private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.host = new DomPortalOutlet(document.querySelector(this.selector),
      this.componentFactoryResolver, this.applicationRef, this.injector
    );
    this.host.attachTemplatePortal(this.portal);
  }

  ngOnDestroy(): void {
    this.host.detach();
  }

}
