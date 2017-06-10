import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import {TestHelper} from '../../../testing/test.helper'

export class FakeUserService {


  public constructor(
  ) {
  }

  /**
   * Logging in a User via email and password.
   * @param {String} email
   * @param {String} password
   * @param {String} username
   */
  public login(email: string, password: string, username: string = undefined) {
    return  TestHelper.noRespose()
  }

  /**
   * Verify account by sending token received via email to server
   *
   * @param  {string}               token secret token
   */
  public verify(token: string): Observable<Response> {
    return  TestHelper.noRespose()
  }

  /**
   * Resend email activation with token
   *
   * @param  {string}               email mail address of user
   */
  public resend(email: string): Observable<Response> {
    return  TestHelper.noRespose()
  }

  public resetPasswordInit(email: string): Observable<Response> {
    return  TestHelper.noRespose()
  }

  public resetPassword(userId: string, token: string, password: string): Observable<Response> {
    return  TestHelper.noRespose()
  }

  /**
   * Register refresh subscription
   */
  public registerRefresh() {
  }

  /**
   * Checks whether the currently logged in user is an admin.
   * @return {boolean} true: admin, false: no admin
   */
  public isAdmin(): boolean {
    return false;
  }

  public signup(name: string, password: string, email: string, username: string) {
    return  TestHelper.noRespose()
  }

  /**
   * Logging out the current user. Removes the token from
   * localStorage.
   */
  public logout(): void {

  }

  /**
   * Asks the server if we are logged in.
   */
  public loggedIn() {
  }

  /**
   * Updates the profile of the current user.
   * @param  {Object}                profile Profile data
   * @return {Observbable<Response>}
   */
  public updateProfile(profile: Object): Observable<Response> {
    return  TestHelper.noRespose()
  }

  /**
   * Gets the complete profile of the given id or, if null, the
   * currently logged in user.
   * @return {Observable<Response>}
   */
  public getProfile(id: string = null): Observable<Response> {
    return   TestHelper.fakeResponse({
      _id: '321'
    })
  }

  /**
   * Gets the complete profile of the given username.
   * @return {Observable<Response>}
   */
  public getProfileByUsername(username: string): Observable<Response> {
    return  TestHelper.noRespose()
  }

  public getAll() {
    return  TestHelper.noRespose()
  }

  public search(term: string) {
    return  TestHelper.noRespose()
  }

  public getOnline() {
    return  TestHelper.noRespose()
  }

  public getOnlineSocket(): Observable<any> {
    return  TestHelper.noRespose()
  }

  public get(id: string) {
    return  TestHelper.noRespose()
  }

  public save(user) {
    return  TestHelper.noRespose()
  }

  public delete(user) {
    return  TestHelper.noRespose()
  }

  public registerPushSubscription(subscription) {
    return  TestHelper.noRespose()
  }

  public getUsername(search: string) {
    return  TestHelper.noRespose()
  }

}
