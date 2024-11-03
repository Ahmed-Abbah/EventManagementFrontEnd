import { Injectable } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  private eventsApiUrl = 'https://localhost:8080';
  constructor(http:HttpClientModule) { }
}
