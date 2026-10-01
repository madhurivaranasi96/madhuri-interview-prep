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
      @for(group of groups; track group.name) {
        <section class="difficulty">
          <div class="difficulty-head"><span>{{group.number}}</span><div><h2>{{group.name}}</h2><p>{{group.description}}</p></div></div>
          @for(q of group.questions; track q.id; let i = $index) {
            <article class="question">
              <div class="question-number">{{(i + 1).toString().padStart(2,'0')}}</div>
              <div class="question-body">
                <div class="meta"><span>{{q.difficulty}}</span><span>{{q.type}}</span></div>
                <h3>{{q.question}}</h3>
                <section class="answer"><h4>How I would answer</h4><p>{{q.shortAnswer}}</p></section>
                <section class="example"><h4>Concrete engineering example</h4><p>{{q.example}}</p></section>
                <section class="deep"><h4>Going deeper</h4><p>{{q.detailedAnswer}}</p></section>
                <section class="reasoning"><h4>Senior reasoning</h4><p>{{q.seniorPerspective}}</p></section>
                <section class="mistakes"><h4>What can go wrong</h4><p>{{q.commonMistakes}}</p></section>
                <section class="followups"><h4>Likely follow-ups</h4>@for(f of q.followUps; track f) { <p>→ {{f}}</p> }</section>
              </div>
            </article>
          }
        </section>
      }
    </section>
  `,
  styles:[`
    :host{display:block;background:#f7f8fa;color:#1f2937}.study-page{max-width:1040px;margin:0 auto;padding:28px 34px 100px}.back{color:#64748b;text-decoration:none;font-size:13px}.back:hover{color:#2563eb}.topic-header{padding:54px 0 42px;border-bottom:1px solid #dfe4ea}.label{margin:0 0 11px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}.topic-header h1{margin:0 0 14px;font-size:46px;letter-spacing:-.04em;color:#111827}.topic-header>p:last-child{max-width:850px;margin:0;color:#64748b;line-height:1.85;font-size:15px}.difficulty{padding-top:48px}.difficulty-head{display:grid;grid-template-columns:58px 1fr;gap:24px;padding:0 0 20px;border-bottom:2px solid #dbe3ec}.difficulty-head>span{color:#2563eb;font-size:12px;font-weight:700;padding-top:6px}.difficulty-head h2{margin:0 0 5px;color:#111827;font-size:25px}.difficulty-head p{margin:0;color:#64748b;font-size:13px;line-height:1.6}.question{display:grid;grid-template-columns:58px 1fr;gap:24px;padding:42px 0;border-bottom:1px solid #e2e6eb}.question-number{color:#94a3b8;font-size:13px;padding-top:7px;font-weight:600}.question-body{min-width:0}.meta{display:flex;gap:10px;margin-bottom:10px}.meta span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;background:#eff6ff;border:1px solid #dbeafe;border-radius:999px;padding:5px 9px}.question h3{font-size:27px;line-height:1.38;margin:0 0 27px;color:#111827;letter-spacing:-.02em}section{margin:0 0 24px}h4{margin:0 0 8px;color:#475569;font-size:11px;letter-spacing:.12em;text-transform:uppercase}section p{margin:0;max-width:850px;color:#475569;font-size:15px;line-height:1.85}.answer{background:#fff;border:1px solid #dce4ed;border-left:4px solid #2563eb;border-radius:8px;padding:19px 21px}.answer h4{color:#1d4ed8}.example{background:#f1f5f9;border-radius:8px;padding:19px 21px}.deep{background:#fff;border:1px solid #e1e6ec;border-radius:8px;padding:19px 21px}.reasoning h4{color:#1d4ed8}.mistakes{background:#fafafa;border:1px solid #e5e7eb;border-radius:8px;padding:18px 20px}.followups p{color:#64748b;margin-top:7px}@media(max-width:700px){.study-page{padding:22px 18px 70px}.topic-header{padding:42px 0 32px}.topic-header h1{font-size:35px}.difficulty-head,.question{grid-template-columns:30px 1fr;gap:10px}.question h3{font-size:23px}section p{font-size:14px}}
  `]
})
export class TopicComponent{
  private service=inject(QuestionBankService);
  private route=inject(ActivatedRoute);
  topic='';
  filtered:InterviewQuestion[]=[];
  groups:{name:string,number:string,description:string,questions:InterviewQuestion[]}[]=[];
  constructor(){
    this.route.paramMap.subscribe(params=>{
      const map:any={csharp:'C# / .NET',dotnet:'.NET',angular:'Angular',javascript:'JavaScript / TypeScript',sql:'SQL','system-design':'System Design',ai:'AI & Agentic AI',production:'Production Debugging',security:'Security',performance:'Performance',behavioral:'Behavioral'};
      this.topic=map[params.get('slug')||'csharp']||'C# / .NET';
      this.service.byTechnology(this.topic).subscribe(q=>{
        this.filtered=q;
        const defs=[['01','Simple','Foundation questions with practical examples.'],['02','Medium','Implementation behaviour, decisions and common pitfalls.'],['03','Complex','Deep technical reasoning, performance and failure modes.'],['04','Senior / Advanced','Architecture, trade-offs, observability and engineering judgment.']];
        this.groups=defs.map(([number,name,description])=>({number,name,description,questions:q.filter(x=>x.difficulty===name)})).filter(x=>x.questions.length);
      });
    });
  }
}