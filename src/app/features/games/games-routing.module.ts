import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { GamesComponent } from "./games.component";

const routes: Routes = [
  {
    path: "",
    component: GamesComponent,
    children: [
      {
        path: "sales",
        loadChildren: () =>
          import("./sales/sales.module").then(m => m.SalesModule)
      },
      {
        path: "conferences",
        loadChildren: () =>
          import("./conferences/conferences.module").then(
            m => m.ConferencesModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [GamesComponent]
})
export class GamesRoutingModule {}
