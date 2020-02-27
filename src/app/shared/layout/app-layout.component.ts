import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../core/services';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent implements OnInit {

  constructor(
    private _titleService: TitleService,
    //private _auth: AuthenticationService
  ) { }

  ngOnInit() {
    this._titleService.init();
  }

}
