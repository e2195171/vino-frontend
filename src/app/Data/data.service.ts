import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
    
export class DataService {

    private cellierSource = new BehaviorSubject<string>('1');
    ceCellierData = this.cellierSource.asObservable();
    
    constructor() { }

    changeCellier(cellierData: string) {
        this.cellierSource.next(cellierData)
    }
}
