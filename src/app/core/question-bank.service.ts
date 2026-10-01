import {Injectable,inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay,map,Observable} from 'rxjs';

export interface InterviewQuestion{
  id:string; technology:string; difficulty:string; type:string; question:string;
  shortAnswer:string; detailedAnswer:string; example:string; seniorPerspective:string;
  commonMistakes:string; followUps:string[]; tags:string[]; memoryCue:string; codeExample:string;
}

@Injectable({providedIn:'root'})
export class QuestionBankService{
  private http=inject(HttpClient);
  private bank$=this.http.get<{questions:InterviewQuestion[]}>('assets/data/interview-bank.json').pipe(shareReplay(1));
  all():Observable<InterviewQuestion[]>{return this.bank$.pipe(map(x=>x.questions));}
  byTechnology(t:string):Observable<InterviewQuestion[]>{
    return this.all().pipe(map(q=>q.filter(x=>t==='C# / .NET' ? (x.technology==='C# / .NET'||x.technology==='.NET') : x.technology===t)));
  }
}