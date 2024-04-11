import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from '../app/shared/shared.module'

@NgModule({
  imports: [SharedModule],
  exports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientTestingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TestingModule {}
