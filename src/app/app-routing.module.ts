import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocDetailsComponent } from './components/doc-details/doc-details.component';
import { DocsListComponent } from './components/docs-list/docs-list.component';
import { DocsTableComponent } from './components/docs-table/docs-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'docs', component: DocsListComponent },
  { path: 'docs/:id', component: DocDetailsComponent },
  { path: 'docstab', component: DocsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
