export class RuleParseModel {
    type!: 'rule';
    conditions!:
        {
            sensor: string,
            zone: string,
            operator: string,
            value: number
        }[];
    action!: {
        terminate: any,
        every: any,
        command: string,
        zone: string,
        duration: {
            value: number,
            unit: string
        }
    };
}