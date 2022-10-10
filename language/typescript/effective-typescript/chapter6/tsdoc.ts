// 인삿말 생성. 생성 결과는 표시를 위해 형식화됨.
function greet(name: string, title: string) {
  return `Hello ${title} ${name}`;
}

/** 인삿말 생성. 생성 결과는 표시를 위해 형식화됨. */
function greetJSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}

/**
 * 인삿말 생성
 * @param name 인사할 사람 이름
 * @param title 사람 타이틀?
 * @returns 사람 읽기 좋게 형식화
 */
function greetFullTSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}

greet('yeolyi', 'title');
greetJSDoc('yeolyi', 'title');
greetFullTSDoc('yeolyi', 'title');
