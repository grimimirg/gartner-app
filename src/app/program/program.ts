import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramService } from './program.service';

@Component({
  selector: 'app-program',
  imports: [FormsModule],
  templateUrl: './program.html',
  styleUrl: './program.scss'
})
export class Program {
  dsl!: string;

  constructor(private programService: ProgramService) { }

  /**
   * validateDSL
   */
  public validateDSL() {

  }

  /**
   * generateAndSendDSL
   */
  public generateAndSendDSL() {
    this.programService.sendDSL(this.dsl);
  }

}
