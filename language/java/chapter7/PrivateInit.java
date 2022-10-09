package chapter7;

class AAA {

  private AAA() {}
}

class BBB extends AAA {

  // Implicit super constructor AAA() is not visible. Must explicitly invoke
  // another constructor
  BBB() {}
}
