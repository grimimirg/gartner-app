import { Component } from '@angular/core';
import parser from '../pegjs-generator/parser';
import { ProgramService } from './program.service';

@Component({
  selector: 'app-program',
  imports: [],
  templateUrl: './program.html',
  styleUrl: './program.scss'
})
export class Program {

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
    const instructions = parser.parse();
    this.programService.sendDSL(instructions);
  }

}
