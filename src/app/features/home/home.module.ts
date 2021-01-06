import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
///

import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  imports: [RouterModule, CommonModule, HomeRoutingModule],
  declarations: []
})
export class HomeModule {}
