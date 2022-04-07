import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { announceItem } from '../../interfaces/announce-item';

@Component({
  selector: 'app-announce-list',
  templateUrl: './announce-list.component.html',
  styleUrls: ['./announce-list.component.css']
})
export class announceListComponent  {
  @Input() announces!: announceItem[];

  panelOpenState = true;

}