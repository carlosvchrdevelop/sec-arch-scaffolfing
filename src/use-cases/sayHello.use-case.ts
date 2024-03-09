interface sayHelloUseCase {
  run: (name?: string) => string;
}

export default class sayHello implements sayHelloUseCase {
  constructor(/** Dependency injection here */) {}
  run(name?: string) {
    return name ? `Hello ${name}` : `Hello World`;
  }
}
