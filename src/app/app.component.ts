import {Component} from '@angular/core';
import {RouterLink,RouterOutlet} from '@angular/router';

@Component({
selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink],
template:`
<div class="app">
<header><a routerLink="/" class="brand">Interview Prep</a><span>Senior Software Engineer · 7+ Years</span></header>
<main><router-outlet></router-outlet></main>
</div>`,
styles:[`
:host{display:block;min-height:100vh}.app{min-height:100vh;background:#080d14;color:#e7eef5}header{height:64px;border-bottom:1px solid #1d2835;display:flex;align-items:center;justify-content:space-between;padding:0 34px;position:sticky;top:0;background:#080d14;z-index:5}.brand{color:#edf4fb;text-decoration:none;font-size:15px;font-weight:650}header span{color:#687b90;font-size:11px}main{min-height:calc(100vh - 64px)}@media(max-width:700px){header{padding:0 18px}header span{display:none}}
`]
})
export class AppComponent{}