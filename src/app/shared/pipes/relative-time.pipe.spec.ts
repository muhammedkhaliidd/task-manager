import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  const pipe = new RelativeTimePipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for empty value', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return "Just now" for very recent dates', () => {
    const now = new Date();
    expect(pipe.transform(now.toISOString())).toBe('Just now');
  });
});
