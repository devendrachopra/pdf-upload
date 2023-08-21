import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {

  //method to set session data
  setSession(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

   //method to set session data
   setSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  } 
  //method to get session data
  getSession(key: string): any {
    if (typeof window !== 'undefined') {
      let data = localStorage.getItem(key) ?? "";
      if (data) {
        return  JSON.parse(data);
      }
      return null;
    }
  }

   //method to get session data
   getSessionStorage(key: string): any {
    if (typeof window !== 'undefined') {
      let data = sessionStorage.getItem(key) ?? "";
      if (data) {
        return JSON.parse(data);
      }
      return null;
    }
  }
  //method to delete session data
  deleteSession(key: string): void {
    localStorage.removeItem(key);
  }
  //method to clear session data
  clearSession(): void {
    localStorage.clear();
  }

}