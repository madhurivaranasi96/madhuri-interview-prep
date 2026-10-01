import {Component,inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  standalone:true,
  imports:[RouterLink],
  template:`
    <section class="page">
      <a routerLink="/" class="back">← Interview Prep</a>
      <header>
        <p class="label">LAST-MINUTE REVISION</p>
        <h1>{{data?.title || 'Cheat Sheet'}}</h1>
        <p>{{data?.note}}</p>
      </header>

      @for(section of data?.sections || []; track section.name) {
        <section class="block">
          <h2>{{section.name}}</h2>
          <div class="grid">
            @for(item of section.items; track item.term) {
              <article>
                <h3>{{item.term}}</h3>
                <p class="one">{{item.oneLiner}}</p>
                <p class="ex"><span>Example</span> {{item.example}}</p>
                <p class="tip"><span>Senior tip</span> {{item.tip}}</p>
              </article>
            }
          </div>
        </section>
      }
    </section>
  `,
  styles:[`
    :host{display:block;background:#f7f8fa;color:#1f2937}
    .page{max-width:1100px;margin:0 auto;padding:28px 34px 100px}
    .back{color:#64748b;text-decoration:none;font-size:13px}
    .back:hover{color:#2563eb}
    header{padding:48px 0 36px;border-bottom:1px solid #dfe4ea}
    .label{margin:0 0 11px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}
    h1{margin:0 0 12px;font-size:40px;letter-spacing:-.04em;color:#111827}
    header>p{margin:0;max-width:820px;color:#64748b;font-size:15px;line-height:1.8}
    .block{padding-top:40px}
    h2{margin:0 0 18px;font-size:22px;color:#111827;border-bottom:2px solid #dbe3ec;padding-bottom:10px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
    article{background:#fff;border:1px solid #e1e6ec;border-radius:10px;padding:16px 18px}
    h3{margin:0 0 8px;font-size:15px;color:#1d4ed8}
    .one{margin:0 0 10px;font-size:14px;line-height:1.65;color:#374151}
    .ex,.tip{margin:0 0 6px;font-size:13px;line-height:1.6;color:#64748b}
    .ex span,.tip span{display:inline-block;font-weight:600;color:#475569;margin-right:6px;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
    .tip span{color:#b45309}
    @media(max-width:700px){
      .page{padding:22px 16px 70px}
      h1{font-size:32px}
      .grid{grid-template-columns:1fr}
    }
  `]
})
export class CheatSheetComponent{
  private http=inject(HttpClient);
  data:any=null;
  constructor(){
    this.http.get('assets/data/cheat-sheet.json').subscribe(x=>this.data=x);
  }
}
