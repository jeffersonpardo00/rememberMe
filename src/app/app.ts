import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralLayout } from './general-layout/general-layout';

@Component({
  selector: 'app-root',
  imports: [GeneralLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
