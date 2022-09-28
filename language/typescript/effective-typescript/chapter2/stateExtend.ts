interface State {
    userId: string;
    pageTitle: string;
    pageContents: string;
}

interface TopNavState {
    userId: string;
    pageTitle: string;
}

// TopNavState로 State를 만들지 말고, 반배 방향으로 해서 단일한 인터페이스가 전체 앱의 state를 정의할 수 있도록 한다.
type TopNavState2 = {
    [k in "userId" | "pageTitle"]: State[k];
};

// 이런게 너무 흔해서 표준 라이브러리에 따로 있음.
type TopNavState3 = Pick<State, "userId" | "pageTitle">;
