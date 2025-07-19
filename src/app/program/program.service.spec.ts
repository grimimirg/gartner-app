import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ProgramService } from './program.service';

describe('parser service', () => {
  let service: ProgramService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();

    service = TestBed.inject(ProgramService);
  });

  it('will HTTP POST ON /x with parsed command', () => {
    service.sendDSL("when temperature in zone1 > 35 and humidity in zone1 < 20 then irrigate zone1 for 5 minutes")
    // expect(service.boh).toBeDefined()
  });
});
