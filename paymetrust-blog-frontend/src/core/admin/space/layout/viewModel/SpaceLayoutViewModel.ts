import { Observable, debounceTime, merge, startWith } from "rxjs";
import AuthUserLocalStorageSingletonRepository from "src/core/admin/auth/repositories/AuthUserLocalStorageSingletonRepository";
import DisconectUserUseCase, { DisconnectCallback } from "src/core/admin/auth/useCases/DisconnectUserUseCase";

export default class SpaceLayoutViewModel {
  constructor(private AuthUserLocalStorageSingletonRepository: AuthUserLocalStorageSingletonRepository){}

  initInactivitiesLogout(eventsObservables: Observable<UIEvent>[], logoutTimeOut: number, logoutCallBack?: DisconnectCallback){
    return merge(...eventsObservables).pipe(
      startWith(true),
      debounceTime((1000 * 60) * logoutTimeOut)
    ).subscribe({
      next: _=>{
        new DisconectUserUseCase(this.AuthUserLocalStorageSingletonRepository).execute(logoutCallBack)
      }
    })
  }
}
