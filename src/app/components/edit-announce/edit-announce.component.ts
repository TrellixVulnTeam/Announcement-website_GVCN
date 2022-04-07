import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { announceListService } from 'src/app/services/announce-list.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-announce',
  templateUrl: './edit-announce.component.html',
  styleUrls: ['./edit-announce.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ])
  ]
})
export class EditannounceComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  announce!: any;
  subscription!:Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private announceListService: announceListService
    ) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      details: new FormControl('')
    });

    this.subscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.announceListService.getItem((params.get('id') as string)))
    ).subscribe((announce:any) => this.announce = announce);

    this.editForm.patchValue({title: this.announce.title, details: this.announce.details});
  }

  onSubmit() {
    this.announceListService.editItem({
      id: this.announce.id,
      title: this.editForm.value.title,
      details: this.editForm.value.details,
      created: new Date()
    });
    this.router.navigate(['/announce-list', this.announce.id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
