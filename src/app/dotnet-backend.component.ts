import {Component,inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';

interface BackendQuestion{
  category:string; difficulty:string; question:string; shortAnswer:string;
  example:string; codeExample:string; memoryCue:string; seniorPerspective:string;
}

@Component({
  standalone:true,
  imports:[RouterLink],
  template:`
<section class="page">
  <a routerLink="/" class="back">← Interview Prep</a>
  <header>
    <p class="label">7+ YEARS · .NET BACKEND</p>
    <h1>.NET Backend Interview Track</h1>
    <p>24 focused backend areas covering C#, ASP.NET Core, APIs, EF Core, SQL, architecture, caching, performance and production fundamentals. Every question includes an interview answer, practical example and actual C# code.</p>
  </header>

  <div class="note"><b>{{questions.length}} questions</b><span>Start with Simple, then Medium, then Complex. Use the code examples to practise explaining the concept aloud.</span></div>

  <nav class="areas">
    @for(a of areas;track a[1];let i=$index){
      <a [href]="'#'+a[1]"><span>{{(i+1).toString().padStart(2,'0')}}</span>{{a[0]}}</a>
    }
  </nav>

  @for(a of areas;track a[1]){
    <section class="area" [id]="a[1]">
      <div class="area-head">
        <p class="label">{{a[0]}}</p>
        <h2>{{a[2]}}</h2>
      </div>
      @for(q of questionsFor(a[0]);track q.question){
        <article class="question">
          <span class="level">{{q.difficulty}}</span>
          <h3>{{q.question}}</h3>
          <div class="answer"><b>Interview answer</b><p>{{q.shortAnswer}}</p></div>
          <div class="example"><b>Real-world example</b><p>{{q.example}}</p></div>
          <div class="code"><b>Code example</b><pre><code>{{q.codeExample}}</code></pre></div>
          <div class="memory"><b>Remember it as</b><p>{{q.memoryCue}}</p></div>
          <div class="senior"><b>Senior-level point</b><p>{{q.seniorPerspective}}</p></div>
        </article>
      }
    </section>
  }
</section>`,
  styles:[`
:host{display:block;background:#f7f8fa;color:#1f2937}.page{max-width:1080px;margin:0 auto;padding:28px 34px 100px}.back{color:#64748b;text-decoration:none;font-size:13px}.back:hover{color:#2563eb}
header{padding:55px 0 34px;border-bottom:1px solid #dfe4ea}header .label{margin:0 0 11px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.18em}h1{margin:0 0 15px;color:#111827;font-size:48px;letter-spacing:-.045em}header>p:last-child{max-width:850px;margin:0;color:#64748b;font-size:15px;line-height:1.85}
.note{display:flex;gap:12px;padding:19px 0;border-bottom:1px solid #e2e6eb;color:#64748b;font-size:13px}.note b{color:#111827}
.areas{display:grid;grid-template-columns:repeat(3,1fr);gap:0 28px;border-bottom:1px solid #dfe4ea;padding:20px 0 28px}.areas a{padding:9px 0;color:#475569;text-decoration:none;font-size:13px}.areas a:hover{color:#2563eb}.areas span{display:inline-block;width:28px;color:#94a3b8;font-size:11px}
.area{scroll-margin-top:20px;padding:52px 0 10px}.area-head{padding-bottom:18px;border-bottom:1px solid #dfe4ea}.area-head .label{margin:0 0 8px;color:#2563eb;font-size:10px;font-weight:700;letter-spacing:.14em}.area-head h2{margin:0;color:#111827;font-size:25px}
.question{position:relative;padding:30px 0 36px;border-bottom:1px solid #e2e6eb}.level{display:inline-block;color:#2563eb;background:#eff6ff;border:1px solid #dbeafe;border-radius:999px;padding:5px 9px;font-size:10px;text-transform:uppercase;letter-spacing:.12em}.question h3{margin:12px 0 20px;color:#111827;font-size:22px;line-height:1.45}.question>div{margin:0 0 15px}.question>div>b{display:block;margin-bottom:6px;color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:.12em}.question p{margin:0;max-width:880px;color:#475569;font-size:14px;line-height:1.8}.answer{background:#fff;border:1px solid #dce4ed;border-left:4px solid #2563eb;border-radius:8px;padding:17px 19px}.example{background:#f1f5f9;border-radius:8px;padding:17px 19px}.code{background:#111827;border-radius:8px;padding:17px 19px}.code>b{color:#93c5fd!important}.code pre{margin:0;overflow:auto;white-space:pre-wrap;color:#e5e7eb;font:13px/1.7 Consolas,Monaco,monospace}.memory{background:#eff6ff;border:1px solid #dbeafe;border-radius:8px;padding:15px 18px}.memory>b{color:#1d4ed8!important}.memory p{color:#1e40af!important}.senior{padding-left:2px}.senior>b{color:#1d4ed8!important}
@media(max-width:750px){.page{padding:22px 18px 70px}h1{font-size:36px}.areas{grid-template-columns:1fr 1fr}.question h3{font-size:19px}}
`]
})
export class DotnetBackendComponent{
  private http=inject(HttpClient);
  questions:BackendQuestion[]=[];
  readonly areas=[
    ['1. C# Fundamentals','csharp-fundamentals','Core language concepts you must explain confidently.'],
    ['2. OOP & SOLID','oop-solid','Object-oriented design and maintainable backend code.'],
    ['3. Collections & Generics','collections-generics','Choosing collections and designing reusable types.'],
    ['4. Delegates, Events & Lambda','delegates-events','Callbacks, notifications and functional C# features.'],
    ['5. Exception Handling','exceptions','Reliable exception boundaries and diagnostics.'],
    ['6. LINQ','linq','Query composition, execution and provider behaviour.'],
    ['7. Async/Await & Multithreading','async-threading','Asynchronous I/O, concurrency and thread safety.'],
    ['8. Memory Management & GC','memory-gc','Managed memory, disposal and allocation behaviour.'],
    ['9. .NET Runtime','runtime','CLR, JIT, IL and runtime execution.'],
    ['10. Dependency Injection','di','Service lifetimes, scopes and dependency boundaries.'],
    ['11. Configuration','configuration','Environment-aware, strongly typed application settings.'],
    ['12. Logging','logging','Structured logs, correlation and production diagnostics.'],
    ['13. ASP.NET Core','aspnet-core','Request pipeline, hosting, binding and validation.'],
    ['14. Web API','web-api','Endpoint contracts, status codes and error handling.'],
    ['15. Middleware','middleware','Cross-cutting HTTP pipeline behaviour.'],
    ['16. Filters','filters','MVC-specific cross-cutting concerns.'],
    ['17. REST','rest','HTTP semantics, idempotency and resource design.'],
    ['18. Authentication & Authorization','auth','Identity, JWTs, claims and access policies.'],
    ['19. Security','security','Threats and layered API security controls.'],
    ['20. Entity Framework Core','ef-core','DbContext, tracking, queries and performance.'],
    ['21. SQL & Database','sql-db','Indexes, transactions and database fundamentals.'],
    ['22. Architecture & Design Patterns','architecture-patterns','Clean boundaries and practical patterns.'],
    ['23. Caching','caching','Latency, cache-aside and distributed cache trade-offs.'],
    ['24. Performance & Scalability','performance','Measure, optimize, scale and protect bottlenecks.']
  ];
  constructor(){
    this.http.get<{questions:BackendQuestion[]}>('assets/data/dotnet-backend-bank.json')
      .subscribe(x=>this.questions=x.questions);
  }
  questionsFor(category:string){return this.questions.filter(q=>q.category===category);}
}
