import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Visualization3DComponent} from "./Components/visualization-3D/visualization3D.component";

const routes: Routes = [
// Redirect to the visualization-3D component on app load
  { path: '', redirectTo: '/visualization-3D', pathMatch: 'full' },
// Route for the visualization-3D component
  { path: 'visualization-3D', component: Visualization3DComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
