import { Injectable } from '@angular/core';
import { announceItem } from '../interfaces/announce-item';
import { of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class announceListService {
  readonly subject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  get announceList() {
    if (JSON.parse(sessionStorage.getItem("allannounces") as string) == null) return [] as announceItem[];
    return JSON.parse(sessionStorage.getItem("allannounces") as string);
  }

  set addItem(item: any) {
    let existingEntries = JSON.parse(sessionStorage.getItem("allannounces") as string);
    if (existingEntries == null) existingEntries = [];
    let id = existingEntries.length ? Math.max(...existingEntries.map((x:any) => x.id)) + 1 : 1;
    let obj = {
      id: id,
      details: '',
      created: new Date(),
    }
    existingEntries.push({...item, ...obj});
    sessionStorage.setItem('allannounces', JSON.stringify(existingEntries));
    this.subject.next(true);
  }

  editItem(item: announceItem) {
    let existingEntries = JSON.parse(sessionStorage.getItem("allannounces") as string);
    const index = existingEntries.findIndex(((obj:any) => obj.id == item.id));
    let obj = {
          created: existingEntries[index].created,
         };
    existingEntries[index] = {...item, ...obj};
    sessionStorage.setItem("allannounces", JSON.stringify(existingEntries));
    this.subject.next(true);
  }

  deleteItem(id: number) {
    let existingEntries = JSON.parse(sessionStorage.getItem("allannounces") as string);
    const index = existingEntries.findIndex(((obj:any) => obj.id == id));
    existingEntries.splice(index, 1);
    sessionStorage.setItem("allannounces", JSON.stringify(existingEntries));
    this.subject.next(true);
  }


  getItem(id: number | string) {
    let existingEntries = JSON.parse(sessionStorage.getItem("allannounces") as string);
    return of(existingEntries).pipe(
      map((announces: announceItem[]) => announces.find(announce => announce.id === +id))
    );    
  }

  getTopSimilar(item: announceItem) {
    let existingEntries = JSON.parse(sessionStorage.getItem("allannounces") as string);
    let itemTitleWords = item.title.replace(/[^a-zA-Z ]/g, "").split(/[!,?,. ]/);
    let itemDetailsWords = item.details.replace(/[^a-zA-Z ]/g, "").split(/[!,?,. ]/);
    let similarItems:announceItem[] = [];

    existingEntries.forEach((elem:announceItem) => {
      let currentTiitleWords = elem.title.replace(/[^a-zA-Z ]/g, "").split(/[!,?,. ]/);
      let currentDetailsWords = elem.details.replace(/[^a-zA-Z ]/g, "").split(/[!,?,. ]/);
      
      if (elem.id ==item.id) {
        return;
      }
      const hasCommonTitles = itemTitleWords.some(element => currentTiitleWords.includes(element));
      const hasCommonDesc = itemDetailsWords.some(element => currentDetailsWords.includes(element));

      if (hasCommonTitles && hasCommonDesc) similarItems.push(elem);
    });
    
    return similarItems.slice(0, 3);
  }
}