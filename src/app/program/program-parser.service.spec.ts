import { TestBed } from '@angular/core/testing';

import { ProgramParserService } from './program-parser.service';

describe('ON program parser service', () => {
  let service: ProgramParserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
      ]
    })
      .compileComponents();

    service = TestBed.inject(ProgramParserService);
  });

  it('throws on negative condition value', () => {
    expect(() => service.parse(
      'when temperature in zone2 < -5 then irrigate zone2 for 2 minutes'
    )).toThrow();
  });

  it('throws on zero duration', () => {
    expect(() => service.parse(
      'when humidity in zone1 > 30 then irrigate zone1 for 0 min'
    )).toThrow();
  });

  it('throws on misplaced and without then', () => {
    expect(() => service.parse(
      'when temperature in zone1 > 20 and then irrigate zone1 for 5 minutes'
    )).toThrow();
  });

  it('throws on singular unit "minute"', () => {
    expect(() => service.parse(
      'when humidity in zone2 < 50 then irrigate zone2 for 1 minute'
    )).toThrow();
  });

  it('throws on empty input', () => {
    expect(() => service.parse('')).toThrow();
  });

  it('throws on null input', () => {
    expect(() => service.parse((null as any))).toThrow();
  });

  it('test 1', () => {
    let result = service.parse("when temperature in zone1 > 35 and humidity in zone1 < 20 then irrigate zone1 for 5 minutes")

    expect(result).toEqual({
      "type": "rule",
      "conditions": [
        {
          "sensor": "temperature",
          "zone": "zone1",
          "operator": ">",
          "value": 3
        },
        {
          "sensor": "humidity",
          "zone": "zone1",
          "operator": "<",
          "value": 2
        }
      ],
      "action": {
        "command": "irrigate",
        "zone": "zone1",
        "duration": {
          "value": 5,
          "unit": "minutes"
        },
        "terminate": {},
        "every": {}
      }
    })
  });

  it('test 2: single‐condition with seconds', () => {
    const result = service.parse(
      'when light in zone2 == 100 then irrigate zone2 for 15 seconds'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        {
          sensor: 'light',
          zone: 'zone2',
          operator: '==',
          value: 100
        }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone2',
        duration: {
          value: 15,
          unit: 'seconds'
        },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 3: two conditions with <=, >= and min abbreviation', () => {
    const result = service.parse(
      'when humidity in zone3 <= 50 and temperature in zone3 >= 25 then irrigate zone3 for 3 min'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        {
          sensor: 'humidity',
          zone: 'zone3',
          operator: '<=',
          value: 50
        },
        {
          sensor: 'temperature',
          zone: 'zone3',
          operator: '>=',
          value: 25
        }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone3',
        duration: {
          value: 3,
          unit: 'min'
        },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 4: negation operator and singular minutes', () => {
    const result = service.parse(
      'when temperature in zone1 != 20 then irrigate zone1 for 1 minutes'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        {
          sensor: 'temperature',
          zone: 'zone1',
          operator: '!=',
          value: 20
        }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone1',
        duration: {
          value: 1,
          unit: 'minutes'
        },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 5: float values and sec abbreviation', () => {
    const result = service.parse(
      'when humidity in zone2 < 33.5 and light in zone2 > 200.25 then irrigate zone2 for 7 sec'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'humidity', zone: 'zone2', operator: '<', value: 33.5 },
        { sensor: 'light', zone: 'zone2', operator: '>', value: 200.25 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone2',
        duration: { value: 7, unit: 'sec' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 6: three conditions and plural minutes', () => {
    const result = service.parse(
      'when temperature in zone3 >= 15 and humidity in zone3 <= 60 and light in zone3 != 0 then irrigate zone3 for 4 minutes'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone3', operator: '>=', value: 15 },
        { sensor: 'humidity', zone: 'zone3', operator: '<=', value: 60 },
        { sensor: 'light', zone: 'zone3', operator: '!=', value: 0 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone3',
        duration: { value: 4, unit: 'minutes' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 7: single condition with seconds full word', () => {
    const result = service.parse(
      'when light in zone1 == 0 then irrigate zone1 for 30 seconds'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'light', zone: 'zone1', operator: '==', value: 0 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone1',
        duration: { value: 30, unit: 'seconds' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 8: extra whitespace and tabs', () => {
    const result = service.parse(
      'when    temperature in   zone1    >    35    and\thumidity\tin\tzone1 <20\tthen irrigate   zone1 for    5 minutes'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone1', operator: '>', value: 35 },
        { sensor: 'humidity', zone: 'zone1', operator: '<', value: 20 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone1',
        duration: { value: 5, unit: 'minutes' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 9: no spaces around operator and number', () => {
    const result = service.parse(
      'when temperature in zone2>25 and humidity in zone2<30 then irrigate zone2 for 7min'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone2', operator: '>', value: 25 },
        { sensor: 'humidity', zone: 'zone2', operator: '<', value: 30 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone2',
        duration: { value: 7, unit: 'min' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 10: float duration truncated', () => {
    const result = service.parse(
      'when temperature in zone3 >= 15 then irrigate zone3 for 2.5 minutes'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone3', operator: '>=', value: 15 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone3',
        duration: { value: 2, unit: 'minutes' },
        terminate: {},
        every: {}
      }
    });
  });

  it('test 11: multiline rule', () => {
    const result = service.parse(
      'when temperature in zone2 > 20\nand humidity in zone2 <= 50\nand light in zone2 == 300 then irrigate zone2 for 10 min'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone2', operator: '>', value: 20 },
        { sensor: 'humidity', zone: 'zone2', operator: '<=', value: 50 },
        { sensor: 'light', zone: 'zone2', operator: '==', value: 300 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone2',
        duration: { value: 10, unit: 'min' },
        terminate: {},
        every: {}
      }
    });
  });

  it('throws on unknown sensor', () => {
    expect(() => service.parse(
      'when pressure in zone1 > 10 then irrigate zone1 for 5 min'
    )).toThrow();
  });

  it('parses case-insensitive keywords', () => {
    const result = service.parse(
      'WHEN temperature in zone1 > 20 THEN irrigate zone1 for 5 MIN'
    );

    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone1', operator: '>', value: 20 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone1',
        duration: { value: 5, unit: 'min' },
        terminate: {},
        every: {}
      }
    });
  });

  it('throws on negative condition value', () => {
    expect(() => service.parse(
      'when temperature in zone2 < -5 then irrigate zone2 for 2 minutes'
    )).toThrow();
  });

  it('throws on zero duration', () => {
    expect(() => service.parse(
      'when humidity in zone1 > 30 then irrigate zone1 for 0 min'
    )).toThrow();
  });

  it('throws on misplaced and without then', () => {
    expect(() => service.parse(
      'when temperature in zone1 > 20 and then irrigate zone1 for 5 minutes'
    )).toThrow();
  });

  it('throws on singular unit "minute"', () => {
    expect(() => service.parse(
      'when humidity in zone2 < 50 then irrigate zone2 for 1 minute'
    )).toThrow();
  });

  it('throws on empty input', () => {
    expect(() => service.parse('')).toThrow();
  });

  it('throws on null input', () => {
    expect(() => service.parse((null as any))).toThrow();
  });

  it('test 1', () => {
    const result = service.parse(
      'when temperature in zone1 > 35 and humidity in zone1 < 20 then irrigate zone1 for 5 minutes'
    );
    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone1', operator: '>', value: 35 },
        { sensor: 'humidity', zone: 'zone1', operator: '<', value: 20 }
      ],
      action: {
        command: 'irrigate', zone: 'zone1', duration: { value: 5, unit: 'minutes' },
        terminate: {},
        every: {}
      }
    });
  });

  // ... existing tests 2–11 remain unchanged ...

  // New tests for frequency and termination

  it('parses frequency: every N timeUnit', () => {
    const result = service.parse(
      'when temperature in zone1 > 20 then irrigate zone1 for 5 minutes every 2 hour'
    );
    expect(result).toEqual(jasmine.objectContaining({
      action: jasmine.objectContaining({
        duration: { value: 5, unit: 'minutes' },
        every: { value: 2, unit: 'hour' }
      })
    }));
  });

  it('parses termination single condition', () => {
    const result = service.parse(
      'when light in zone2 == 100 then irrigate zone2 for 10 sec terminate when humidity <= 40'
    );
    expect(result).toEqual(jasmine.objectContaining({
      action: jasmine.objectContaining({
        duration: { value: 10, unit: 'sec' },
        terminate: { sensor: 'humidity', operator: '<=', value: 40 }
      })
    }));
  });

  it('parses termination with AND', () => {
    const result = service.parse(
      'when temperature in zone3 >= 25 then irrigate zone3 for 3 min terminate when temperature >= 30 and light == 0'
    );
    expect(result!.action.terminate).toEqual({
      op: 'and',
      args: [
        { sensor: 'temperature', operator: '>=', value: 30 },
        { sensor: 'light', operator: '==', value: 0 }
      ]
    });
  });

  it('parses termination with OR and parentheses', () => {
    const result = service.parse(
      'when humidity in zone1 < 50 then irrigate zone1 for 15 min terminate when (temperature > 35 or humidity < 20) or light == 0'
    );
    expect(result!.action.terminate).toEqual({
      op: 'or',
      args: [
        {
          op: 'or', args: [
            { sensor: 'temperature', operator: '>', value: 35 },
            { sensor: 'humidity', operator: '<', value: 20 }
          ]
        },
        { sensor: 'light', operator: '==', value: 0 }
      ]
    });
  });

  it('parses full complex rule with frequency and termination', () => {
    const input = `when temperature in zone2 > 30 and humidity in zone2 < 50 then irrigate zone2 for 20 minutes every 1 day terminate when (temperature >= 35 and (humidity <= 20 or light == 0)) or (temperature < 25 and humidity > 80)`;
    const result = service.parse(input);
    expect(result).toEqual({
      type: 'rule',
      conditions: [
        { sensor: 'temperature', zone: 'zone2', operator: '>', value: 30 },
        { sensor: 'humidity', zone: 'zone2', operator: '<', value: 50 }
      ],
      action: {
        command: 'irrigate',
        zone: 'zone2',
        duration: { value: 20, unit: 'minutes' },
        every: { value: 1, unit: 'day' },
        terminate: {
          op: 'or',
          args: [
            {
              op: 'and', args: [
                { sensor: 'temperature', operator: '>=', value: 35 },
                {
                  op: 'or', args: [
                    { sensor: 'humidity', operator: '<=', value: 20 },
                    { sensor: 'light', operator: '==', value: 0 }
                  ]
                }
              ]
            },
            {
              op: 'and', args: [
                { sensor: 'temperature', operator: '<', value: 25 },
                { sensor: 'humidity', operator: '>', value: 80 }
              ]
            }
          ]
        }
      }
    });
  });

});