import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MessageComponent } from './components/message/message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RatePipe } from './pipes/rate.pipe';
import { UserPermissionsDirective } from './directives/user-permissions/user-permissions.directive';

@NgModule({
  declarations: [
    MessageComponent,
    LoaderComponent,
    RatePipe,
    UserPermissionsDirective,
  ],
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  exports: [
    MessageComponent,
    LoaderComponent,
    RatePipe,
    UserPermissionsDirective,
  ],
})
export class SharedModule {}
