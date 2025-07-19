import { Injectable } from '@angular/core';
import { generate } from 'pegjs';
import { environment } from '../../environments/environment';
import { RuleParseModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class ProgramParserService {

  constructor() { }

  parse(rule: string): RuleParseModel | null {
    try {
      console.log(generate(environment.grammar).parse(rule))
      return generate(environment.grammar).parse(rule);
    } catch (err) {
      console.log(err)
      return null;
    }
  }
}
