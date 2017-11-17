import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/switchMap';
@Component({
      selector: 'hd-sidenav',
      templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {

      @Input() titleImg: string;
      @Input() nav: any = false;
      @Input() navFromRouter: any;
      @Input() lazyLoadModule: boolean;
      @Input() groupAccess = 1;
      @Output() pageTitle = new EventEmitter();
      opened = true;

      constructor(
            private router: Router,
            private activeRoute: ActivatedRoute
      ) { }

      ngOnInit() {
            if (this.nav == false)
                  this.navFromRouter = this.router.config[1].children;
            this.router.events
                  .filter(event => event instanceof NavigationEnd)
                  .map(() => this.activeRoute)
                  .map(route => {
                        while (route.firstChild) route = route.firstChild;
                        return route;
                  })
                  .filter(route => route.outlet === 'primary')
                  .switchMap(route => route.data)
                  .subscribe(res => {
                        let title = res.name;

                        //custom page title
                        if (res.hasOwnProperty('pageTitle')) {
                              title = res.pageTitle;
                        }

                        this.pageTitle.emit(title);
                  }
                  );
      }

      parentOpen(i: any) {
            if (this.nav == false) {
                  if (this.navFromRouter[i].isOpen == false || !this.navFromRouter[i].hasOwnProperty('isOpen')) {
                        this.navFromRouter[i].isOpen = true;
                  } else {
                        this.navFromRouter[i].isOpen = false;
                  }
            } else {
                  if (this.nav[i].isOpen == false || !this.nav[i].hasOwnProperty('isOpen')) {
                        this.nav[i].isOpen = true;
                  } else {
                        this.nav[i].isOpen = false;
                  }
            }
      }

      isActive(instruction: any[]): boolean {
            let res = this.router.isActive(this.router.createUrlTree(instruction), false);
            return res;
      }

      checkPath(row) {
            if (row.path == '') {
                  return { exact: true };
            } else {
                  return { exact: false };
            }
      }

      @Output()
      toggle() {
            this.opened = !this.opened;
      }

      checkHidden(navItem) {
            let hidden = false;
            if (navItem.hasOwnProperty('redirectTo')) {
                  hidden = true;
            } else {
                  if (navItem.hasOwnProperty('data')) {
                        if(navItem.data.hasOwnProperty('groupAccess')){
                              //console.log(navItem.data.name,navItem.data.groupAccess);
                              if(navItem.data.groupAccess.indexOf(this.groupAccess) === -1){
                                    hidden = true;
                              }
                        }
                        if (navItem.data.hasOwnProperty('hidden')) {
                              hidden = navItem.data.hidden;
                        }
                  }
            }
            return hidden;
      }
}
