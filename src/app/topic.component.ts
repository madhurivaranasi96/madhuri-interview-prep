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
        <p class="label">MAIN TECHNICAL INTERVIEW BANK</p>
        <h1>{{topic}}</h1>
        <p>These are conventional interview questions. The practical example is part of the answer so you can explain the concept through implementation, trade-offs, failure modes and production validation.</p>
      </header>

      @for(group of groups; track group.name) {<h2 class="difficulty">{{group.name}}</h2>@for(q of group.questions; track q.id; let i = $index) {
        <article class="scenario">
          <div class="scenario-number">{{($index + 1).toString().padStart(2,'0')}}</div>

          <div class="scenario-body">
            <div class="meta">
              <span>{{q.difficulty}}</span>
              <span>{{q.type}}</span>
            </div>

            <h2>{{q.question}}</h2>

            <section class="explain">
              <h3>How I would explain it in an interview</h3>
              <p>{{q.shortAnswer}}</p>
            </section>

            <section class="practical">
              <h3>Practical example</h3>
              <p>{{q.example}}</p>
            </section>

            <section class="deep">
              <h3>If the interviewer pushes deeper</h3>
              <p>{{q.detailedAnswer}}</p>
            </section>

            <section>
              <h3>Senior-level reasoning</h3>
              <p>{{q.seniorPerspective}}</p>
            </section>

            <section>
              <h3>What I would watch for in production</h3>
              <p>{{q.commonMistakes}}</p>
            </section>

            <section class="followups">
              <h3>Where the interviewer can take the discussion</h3>
              @for(f of q.followUps; track f) {
                <p>→ {{f}}</p>
              }
            </section>
          </div>
        </article>
      }
    </section>
  `,
  styles:[`
    :host{display:block;background:#f7f8fa;color:#1f2937}
    .study-page{max-width:1040px;margin:0 auto;padding:28px 34px 100px}
    .back{color:#64748b;text-decoration:none;font-size:13px}
    .back:hover{color:#2563eb}
    .topic-header{padding:54px 0 42px;border-bottom:1px solid #dfe4ea}
    .label{margin:0 0 11px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}
    h1{margin:0 0 14px;font-size:46px;letter-spacing:-.04em;color:#111827}
    .topic-header>p:last-child{max-width:820px;margin:0;color:#64748b;line-height:1.85;font-size:15px}
    .scenario{display:grid;grid-template-columns:58px 1fr;gap:24px;padding:46px 0;border-bottom:1px solid #e2e6eb}
    .scenario-number{color:#94a3b8;font-size:13px;padding-top:8px;font-weight:600}
    .scenario-body{min-width:0}
    .meta{display:flex;gap:10px;margin-bottom:10px}
    .meta span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;background:#eff6ff;border:1px solid #dbeafe;border-radius:999px;padding:5px 9px}
    h2{font-size:28px;line-height:1.35;margin:0 0 30px;color:#111827;letter-spacing:-.02em}
    section{margin:0 0 27px}
    h3{margin:0 0 8px;color:#475569;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
    section p{margin:0;max-width:850px;color:#475569;font-size:15px;line-height:1.85}
    .explain{background:#fff;border:1px solid #e1e6ec;border-left:4px solid #2563eb;border-radius:8px;padding:20px 22px;box-shadow:0 2px 8px rgba(15,23,42,.03)}
    .explain h3{color:#1d4ed8}
    .practical{background:#f1f5f9;border-radius:8px;padding:20px 22px}
    .deep{background:#fff;border:1px solid #e1e6ec;border-radius:8px;padding:20px 22px}
    .deep h3{color:#334155}
    .followups{padding-top:5px}
    .followups p{color:#64748b;margin-top:7px}
    @media(max-width:700px){
      .study-page{padding:22px 18px 70px}
      .topic-header{padding:42px 0 32px}
      h1{font-size:35px}
      .scenario{grid-template-columns:30px 1fr;gap:10px;padding:34px 0}
      h2{font-size:23px}
      section p{font-size:14px}
    }
  `]
})
export class TopicComponent{
  private service=inject(QuestionBankService);
  private route=inject(ActivatedRoute);
  topic='';
  filtered:InterviewQuestion[]=[];groups:any[]=[];

  constructor(){
    this.route.paramMap.subscribe(params=>{
      const map:any={
        csharp:'C# / .NET',
        dotnet:'.NET',
        angular:'Angular',
        javascript:'JavaScript / TypeScript',
        sql:'SQL',
        'system-design':'System Design',
        ai:'AI & Agentic AI',
        production:'Production Debugging',
        security:'Security',
        performance:'Performance',
        behavioral:'Behavioral'
      };
      this.topic=map[params.get('slug')||'csharp']||'C# / .NET';
      this.service.byTechnology(this.topic).subscribe(q=>{this.filtered=q; const defs=[['01','Simple'],['02','Medium'],['03','Complex'],['04','Senior / Advanced']]; this.groups=defs.map(x=>({number:x[0],name:x[1],questions:q.filter(y=>y.difficulty===x[1])})).filter(x=>x.questions.length);});
    });
  }
}