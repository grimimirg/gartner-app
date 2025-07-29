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

# Azione di irrigazione con durata, frequenza e terminazione
action
  = "irrigate" _ z:zone _ "for" _ d:number _ u:unit freq:(_ frequency)? term:(_ termination)? {
      let result = {
        command: "irrigate",
        zone: z,
        duration: { value: parseInt(d), unit: u }
      };
      if (freq)      result.every     = freq[1];
      if (term)      result.terminate = term[1];
      return result;
    }

# Frequenza di irrigazione
frequency
  = "every" _ d:integer _ tu:timeUnit {
      return { value: parseInt(d), unit: tu };
    }

# Condizioni di terminazione di tipo logico
termination
  = "terminate" _ "when" _ t:terminationCondition {
      return t;
    }

terminationCondition
  = orCondition

orCondition
  = left:andCondition rest:(_ "or" _ andCondition)* {
      return rest.length
        ? { op: "or", args: [left].concat(rest.map(r => r[3])) }
        : left;
    }

andCondition
  = left:termFactor rest:(_ "and" _ termFactor)* {
      return rest.length
        ? { op: "and", args: [left].concat(rest.map(r => r[3])) }
        : left;
    }

termFactor
  = "(" _ t:terminationCondition _ ")" { return t; }
  / termBase

termBase
  = s:sensor _ op:operator _ v:integer {
      return { sensor: s, operator: op, value: parseInt(v) };
    }

sensor
  = "temperature" / "humidity" / "light"

zone
  = "zone1" / "zone2" / "zone3"

operator
  = ">=" / "<=" / "==" / "!=" / ">" / "<"

unit
  = "minutes" / "min" / "seconds" / "sec"

timeUnit
  = "min" / "hour" / "day" / "week" / "month"

integer
  = [0-9]+

number
  = [0-9]+ ("." [0-9]+)?

_ = [ \t\n\r]*
