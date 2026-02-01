import { FormControl, FormArray } from '@angular/forms';
import { maxArrayLength } from './max-array-length.validator';

describe('maxArrayLength', () => {
  it('should return null when control value is not an array', () => {
    const validator = maxArrayLength(5);
    const control = new FormControl('not-an-array');
    expect(validator(control)).toBeNull();
  });

  it('should return null when array length is within limit', () => {
    const validator = maxArrayLength(5);
    const control = new FormControl([1, 2, 3]);
    expect(validator(control)).toBeNull();
  });

  it('should return null when array length equals max', () => {
    const validator = maxArrayLength(3);
    const control = new FormControl([1, 2, 3]);
    expect(validator(control)).toBeNull();
  });

  it('should return error when array length exceeds max', () => {
    const validator = maxArrayLength(2);
    const control = new FormControl([1, 2, 3]);
    const result = validator(control);
    expect(result).toEqual({
      maxArrayLength: { max: 2, actual: 3 },
    });
  });

  it('should return error with correct max and actual for FormArray', () => {
    const validator = maxArrayLength(1);
    const control = new FormArray([
      new FormControl('a'),
      new FormControl('b'),
      new FormControl('c'),
    ]);
    const result = validator(control);
    expect(result).toEqual({
      maxArrayLength: { max: 1, actual: 3 },
    });
  });
});
