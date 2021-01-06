import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { ConferencesComponent } from "./conferences.component";

const routes: Routes = [
  {
    path: "",
    component: ConferencesComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class ConferencesRoutingModule {}
