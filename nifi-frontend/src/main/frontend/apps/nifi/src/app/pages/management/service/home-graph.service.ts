import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchData(url: string): Observable<any> {
        this.loadingSubject.next(true); // 开始加载

        return this.http.get(url).pipe(
            tap(() => this.loadingSubject.next(false)) // 加载完成
        );
    }
}
