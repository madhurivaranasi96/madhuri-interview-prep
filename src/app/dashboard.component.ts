import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

const TOPICS=[
['C# / .NET','csharp','Core C#, types, OOP, collections, exceptions, memory and modern language features.'],
['.NET Runtime','dotnet-runtime','CLR, GC, JIT, dependency injection, configuration, hosting and runtime behaviour.'],
['ASP.NET Core','aspnet-core','Middleware, DI, Web API, filters, validation, authentication and production APIs.'],
['EF Core','ef-core','DbContext, tracking, relationships, migrations, transactions and query performance.'],
['LINQ / C#','linq','LINQ operators, deferred execution, expression trees, projections and performance.'],
['Async / Threading','async-threading','async/await, Tasks, cancellation, concurrency, locks and thread safety.'],
['Angular','angular','Components, lifecycle, change detection, Signals, RxJS, forms, routing and HTTP.'],
['AngularJS','angularjs','Scopes, digest cycle, directives, services, routing, $http, DI, performance and AngularJS-to-Angular migration'],
['JavaScript / TypeScript','javascript','Closures, prototypes, event loop, promises, modules, typing and browser behaviour.'],
['SQL','sql','Joins, indexes, execution plans, transactions, isolation, locking and query tuning.'],
['API Design','api-design','REST, HTTP semantics, versioning, pagination, idempotency, rate limiting and API contracts.'],
['Architecture','architecture','SOLID, Clean Architecture, DDD, CQRS, modular design and architectural trade-offs.'],
['Design Patterns','design-patterns','Factory, Strategy, Decorator, Adapter, Repository and practical pattern selection.'],
['Microservices','microservices','Service boundaries, communication, resilience, consistency and distributed transactions.'],
['Data / Messaging','data-messaging','Queues, pub/sub, Kafka/RabbitMQ concepts, delivery guarantees and event-driven design.'],
['System Design','system-design','Scalability, caching, databases, consistency, availability and failure handling.'],
['Networking / Web','networking-web','HTTP, DNS, TLS, TCP, proxies, browser networking and web request lifecycles.'],
['Cloud / Distributed Systems','cloud-distributed','Cloud architecture, distributed coordination, resilience, scaling and service selection.'],
['Security','security','Authentication, authorization, OWASP, secure APIs, secrets, encryption and threat modelling.'],
['Performance','performance','Profiling, latency, throughput, memory, caching, database and API optimization.'],
['Testing','testing','Unit, integration, API, test doubles, async testing, reliability and test strategy.'],
['DevOps / Production','devops-production','CI/CD, Docker, deployment, observability, health checks, rollback and release safety.'],
['Production Debugging','production','Logs, metrics, traces, RCA, incident response and production troubleshooting.'],
['AI & Agentic AI','ai','LLM integration, RAG, tool calling, agents, evaluation, safety and production AI.'],
['Behavioral','behavioral','Ownership, leadership, conflict, failures, mentoring, stakeholder communication and decisions.'],
['Scenario-Based Interviews','scenarios','A separate bank where the question itself is a production or engineering situation.']
]

