import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent implements OnInit {
  // Injections
  private apiService = inject(ApiService);

  // Methods
  async ngOnInit(): Promise<void> {
    const response = await this.apiService.test();
    console.log(response);
  }
}
