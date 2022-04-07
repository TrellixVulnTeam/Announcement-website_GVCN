import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {  Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { announceListService } from 'src/app/services/announce-list.service';

@Component({
  selector: 'app-announce-detail',
  templateUrl: './announce-detail.component.html',
  styleUrls: ['./announce-detail.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ])
  ]
})
export class announceDetailComponent implements OnInit, OnDestroy {

  announce!: any;
  subscription!:Subscription;
  topSimilar!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private announceListService: announceListService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.announceListService.getItem((params.get('id') as string)))
    ).subscribe((announce:any) => this.announce = announce);

    this.topSimilar = this.announceListService.getTopSimilar(this.announce);
  }

  editannounce(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
