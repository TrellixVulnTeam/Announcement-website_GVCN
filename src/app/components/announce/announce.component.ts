import { Component, EventEmitter, Input, Output } from '@angular/core';
import { announceItem } from '../../interfaces/announce-item';
import { announceListService } from 'src/app/services/announce-list.service';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class announceComponent {

  @Input() announce!: announceItem;

  constructor(private service: announceListService) { }

  deleteItem(id:number): void {
    this.service.deleteItem(id);
  }

}