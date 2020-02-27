/**
 * Desarrollo del sistema RNNUTRE del ministerio desarrollo social
 * Arean Xavier González 2019-02-27
 * version 1.1
 */
import { Component, OnInit } from '@angular/core';
import { TitleService } from "./core/services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _titleService: TitleService) {}

  ngOnInit() {
    this._titleService.init();
  }
}
