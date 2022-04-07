import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { announceItem } from '../../interfaces/announce-item';
import { announceListService } from '../../services/announce-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { announceFormComponent } from '../announce-form/announce-form.component';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-all-announce-list',
  templateUrl: './all-announce-list.component.html',
  styleUrls: ['./all-announce-list.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ])
  ]
})
export class AllannounceListComponent implements OnInit, OnDestroy {

  @ViewChild('announceForm') childComponent!: announceFormComponent;
  showInput: Boolean = true;
  showIcon: Boolean = true;
  allannounces: announceItem[] = [];
  subscription!:Subscription;
  search!: FormControl;
  
  private _announce!: Partial<announceItem>;
  announceChange: any;
  private unsubscribe$ = new Subject<void>();

  constructor (private announceListService: announceListService, private snackBarRef: MatSnackBar ) {}

  ngOnInit() {
    this.search = new FormControl();
    this.search.valueChanges
      .pipe(debounceTime(100), takeUntil(this.unsubscribe$))
      .subscribe((value:string) => {
        this.allannounces = this.announceListService.announceList.filter(
          (x:any) =>x.title.toLowerCase().includes(value.toLowerCase()))
      });

    this.subscription = this.announceListService.subject.subscribe(() => { this.allannounces = this.announceListService.announceList });
  }

  toggleButton() {
    this.showInput = true;
  }

  toggleIcon() {
    this.showIcon = !this.showIcon;
    this.clearInput();
  }

  clearInput() {
    this._announce = <announceItem>{};
  }

  addannounce() {
    try {
      if (!this._announce.title) throw new Error;
      this.announceListService.addItem = 
      {
        title: this._announce.title || ''
      }; 
    this.childComponent.title.reset();
        }
    catch(e) {
      this.snackBarRef.open('Please enter the item', 'Undo', {
        duration: 3000
      });
    }
  }

  onAddannounceChange(announce: Partial<announceItem>) {
    this._announce = announce;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
