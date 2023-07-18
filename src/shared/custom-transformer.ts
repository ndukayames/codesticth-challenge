import { Type } from 'class-transformer';

export function TransformStringToNumber() {
  return Type(() => Number);
}
