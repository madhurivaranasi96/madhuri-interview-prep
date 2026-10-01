import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

const TOPICS=[
['C# / .NET','csharp','Practical coding, async, concurrency, memory, LINQ and design decisions.'],
['ASP.NET Core','dotnet','Real API design, DI, middleware, security, data access and production problems.'],
['Angular','angular','Component design, RxJS, Signals, performance, forms and real application flows.'],
['JavaScript / TypeScript','javascript','Browser behavior, async code, closures, typing and practical debugging.'],
['SQL','sql','Query tuning, indexes, transactions, locking, deadlocks and data correctness.'],
['System Design','system-design','Design real systems, choose components, scale them and handle failures.'],
['Security','security','Apply security concepts to APIs, browsers, databases and AI systems.'],
['Performance','performance','Find bottlenecks using evidence and improve latency, throughput and resource usage.'],
['Production Debugging','production','Walk through incidents from symptom to evidence, mitigation, root cause and prevention.'],
['AI & Agentic AI','ai','Build reliable AI workflows, RAG systems, tools, evaluation and guardrails.'],
['Behavioral','behavioral','Explain ownership, difficult decisions, incidents, conflict and technical leadership.'],
['Scenario-Based Interviews','scenarios','A separate bank for production incidents, debugging, performance failures and architecture situations.']
];

@Component({
standalone:true,imports:[RouterLink],
template:`
<section class="home">
<p class="label">SENIOR SOFTWARE ENGINEER · 7+ YEARS</p>
<h1>Prepare the way a senior engineer answers.</h1>
<p class="intro">The main bank uses conventional interview questions. The answer then turns the concept into practical engineering thinking: a concrete example, implementation choices, trade-offs, failure modes and how you would validate the decision.</p>
<div class="principles">
<div><b>Understand</b><span>Explain the concept clearly without memorising a textbook paragraph.</span></div>
<div><b>Apply</b><span>Use a concrete engineering example to show how the concept behaves in practice.</span></div>
<div><b>Defend</b><span>Explain alternatives, trade-offs, failure modes and evidence.</span></div>
</div>
<div class="answer-framework">
<h2>The answer pattern to practise</h2>
<p><b>1. Explain the concept</b> → <b>2. Give a concrete example</b> → <b>3. Explain when you would use it</b> → <b>4. Compare alternatives</b> → <b>5. Discuss failure modes</b> → <b>6. Explain testing or production validation</b> → <b>7. Prepare for follow-ups</b></p>
</div>
<div class="section-intro"><p class="section-label">MAIN TECHNICAL INTERVIEW BANK</p><h2>Conventional questions, practical answers.</h2><p>Simple, Medium, Complex and Senior / Advanced. Scenario wording is intentionally kept out of this bank.</p></div>
<div class="topics">
@for(t of topics;track t[1]){
<a [routerLink]="['/topic',t[1]]">
<span class="topic-number">{{($index+1).toString().padStart(2,'0')}}</span>
<span><b>{{t[0]}}</b><small>{{t[2]}}</small></span>
<span class="arrow">→</span>
</a>
}
</div>
</section>`,
styles:[`
:host{display:block;background:#f7f8fa;color:#1f2937;min-height:calc(100vh - 64px)}
.home{max-width:1040px;margin:0 auto;padding:72px 34px 100px}
.label{margin:0 0 13px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}
h1{margin:0;max-width:800px;font-size:50px;line-height:1.08;letter-spacing:-.045em;color:#111827}
.intro{max-width:790px;color:#64748b;font-size:16px;line-height:1.85;margin:20px 0 34px}
.principles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:0 0 68px}
.principles div{background:#fff;border:1px solid #e1e6ec;border-radius:9px;padding:19px 20px}
.principles b{display:block;color:#111827;font-size:15px;margin-bottom:6px}
.principles span{display:block;color:#64748b;font-size:12px;line-height:1.6}
.answer-framework{background:#fff;border:1px solid #dbe3ec;border-radius:10px;padding:20px 22px;margin:0 0 58px}
.answer-framework h2{margin:0 0 9px}
.answer-framework p{margin:0;color:#64748b;font-size:14px;line-height:1.8}
h2{font-size:23px;color:#111827;margin:0 0 18px}
.topics{border-top:1px solid #dfe4ea}
.topics a{display:grid;grid-template-columns:42px 1fr 30px;gap:15px;align-items:center;padding:22px 0;border-bottom:1px solid #e2e6eb;text-decoration:none;color:inherit}
.topics a:hover b{color:#2563eb}
.topic-number{font-size:12px;color:#94a3b8}
.topics b{display:block;font-size:17px;color:#1f2937;margin-bottom:5px}
.topics small{display:block;color:#64748b;font-size:13px;line-height:1.55}
.arrow{color:#64748b}
@media(max-width:700px){
.home{padding:48px 18px 70px}
h1{font-size:37px}
.principles{grid-template-columns:1fr;margin-bottom:50px}
.topics a{grid-template-columns:32px 1fr 20px}
}
`]
})
export class DashboardComponent{readonly topics=TOPICS;}