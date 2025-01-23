import { Injectable, signal } from '@angular/core';
import { ManageablePromise } from '@shared/utils/manageable-promise..utils';

@Injectable({
  providedIn: 'root',
})
export class GenericModalsUtilsService {
  public isModalVisible = signal(false);
  public title = signal('');
  public text = signal('');
  public acceptOnly = signal(false);
  public confirmResp = new ManageablePromise();

  public showModal(
    title: string,
    text: string,
    acceptOnly: boolean = false,
  ): Promise<boolean> {
    this.title.set(title);
    this.text.set(text);
    this.acceptOnly.set(acceptOnly);
    this.isModalVisible.set(true);
    this.confirmResp.initPromise();

    return this.confirmResp.promise;
  }

  public async confirmFinalizeWithoutAnswering(): Promise<boolean> {
    const title = 'Finalizar la consulta sin mensaje';
    const text = '¿Está seguro que desea finalizar la consulta?';
    return await this.showModal(title, text);
  }
}
