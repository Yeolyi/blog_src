package start;

// 자기가 자기를 import?할 수 있네
// import static args.ArgsException.ErrorCode.*;
import static start.ArgsException.ErrorCode.*;

public class ArgsException extends Exception {

  private char errorArgumentId = '\0';
  private String errorParameter = null;
  private ErrorCode errorCode = OK;

  public ArgsException() {}

  public ArgsException(String message) {
    super(message);
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

  public void setErrorArgumentId(char errorArgumentId) {
    this.errorArgumentId = errorArgumentId;
  }

  public void setErrorParameter(String errorParameter) {
    this.errorParameter = errorParameter;
  }

  public enum ErrorCode {
    OK,
    INVALID_ARGUMENT_FORMAT,
    UNEXPECTED_ARGUMENT,
    INVALID_ARGUMENT_NAME,
  }
}
