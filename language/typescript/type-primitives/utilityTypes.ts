interface Person {
  name: string;
  age: number;
}

// 모두 optional로 변경
type PersonUpdateParam = Partial<Person>;
const param: PersonUpdateParam = {};

// 프로퍼티를 read-only로
type PersonFromAPI = Readonly<Person>;

// Record<KeysFrom, Type>
// KeysFrom를 키 값으로 각각에게 Type인 값을 부여
type NavigationPages = "name" | "age";
interface PageInfo {
  title: string;
}
const navigationInfo: Record<NavigationPages, PageInfo> = {
  name: { title: "name" },
  age: { title: "age" },
};

// Pick<Type, Keys>
// 타입에서 선택된 프로퍼티만 남김
type PersonSortPreview = Pick<Person, "name">;

// Omit<Type, Keys>

// Exclude<Type, RemoveUnion>
// Extract<Type, MatchUnion>

type PersonLookupResult = Person | undefined | null;
type ValidatedResult = NonNullable<PersonLookupResult>;

function getPersonByID(id: number): Promise<Person> | void {}
type PersonResponse = ReturnType<typeof getPersonByID>;

// Converts all optional properties to required ones.
type AccessiblePageInfo = Required<PageInfo>;

// ThisType<Type>, InstanceType<Type> 생략
