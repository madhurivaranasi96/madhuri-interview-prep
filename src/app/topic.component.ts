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
        <p class="label">INTERVIEW STUDY</p>
        <h1>{{topic}}</h1>
        <p>{{filtered.length}} questions. Read the question first, answer aloud, then compare with the notes below.</p>
      </header>

      @for(q of filtered; track q.id; let i = $index) {
        <article class="question">
          <div class="number">{{i + 1}}</div>
          <div class="content">
            <span class="difficulty">{{q.difficulty}}</span>
            <h2>{{q.question}}</h2>

            <section>
              <h3>Answer</h3>
              <p>{{q.shortAnswer}}</p>
            </section>

            <section>
              <h3>Example</h3>
              <p>{{q.example}}</p>
            </section>

            <section>
              <h3>Senior-level thinking</h3>
              <p>{{q.seniorPerspective}}</p>
            </section>

            <section>
              <h3>Common mistake</h3>
              <p>{{q.commonMistakes}}</p>
            </section>

            <section>
              <h3>Follow-up questions</h3>
              @for(f of q.followUps; track f) {
                <p class="follow-up">→ {{f}}</p>
              }
            </section>
          </div>
        </article>
      }
    </section>
  `,
  styles:[`
    :host{display:block}
    .study-page{max-width:1000px;margin:0 auto;padding:28px 34px 90px}
    .back{color:#7890a8;text-decoration:none;font-size:13px}
    .topic-header{padding:55px 0 38px;border-bottom:1px solid #202b39}
    .label{margin:0 0 10px;color:#7dd3fc;font-size:11px;letter-spacing:.18em}
    h1{margin:0 0 12px;font-size:44px;letter-spacing:-.04em;color:#edf4fb}
    .topic-header>p:last-child{max-width:720px;margin:0;color:#8b9aab;line-height:1.7;font-size:14px}
    .question{display:grid;grid-template-columns:52px 1fr;gap:20px;padding:38px 0;border-bottom:1px solid #1b2633}
    .number{color:#52667c;font-size:13px;padding-top:6px}
    .difficulty{display:inline-block;color:#7dd3fc;font-size:10px;text-transform:uppercase;letter-spacing:.13em}
    h2{font-size:25px;line-height:1.35;margin:8px 0 28px;color:#f0f5fa}
    section{margin:0 0 23px}
    h3{margin:0 0 7px;color:#8aa0b6;font-size:11px;letter-spacing:.13em;text-transform:uppercase}
    section p{margin:0;color:#b7c3d0;font-size:14px;line-height:1.8;max-width:820px}
    .follow-up{color:#91a5ba!important;margin-top:6px!important}
    @media(max-width:700px){
      .study-page{padding:22px 18px 70px}
      .topic-header{padding:42px 0 30px}
      h1{font-size:34px}
      .question{grid-template-columns:30px 1fr;gap:10px;padding:30px 0}
      h2{font-size:21px}
    }
  `]
})
export class TopicComponent{
  private service=inject(QuestionBankService);
  private route=inject(ActivatedRoute);
  topic='';
  filtered:InterviewQuestion[]=[];

  constructor(){
    this.route.paramMap.subscribe(params=>{
      const map:any={
        csharp:'C# / .NET',
        dotnet:'.NET',
        angular:'Angular',
        javascript:'JavaScript',
        sql:'SQL',
        'system-design':'System Design',
        ai:'AI & Agentic AI',
        production:'Production Debugging',
        security:'Security',
        performance:'Performance',
        behavioral:'Behavioral'
      };
      this.topic=map[params.get('slug')||'csharp']||'C# / .NET';
      this.service.byTechnology(this.topic).subscribe(q=>this.filtered=q);
    });
  }
}