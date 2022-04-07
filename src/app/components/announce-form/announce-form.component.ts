import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { announceItem } from '../../interfaces/announce-item';

@Component({
  selector: 'app-announce-form',
  templateUrl: './announce-form.component.html',
  styleUrls: ['./announce-form.component.css']
})
export class announceFormComponent implements OnDestroy, OnInit {

  @Output() announceChange = new EventEmitter<Partial<announceItem>>();

  title!: FormControl;

  private unsubscribe$ = new Subject<void>();

  constructor() { }
  
  ngOnInit() {
    this.title = new FormControl();
    this.title.valueChanges
      .pipe(debounceTime(100), takeUntil(this.unsubscribe$))
      .subscribe((value:string) => this.announceChange.emit({ title: value }));
  }

  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}