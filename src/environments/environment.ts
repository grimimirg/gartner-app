export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:3000/api',
  grammar:
    `
    start
  = rule

rule
  = "when" _ c:conditionList _ "then" _ a:action {
      return {
        type: "rule",
        conditions: c,
        action: a
      };
    }

conditionList
  = first:condition rest:(_ "and" _ condition)* {
      return [first].concat(rest.map(r => r[3]));
    }

condition
  = s:sensor _ "in" _ z:zone _ op:operator _ v:number {
      return {
        sensor: s,
        zone: z,
        operator: op,
        value: parseFloat(v)
      };
    }

action
  = "irrigate" _ z:zone _ "for" _ d:number _ u:unit {
      return {
        command: "irrigate",
        zone: z,
        duration: {
          value: parseInt(d),
          unit: u
        }
      };
    }

sensor
  = "temperature" / "humidity" / "light"

zone
  = "zone1" / "zone2" / "zone3"

operator
  = ">" / "<" / ">=" / "<=" / "==" / "!="

unit
  = "minutes" / "min" / "seconds" / "sec"

number
  = [0-9]+ ("." [0-9]+)?

_ = [ \\t\\n\\r]*
`
};