import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "games",
    loadChildren: () =>
      import("./features/games/games.module").then(m => m.GamesModule)
  },
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
