import {Component,inject} from '@angular/core';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {QuestionBankService,InterviewQuestion} from './core/question-bank.service';

@Component({
  standalone:true,
  imports:[RouterLink],
  template:`
    <section class="study-page">
      <a routerLink="/" class="back">← Interview Prep</a>
      <header class="topic-header">
        <div>
          <p class="label">7+ YEARS · TECHNICAL INTERVIEW PREPARATION</p>
          <h1>{{topic}}</h1>
          <p>Interview questions are grouped into three levels. Select a level and practise the answer as you would say it in a real senior developer interview.</p>
        </div>
        <label class="difficulty-select">
          <span>QUESTION LEVEL</span>
          <select [value]="selectedDifficulty" (change)="setDifficulty($any($event.target).value)">
            <option value="All">All levels</option>
            <option value="Simple">Simple</option>
            <option value="Medium">Medium</option>
            <option value="Complex">Complex</option>
          </select>
        </label>
      </header>
      <div class="bank-note"><b>{{filtered.length}} questions</b><span>Clear answer + real-world example + deeper explanation + senior follow-ups.</span></div>

      @for(q of filtered; track q.id; let i = $index) {
        <article class="question">
          <div class="question-number">{{(i + 1).toString().padStart(2,'0')}}</div>
          <div class="question-body">
            <div class="meta"><span>{{q.difficulty}}</span><span>{{q.technology}}</span></div>
            <h2>{{q.question}}</h2>
            <section class="answer"><h3>Clear interview answer</h3><p>{{q.shortAnswer}}</p></section>
            <section class="example"><h3>Real-world example</h3><p>{{q.example}}</p></section><section class="code-example"><h3>Code example</h3><pre><code>{{q.codeExample}}</code></pre></section><section class="memory"><h3>Remember it as</h3><p>{{q.memoryCue}}</p></section>
            <section class="deep"><h3>Go deeper</h3><p>{{q.detailedAnswer}}</p></section>
            <section class="reasoning"><h3>What a 7-year developer should add</h3><p>{{q.seniorPerspective}}</p></section>
            <section class="mistakes"><h3>Common mistakes</h3><p>{{q.commonMistakes}}</p></section>
            <section class="followups"><h3>Likely follow-ups</h3>@for(f of q.followUps; track f) { <p>→ {{f}}</p> }</section>
          </div>
        </article>
      }
      @if(filtered.length === 0) { <div class="empty">No questions are available for this level yet.</div> }
    </section>
  `,
  styles:[`
    :host{display:block;background:#f7f8fa;color:#1f2937}.study-page{max-width:1040px;margin:0 auto;padding:28px 34px 100px}.back{color:#64748b;text-decoration:none;font-size:13px}.back:hover{color:#2563eb}
    .topic-header{display:flex;justify-content:space-between;align-items:end;gap:32px;padding:54px 0 32px;border-bottom:1px solid #dfe4ea}.label{margin:0 0 11px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}.topic-header h1{margin:0 0 14px;font-size:46px;letter-spacing:-.04em;color:#111827}.topic-header>div>p:last-child{max-width:700px;margin:0;color:#64748b;line-height:1.8;font-size:15px}
    .difficulty-select{min-width:190px}.difficulty-select span{display:block;margin-bottom:7px;color:#64748b;font-size:10px;font-weight:700;letter-spacing:.14em}select{width:100%;padding:11px 13px;border:1px solid #cbd5e1;border-radius:7px;background:#fff;color:#1f2937;font-size:14px;outline:none}select:focus{border-color:#2563eb;box-shadow:0 0 0 3px #dbeafe}
    .bank-note{display:flex;gap:12px;align-items:center;padding:20px 0;border-bottom:1px solid #e2e6eb;color:#64748b;font-size:13px}.bank-note b{color:#1f2937}
    .question{display:grid;grid-template-columns:58px 1fr;gap:24px;padding:42px 0;border-bottom:1px solid #e2e6eb}.question-number{color:#94a3b8;font-size:13px;padding-top:7px;font-weight:600}.question-body{min-width:0}.meta{display:flex;gap:10px;margin-bottom:10px}.meta span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;background:#eff6ff;border:1px solid #dbeafe;border-radius:999px;padding:5px 9px}.question h2{font-size:27px;line-height:1.38;margin:0 0 27px;color:#111827;letter-spacing:-.02em}
    section{margin:0 0 24px}h3{margin:0 0 8px;color:#475569;font-size:11px;letter-spacing:.12em;text-transform:uppercase}section p{margin:0;max-width:850px;color:#475569;font-size:15px;line-height:1.85}.answer{background:#fff;border:1px solid #dce4ed;border-left:4px solid #2563eb;border-radius:8px;padding:19px 21px}.answer h3{color:#1d4ed8}.example{background:#f1f5f9;border-radius:8px;padding:19px 21px}.code-example{background:#111827;border-radius:8px;padding:19px 21px}.code-example h3{color:#93c5fd}.code-example pre{margin:0;overflow:auto;color:#e5e7eb;font:13px/1.7 Consolas,Monaco,monospace;white-space:pre-wrap}.memory{background:#eff6ff;border:1px solid #dbeafe;border-radius:8px;padding:18px 20px}.memory h3{color:#1d4ed8}.memory p{color:#1e40af}.deep{background:#fff;border:1px solid #e1e6ec;border-radius:8px;padding:19px 21px}.reasoning h3{color:#1d4ed8}.mistakes{background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;padding:18px 20px}.followups p{color:#64748b;margin-top:7px}.empty{padding:60px 0;color:#64748b}
    @media(max-width:700px){.study-page{padding:22px 18px 70px}.topic-header{display:block;padding:42px 0 28px}.topic-header h1{font-size:35px}.difficulty-select{margin-top:24px;max-width:none}.question{grid-template-columns:30px 1fr;gap:10px;padding:34px 0}.question h2{font-size:23px}section p{font-size:14px}}
  `]
})
export class TopicComponent{
  private service=inject(QuestionBankService);
  private route=inject(ActivatedRoute);
  topic='';selectedDifficulty='All';filtered:InterviewQuestion[]=[];private allQuestions:InterviewQuestion[]=[];
  constructor(){
    this.route.paramMap.subscribe(params=>{
      const map:any={csharp:'C# / .NET',dotnet:'.NET',angular:'Angular',javascript:'JavaScript / TypeScript',sql:'SQL','system-design':'System Design',ai:'AI & Agentic AI',production:'Production Debugging',security:'Security',performance:'Performance',behavioral:'Behavioral'};
      this.topic=map[params.get('slug')||'csharp']||'C# / .NET';
      this.service.byTechnology(this.topic).subscribe(q=>{this.allQuestions=q.map(x=>x.difficulty==='Senior / Advanced'?{...x,difficulty:'Complex'}:x);this.applyFilter();});
    });
  }
  setDifficulty(value:string){this.selectedDifficulty=value;this.applyFilter();}
  private applyFilter(){this.filtered=this.selectedDifficulty==='All'?this.allQuestions:this.allQuestions.filter(x=>x.difficulty===this.selectedDifficulty);}
}