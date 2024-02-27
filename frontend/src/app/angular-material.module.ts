import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatMenuModule]
})
export class AngularMaterialModule {}
