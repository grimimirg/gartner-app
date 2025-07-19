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
        command: string,
        zone: string,
        duration: {
            value: number,
            unit: string
        }
    };
}