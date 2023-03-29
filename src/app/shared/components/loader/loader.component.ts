import { Component } from '@angular/core';

import { LoaderService } from '../../../core/services/loader/loader.service';

@Component({
  selector: 'objectivity-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
