interface SaveAction {
    type: "save";
}
interface LoadAction {
    type: "load";
}
type Action = SaveAction | LoadAction;
type ActionType = Action["type"]; // "save | load"
