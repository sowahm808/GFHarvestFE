import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParentChildService {
  private readonly baseUrl = `${environment.apiUrl}/api/parent-child`;

  constructor(private http: HttpClient) {}

  linkParentChild(parentId: string, childId: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/link`, { parentId, childId });
  }

  unlinkParentChild(parentId: string, childId: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/unlink`, { parentId, childId });
  }

  getChildrenForParent(parentId: string): Observable<{ children: string[] }> {
    return this.http.get<{ children: string[] }>(`${this.baseUrl}/${parentId}/children`);
  }
}
