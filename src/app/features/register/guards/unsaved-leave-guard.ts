import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { RegisterService } from '../services/register-service';
import { CanLeave } from '../pages/register-page/register-page';


export const unsavedLeaveGuard: CanDeactivateFn<CanLeave> = (component) => {

  const registerService = inject(RegisterService);

  // *** checks if fields are dirty *** 
  if ( component.canLeave() ) {
    return true
  }

  return registerService.confirm(); // opens modal and waiting for promise(true/false);

};
