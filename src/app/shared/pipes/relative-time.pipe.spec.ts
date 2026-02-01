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

  it('should return "X sec ago" for dates within last minute', () => {
    const past = new Date(Date.now() - 30 * 1000);
    expect(pipe.transform(past.toISOString())).toContain('sec ago');
  });

  it('should return "X min ago" for dates within last hour', () => {
    const past = new Date(Date.now() - 5 * 60 * 1000);
    expect(pipe.transform(past.toISOString())).toContain('min ago');
  });

  it('should return "X hour(s) ago" for dates within last day', () => {
    const past = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(pipe.transform(past.toISOString())).toContain('hour');
  });

  it('should return "X day(s) ago" for dates within last week', () => {
    const past = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(past.toISOString())).toContain('day');
  });

  it('should return locale date string for dates older than a week', () => {
    const past = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(past.toISOString());
    expect(result).not.toContain('ago');
    expect(typeof result).toBe('string');
  });
});
