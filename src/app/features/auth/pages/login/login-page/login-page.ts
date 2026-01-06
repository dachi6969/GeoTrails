import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginBox } from "../components/login-box/login-box";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [LoginBox, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  isDesktop = signal<boolean>(false);


  constructor() {
    inject(BreakpointObserver)
      .observe(['(min-width: 1024px)'])
      .pipe(takeUntilDestroyed())
      .subscribe(result => this.isDesktop.set(result.matches));
  }
}
