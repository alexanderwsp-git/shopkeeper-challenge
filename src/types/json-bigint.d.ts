declare module 'json-bigint' {
    const JSONbig: {
      parse: (input: string) => any;
      stringify: (input: any) => string;
    };
    export default JSONbig;
  }