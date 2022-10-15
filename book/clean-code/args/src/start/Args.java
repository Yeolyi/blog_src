package start;

import static start.ArgsException.ErrorCode.*;

import java.util.*;

public class Args {

  private Map<Character, ArgumentMarshaler> marshalers;
  private Set<Character> argsFound;
  private ListIterator<String> currentArgument;

  public Args(String schema, String[] args) throws ArgsException {
    marshalers = new HashMap<Character, ArgumentMarshaler>();
    argsFound = new HashSet<Character>();

    parseScheme(schema);
    parseArgumentStrings(Arrays.asList(args));
  }

  private void parseScheme(String schema) throws ArgsException {
    for (String element : schema.split(",")) if (element.length() > 0) parseSchemaElement(
      element.trim()
    );
  }

  private void parseSchemaElement(String element) throws ArgsException {
    char elementId = element.charAt(0);
    String elementTail = element.substring(1);
    validateSchemaElementId(elementId);
    // switch문을 쓰는건?
    if (elementTail.length() == 0) marshalers.put(elementId, new BooleanArgumentMarshaler());
    // else if (elementTail.equals("*"))
    // marshalers.put(
    // elementId,
    // new StringArgumentMarshaler());
    // else if (elementTail.equals("#"))
    // marshalers.put(
    // elementId,
    // new IntegerArgumentMarshaler());
    // else if (elementTail.equals("##"))
    // marshalers.put(
    // elementId,
    // new DoubleArgumentMarshaler());
    // else if (elementTail.equals("[*]"))
    // marshalers.put(
    // elementId,
    // new StringArrayArgumentMarshaler());
    else throw new ArgsException(INVALID_ARGUMENT_FORMAT, elementId, elementTail);
    // 예외 관련 커스텀 클래스가 있는 듯
  }

  private void validateSchemaElementId(char elementId) throws ArgsException {
    if (!Character.isLetter(elementId)) throw new ArgsException(
      INVALID_ARGUMENT_NAME,
      elementId,
      null
    );
  }

  private void parseArgumentStrings(List<String> argsList) throws ArgsException {
    for (currentArgument = argsList.listIterator(); currentArgument.hasNext();) {
      String argString = currentArgument.next();
      if (argString.startsWith("-")) {
        parseArgumentCharacters(argString.substring(1));
      } else {
        // 왜? 밑에 public function에서 사용함
        currentArgument.previous();
        break;
      }
    }
  }

  private void parseArgumentCharacters(String argChars) throws ArgsException {
    // 여러개일 수도 있는건가?
    for (int i = 0; i < argChars.length(); i++) parseArgumentCharacter(argChars.charAt(i));
  }

  private void parseArgumentCharacter(char argChar) throws ArgsException {
    ArgumentMarshaler m = marshalers.get(argChar);
    if (m == null) {
      throw new ArgsException(UNEXPECTED_ARGUMENT, argChar, null);
    } else {
      argsFound.add(argChar);
      try {
        m.set(currentArgument);
      } catch (ArgsException e) {
        e.setErrorArgumentId(argChar);
        throw e;
      }
    }
  }

  public boolean getBoolean(char arg) {
    return BooleanArgumentMarshaler.getValue(marshalers.get(arg));
  }
}
// ArgumentMarshaler 정의를 제너릭 써서 하면 안됐을까??
// currentArgument가 이곳저곳 다니는게 신기했음
// BooleanArgumentMarshaler는 왜 throw Error를 안함? 아 애초에 생략될 수 있어서인가.
