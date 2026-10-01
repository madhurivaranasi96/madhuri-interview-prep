import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {TopicComponent} from './topic.component';
import {PracticeComponent} from './practice.component';
import {CheatSheetComponent} from './cheat-sheet.component';

export const routes:Routes=[
 {path:'',component:DashboardComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'topic/:slug',component:TopicComponent},
 {path:'scenarios',component:PracticeComponent},
 {path:'practice/:mode',component:PracticeComponent},
 {path:'cheat-sheet',component:CheatSheetComponent},
 {path:'**',redirectTo:''}
];
