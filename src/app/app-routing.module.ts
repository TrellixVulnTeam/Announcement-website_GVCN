import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllannounceListComponent } from 'src/app/components/all-announce-list/all-announce-list.component';
import { announceResolver } from './announce.resolver';
import { announceDetailComponent } from 'src/app/components/announce-detail/announce-detail.component';
import { EditannounceComponent } from 'src/app/components/edit-announce/edit-announce.component';


const routes: Routes = [
    { path: '', redirectTo:'announce-list', pathMatch: 'full' },
    { path: 'announce-list', component: AllannounceListComponent, resolve: { announces: announceResolver } },
    { path: 'announce-list/:id', component: announceDetailComponent },
    { path: 'announce-list/:id/edit', component: EditannounceComponent }
]; 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [announceResolver]
})
export class AppRoutingModule { }