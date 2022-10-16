package start;

// 자기가 자기를 import?할 수 있네
// import static args.ArgsException.ErrorCode.*;
import static start.ArgsException.ErrorCode.*;

public class ArgsException extends Exception {

  // getter setter를 단순 반환/대입으로 할거면 그냥 public으로 해도 되지 않나?
  // 일단은 귀찮아서 getter/setter를 만들어놓지는 않음.
  char errorArgumentId = '\0';
  String errorParameter = null;
  ErrorCode errorCode = OK;

  public ArgsException() {}

  public ArgsException(String message) {
    super(message);
  }

  public ArgsException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }

  public ArgsException(ErrorCode errorCode, String errorParameter) {
    this.errorCode = errorCode;
    this.errorParameter = errorParameter;
  }

  public ArgsException(ErrorCode errorCode, char errorArgumentId, String errorParameter) {
    this.errorCode = errorCode;
    this.errorArgumentId = errorArgumentId;
    this.errorParameter = errorParameter;
  }

  public String errorMessage() {
    return "ERROR BLAHBLAH";
  }

  public enum ErrorCode {
    OK,
    INVALID_ARGUMENT_FORMAT,
    UNEXPECTED_ARGUMENT,
    INVALID_ARGUMENT_NAME,
    MISSING_STRING,
    MISSING_INTEGER,
    INVALID_INTEGER,
    MISSING_DOUBLE,
    INVALID_DOUBLE,
  }
}
