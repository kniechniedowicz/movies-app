import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, MatCardModule],
  exports: [MessageComponent],
})
export class SharedModule {}
