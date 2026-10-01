import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

const TOPICS=[
['C# / .NET','csharp','C# language, async, LINQ, concurrency, design and memory.'],
['ASP.NET Core','dotnet','DI, middleware, Web APIs, security, configuration and performance.'],
['Angular','angular','Components, signals, RxJS, forms, routing and performance.'],
['JavaScript / TypeScript','javascript','Language fundamentals, async, closures and TypeScript.'],
['SQL','sql','Joins, indexes, transactions, isolation, tuning and concurrency.'],
['System Design','system-design','Scalability, caching, queues, availability and distributed systems.'],
['Security','security','Authentication, authorization, injection, XSS, CSRF and secrets.'],
['Performance','performance','Latency, throughput, caching, N+1 and optimization.'],
['Production Debugging','production','RCA, incidents, database issues, memory, CPU and queues.'],
['AI & Agentic AI','ai','RAG, embeddings, agents, evaluation and AI security.'],
['Behavioral','behavioral','Senior-level ownership, incidents, disagreements and leadership.']
];

@Component({
standalone:true,imports:[RouterLink],
template:`
<section class="home">
<p class="label">SENIOR SOFTWARE ENGINEER INTERVIEW PREP</p>
<h1>Study. Answer aloud. Repeat.</h1>
<p class="intro">A simple question-and-answer study bank for senior software engineering interviews. No dashboards, scores or complicated practice flow — just the material you need to revise.</p>
<div class="stats"><strong>130+</strong><span>interview questions</span></div>
<h2>Study by topic</h2>
<div class="topics">
@for(t of topics;track t[1]){
<a [routerLink]="['/topic',t[1]]">
<span class="topic-number">{{($index+1).toString().padStart(2,'0')}}</span>
<span><b>{{t[0]}}</b><small>{{t[2]}}</small></span>
<span class="arrow">→</span>
</a>
}
</div>
<div class="method">
<h2>How to use this</h2>
<p><b>1.</b> Read the question and answer it aloud without looking below.</p>
<p><b>2.</b> Compare your answer with the notes and identify what you missed.</p>
<p><b>3.</b> For complex questions, explain trade-offs, failure modes, testing and production impact.</p>
<p><b>4.</b> Repeat the same topic until you can answer naturally without memorizing sentences.</p>
</div>
</section>`,
styles:[`
:host{display:block}.home{max-width:1000px;margin:0 auto;padding:70px 34px 100px}.label{margin:0 0 13px;color:#7dd3fc;font-size:11px;letter-spacing:.18em}h1{margin:0;font-size:48px;letter-spacing:-.045em;color:#edf4fb}.intro{max-width:720px;color:#8998a9;font-size:15px;line-height:1.8;margin:18px 0 28px}.stats{display:flex;align-items:baseline;gap:10px;margin:0 0 58px;color:#73869b}.stats strong{font-size:30px;color:#edf4fb}.stats span{font-size:13px}h2{font-size:22px;color:#e9f0f6;margin:0 0 18px}.topics{border-top:1px solid #202b39}.topics a{display:grid;grid-template-columns:42px 1fr 30px;gap:15px;align-items:center;padding:21px 0;border-bottom:1px solid #1b2633;text-decoration:none;color:inherit}.topics a:hover b{color:#7dd3fc}.topic-number{font-size:12px;color:#53677d}.topics b{display:block;font-size:16px;color:#e3ebf2;margin-bottom:5px}.topics small{display:block;color:#718296;font-size:12px;line-height:1.5}.arrow{color:#587089}.method{margin-top:65px;padding-top:30px;border-top:1px solid #202b39}.method p{color:#8b9aaa;font-size:13px;line-height:1.8;margin:8px 0}.method b{color:#dce6ef}@media(max-width:700px){.home{padding:45px 18px 70px}h1{font-size:36px}.topics a{grid-template-columns:32px 1fr 20px}}
`]
})
export class DashboardComponent{readonly topics=TOPICS;}