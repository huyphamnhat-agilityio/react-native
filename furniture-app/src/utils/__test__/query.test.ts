import {QueryParams, ValidParam} from 'src/interfaces';
import {toQueryString} from '../query';

describe('toQueryString', () => {
  it('should return an empty string if no parameters are provided', () => {
    expect(toQueryString()).toBe('');
  });

  it('should handle basic key-value pairs', () => {
    const params = {key1: 'value1', key2: 'value2'};
    expect(toQueryString(params)).toBe('?key1=value1&key2=value2');
  });

  it('should handle pagination and ordering parameters', () => {
    const params: QueryParams<{key: ValidParam}> = {
      page: 1,
      limit: 10,
      orderBy: 'key',
      order: 'asc',
    };
    expect(toQueryString(params)).toBe(
      '?page=1&limit=10&orderBy=key&order=asc',
    );
  });

  it('should skip undefined parameters', () => {
    const params = {key1: 'value1', key2: undefined};
    expect(toQueryString(params)).toBe('?key1=value1');
  });

  it('should handle special characters by encoding them properly', () => {
    const params = {query: 'hello world', symbol: '&=+'};
    expect(toQueryString(params)).toBe('?query=hello world&symbol=&=+');
  });

  it('should skip "page", "limit", "orderBy", and "order" if undefined', () => {
    const params: QueryParams<{key: ValidParam}> = {
      page: undefined,
      limit: undefined,
      orderBy: undefined,
      order: undefined,
      key: 'value',
    };
    expect(toQueryString(params)).toBe('?key=value');
  });
});
