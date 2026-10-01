import {Component} from '@angular/core';
import {RouterLink,RouterOutlet} from '@angular/router';

@Component({
selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink],
template:`
<div class="app">
<header><a routerLink="/" class="brand">Interview Prep</a><span>Senior Software Engineer · Practical Preparation</span></header>
<main><router-outlet></router-outlet></main>
</div>`,
styles:[`
:host{display:block;min-height:100vh;background:#f7f8fa}
.app{min-height:100vh;background:#f7f8fa;color:#1f2937}
header{height:64px;border-bottom:1px solid #e1e6ec;display:flex;align-items:center;justify-content:space-between;padding:0 34px;position:sticky;top:0;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);z-index:5}
.brand{color:#111827;text-decoration:none;font-size:15px;font-weight:700}
header span{color:#64748b;font-size:11px;letter-spacing:.03em}
main{min-height:calc(100vh - 64px)}
@media(max-width:700px){header{padding:0 18px}header span{display:none}}
`]
})
export class AppComponent{}