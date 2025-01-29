import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MinecoApiService } from '@shared/services/apis/mineco-api.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent implements OnInit {
  // Injections
  private MinecoApiService = inject(MinecoApiService);

  // Methods
  async ngOnInit(): Promise<void> {
    const response = await this.MinecoApiService.test();
    console.log(response);
  }
}
