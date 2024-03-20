import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartUpdate = new Subject<void>();
  cartUpdate$ = this.cartUpdate.asObservable();

  notifyCartUpdate(): void {
    this.cartUpdate.next();
  }
}
