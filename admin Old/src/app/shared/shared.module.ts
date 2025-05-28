import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { CommonsModule } from './common/common.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModule,
    CommonsModule
  ],
})
export class SharedModule { }
