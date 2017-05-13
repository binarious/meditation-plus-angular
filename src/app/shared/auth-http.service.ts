import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp as JwtAuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttp {
  constructor(private authHttp: JwtAuthHttp, private router: Router) {
  }

  private isUnauthorized(status: number): boolean {
    return status === 401;
  }

  private authIntercept(response: Observable<Response>): Observable<Response> {
    const sharableResponse = response.share();
    sharableResponse.subscribe(null, err => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
    });
    return sharableResponse;
  }

  public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    this.authHttp.setGlobalHeaders(headers, request);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.request(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.post(url, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.put(url, options));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.patch(url, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.authIntercept(this.authHttp.options(url, options));
  }
}
