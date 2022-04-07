import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { announceListService } from './services/announce-list.service';

@Injectable()
export class announceResolver implements Resolve<Observable<any>> {
  constructor(private announceService: announceListService) {}

  resolve(): Observable<any> {
    return this.announceService.announceList;
  }
}