import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MinecoApiService } from '@core/services/mineco-api.service';

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
