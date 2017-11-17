import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
      selector: 'hd-layout',
      template: `
      <hd-main-toolbar [titleText]="titleText" [adminText]="adminText" (sidenavToggle)="sidenav.toggle()" (onLogout)="logout()"></hd-main-toolbar>
      <div class="loading-container" *ngIf="loading">
            <md-spinner></md-spinner>
      </div>
      <hd-sidenav (pageTitle)="pagebar.changePageTitle($event)" [groupAccess]="groupAccess" #sidenav>
                  <hd-page-toolbar #pagebar></hd-page-toolbar>
                  <div class='hd-page'>
                        <ng-content></ng-content>
                  </div>
      </hd-sidenav>
  `
})
export class LayoutComponent {
      @Input() titleText: string = "Humadev Theme";
      @Input() adminText: string = "Admin";
      @Input() titleImg: string;
      @Input() loading = false;
      @Input() groupAccess = 1;
      @Output() onLogout = new EventEmitter();

      logout() {
            this.onLogout.emit();
      }
}
