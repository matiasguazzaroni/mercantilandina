import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockmercantilService {

  constructor(@Inject('API_MOCK_URL') private baseUrl: string, private http: HttpClient) { }

  checkUserAvailability(username: string) {
    return this.http.get(`${this.baseUrl}/usuarios?nombre=${username}`);
  }
}
