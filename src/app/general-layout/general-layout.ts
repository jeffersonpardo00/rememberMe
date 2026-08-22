import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MemoriesGird } from '../memories-gird/memories-gird';

@Component({
  selector: 'app-general-layout',
  imports: [MemoriesGird],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss'
})
export class GeneralLayout {}
