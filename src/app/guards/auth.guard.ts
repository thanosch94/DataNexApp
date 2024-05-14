import { Inject, inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { WebAppBase } from '../base/web-app-base';

export const authGuard: CanActivateFn = (route, state) => {
const router = inject(Router)
  if(WebAppBase.isLoggedIn){
    return true;
  }else{
    router.navigateByUrl('login')
  return false}
};
