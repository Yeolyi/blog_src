public class ComparisonCompactorOriginal {

  private static final String ELLIPSIS = "...";
  private static final String DELTA_END = "]";
  private static final String DELTA_Start = "[";

  private int fContextLength;
  private String fExpected;
  private String fActual;
  private int fPrefix;
  private int fSuffix;

  public ComparisonCompactorOriginal(int contextLength, String expected, String actual) {
    fContextLength = contextLength;
    fExpected = expected;
    fActual = actual;
  }

  public String compact(String message) {
    if (fExpected == null || fActual == null || areStringEqual()) return String.format(
      "%s %s %s",
      message,
      fExpected,
      fActual
    ); // JUNIT 관련 코드라서 변형 // return Assert.format(message, fExpected, fActual);

    // 얘네를 꼭 불려야하는게 암묵적임.
    findCommonPrefix();
    findCommonSuffix();
    String expected = compactString(fExpected);
    String actual = compactString(fActual);
    // return Assert.format(message, expected, actual);
    // JUNIT 관련 코드라서 변형
    return String.format("%s %s %s", message, expected, actual);
  }

  // find가 먼저 나와야 위에서 아래로 읽힐 듯
  private String compactString(String source) {
    String result =
      DELTA_Start + source.substring(fPrefix, source.length() - fSuffix + 1) + DELTA_END;
    if (fPrefix > 0) result = computeCommonPrefix() + result;
    if (fSuffix > 0) result = result + computeCommonSuffix();
    return result;
  }

  private void findCommonPrefix() {
    fPrefix = 0;
    int end = Math.min(fExpected.length(), fActual.length());
    for (; fPrefix < end; fPrefix++) {
      if (fExpected.charAt(fPrefix) != fActual.charAt(fPrefix)) break;
    }
  }

  private void findCommonSuffix() {
    int expectedSuffix = fExpected.length() - 1;
    int actualSuffix = fActual.length() - 1;
    for (; actualSuffix >= fPrefix && expectedSuffix >= fPrefix; actualSuffix--, expectedSuffix--) {
      if (fExpected.charAt(expectedSuffix) != fActual.charAt(expectedSuffix)) break;
    }
    fSuffix = fExpected.length() - expectedSuffix;
  }

  private String computeCommonPrefix() {
    return (
      (fPrefix > fContextLength ? ELLIPSIS : "") +
      fExpected.substring(Math.max(0, fPrefix - fContextLength), fPrefix)
    );
  }

  private String computeCommonSuffix() {
    int end = Math.min(fExpected.length() - fSuffix + 1 + fContextLength, fExpected.length());
    return (
      fExpected.substring(fExpected.length() - fSuffix + 1, end) +
      (fExpected.length() - fSuffix + 1 < fExpected.length() - fContextLength ? ELLIPSIS : "")
    );
  }

  private boolean areStringEqual() {
    return fExpected.equals(fActual);
  }
}
