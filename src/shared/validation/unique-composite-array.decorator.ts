import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

function getPathValue(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined;
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

export function UniqueCompositeArray(
  paths: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      name: 'UniqueCompositeArray',
      target: target.constructor,
      propertyName: propertyKey.toString(),
      constraints: [paths],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (!Array.isArray(value)) return true;

          const [constraintPaths] = args.constraints as [string[]];
          const seen = new Set<string>();

          for (const element of value) {
            const keyParts = constraintPaths.map((p) => {
              const v = getPathValue(element, p);
              return v == null ? '' : String(v);
            });

            if (keyParts.some((p) => p === '')) continue;

            const key = keyParts.join('::');
            if (seen.has(key)) return false;
            seen.add(key);
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [constraintPaths] = args.constraints as [string[]];
          return `Não é permitido repetir itens com a mesma combinação (${constraintPaths.join(
            ' + ',
          )})`;
        },
      },
    });
  };
}