@Component({
standalone:true,imports:[RouterLink],
template:`
<section class="home">
<p class="label">SENIOR SOFTWARE ENGINEER · 7+ YEARS</p>
<h1>Prepare the way a senior engineer answers.</h1>
<p class="intro">The main bank uses conventional interview questions. Each answer turns the concept into practical engineering thinking: a concrete example, implementation choices, trade-offs, failure modes and how you would validate the decision.</p>
<div class="principles">
<div><b>Understand</b><span>Explain the concept clearly without memorising a textbook paragraph.</span></div>
<div><b>Apply</b><span>Use a concrete engineering example to show how the concept behaves in practice.</span></div>
<div><b>Defend</b><span>Explain alternatives, trade-offs, failure modes and evidence.</span></div>
</div>
<div class="answer-framework">
<h2>The answer pattern to practise</h2>
<p><b>1. Explain the concept</b> → <b>2. Give a concrete example</b> → <b>3. Explain when you would use it</b> → <b>4. Compare alternatives</b> → <b>5. Discuss failure modes</b> → <b>6. Explain testing or production validation</b></p>
</div>
<a routerLink="/cheat-sheet" class="cheat-link">
  <span class="cheat-badge">QUICK REVISION</span>
  <span><b>Last-minute cheat sheet</b><small>One-liners, real examples and senior tips for every major topic.</small></span>
  <span class="arrow">→</span>
</a>
<div class="section-intro"><p class="section-label">MAIN TECHNICAL INTERVIEW BANK</p><h2>Conventional questions, practical answers.</h2><p>Filter each topic by <b>Simple</b>, <b>Medium</b> or <b>Complex</b> using the dropdown. Scenario wording is kept in a separate bank.</p></div>
<div class="topics">
@for(t of topics;track t[1]){
@if(t[1]==='scenarios'){
<a routerLink="/scenarios">
<span class="topic-number">{{($index+1).toString().padStart(2,'0')}}</span>
<span><b>{{t[0]}}</b><small>{{t[2]}}</small></span>
<span class="arrow">→</span>
</a>
} @else {
<a [routerLink]="['/topic',t[1]]">
<span class="topic-number">{{($index+1).toString().padStart(2,'0')}}</span>
<span><b>{{t[0]}}</b><small>{{t[2]}}</small></span>
<span class="arrow">→</span>
</a>
}
}
</div>
</section>`,
styles:[`
:host{display:block;background:#f7f8fa;color:#1f2937;min-height:calc(100vh - 64px)}
.home{max-width:1040px;margin:0 auto;padding:72px 34px 100px}
.label{margin:0 0 13px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}
h1{margin:0;max-width:800px;font-size:50px;line-height:1.08;letter-spacing:-.045em;color:#111827}
.intro{max-width:790px;color:#64748b;font-size:16px;line-height:1.85;margin:20px 0 34px}
.principles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:0 0 40px}
.principles div{background:#fff;border:1px solid #e1e6ec;border-radius:9px;padding:19px 20px}
.principles b{display:block;color:#111827;font-size:15px;margin-bottom:6px}
.principles span{display:block;color:#64748b;font-size:12px;line-height:1.6}
.answer-framework{background:#fff;border:1px solid #dbe3ec;border-radius:10px;padding:20px 22px;margin:0 0 28px}
.answer-framework h2{margin:0 0 9px}
.answer-framework p{margin:0;color:#64748b;font-size:14px;line-height:1.8}
.cheat-link{display:grid;grid-template-columns:auto 1fr 30px;gap:16px;align-items:center;background:linear-gradient(135deg,#eff6ff,#f8fafc);border:1px solid #bfdbfe;border-radius:12px;padding:18px 20px;margin:0 0 48px;text-decoration:none;color:inherit}
.cheat-link:hover b{color:#2563eb}
.cheat-badge{font-size:10px;font-weight:700;letter-spacing:.14em;color:#1d4ed8;background:#dbeafe;border-radius:6px;padding:6px 10px}
.cheat-link b{display:block;font-size:16px;color:#1f2937;margin-bottom:4px}
.cheat-link small{display:block;color:#64748b;font-size:13px;line-height:1.5}
h2{font-size:23px;color:#111827;margin:0 0 18px}
.section-intro{margin-bottom:8px}
.section-label{margin:0 0 8px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}
.section-intro p:last-child{margin:0 0 18px;color:#64748b;font-size:14px;line-height:1.7}
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
.principles{grid-template-columns:1fr;margin-bottom:36px}
.cheat-link{grid-template-columns:1fr 24px}
.cheat-badge{display:none}
.topics a{grid-template-columns:32px 1fr 20px}
}
`]
})
export class DashboardComponent{readonly topics=TOPICS;}
