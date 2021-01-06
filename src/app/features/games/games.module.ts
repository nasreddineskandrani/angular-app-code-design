import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
///

import { GamesRoutingModule } from "./games-routing.module";
import { GamesService } from "./games.service";

@NgModule({
  imports: [RouterModule, CommonModule, GamesRoutingModule],
  declarations: [],
  providers: [GamesService]
})
export class GamesModule {}
