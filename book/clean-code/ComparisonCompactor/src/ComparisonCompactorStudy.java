public class ComparisonCompactorStudy {

  private static final String ELLIPSIS = "...";
  private static final String DELTA_END = "]";
  private static final String DELTA_Start = "[";

  private int contextLength;
  private String expected;
  private String actual;
  private int prefixIndex;
  private int suffixIndex;

  private String compactExpected;
  private String compactActual;

  public ComparisonCompactorStudy(int contextLength, String expected, String actual) {
    this.contextLength = contextLength;
    this.expected = expected;
    this.actual = actual;
  }

  public String formatCompactedComparison(String message) {
    if (canBeCompacted()) {
      compactExpectedAndActual();
      return String.format("%s %s %s", message, compactExpected, compactActual);
    } else {
      return String.format("%s %s %s", message, expected, actual);
    }
  }

  private boolean canBeCompacted() {
    return expected == null || actual == null || areStringEqual();
  }

  private void compactExpectedAndActual() {
    findCommonPrefixAndSuffix();
    compactExpected = compactString(expected);
    compactActual = compactString(actual);
  }

  // find가 먼저 나와야 위에서 아래로 읽힐 듯
  private String compactString(String source) {
    String result =
      DELTA_Start + source.substring(prefixIndex, source.length() - suffixIndex + 1) + DELTA_END;
    if (prefixIndex > 0) result = computeCommonPrefix() + result;
    if (suffixIndex > 0) result = result + computeCommonSuffix();
    return result;
  }

  private void findCommonPrefixAndSuffix() {
    findCommonPrefix();
    int suffixLength = 1;
    for (; !suffixOverlapsPrefix(suffixLength); suffixLength++) {
      if (charFromEnd(expected, suffixLength) != charFromEnd(actual, suffixLength)) break;
    }
    suffixIndex = suffixLength;

    int expectedSuffix = expected.length() - 1;
    int actualSuffix = actual.length() - 1;
    for (
      ;
      actualSuffix >= prefixIndex && expectedSuffix >= prefixIndex;
      actualSuffix--, expectedSuffix--
    ) {
      if (expected.charAt(expectedSuffix) != actual.charAt(expectedSuffix)) break;
    }
    suffixIndex = expected.length() - expectedSuffix;
  }

  private boolean suffixOverlapsPrefix(int suffixLength) {
    return (
      actual.length() - suffixLength < prefixLength ||
      expected.length() - suffixLength < prefixLength
    );
  }

  private char charFromEnd(String s, int i) {
    return s.charAt(s.length() - i);
  }

  private void findCommonPrefix() {
    prefixIndex = 0;
    int end = Math.min(expected.length(), actual.length());
    for (; prefixIndex < end; prefixIndex++) {
      if (expected.charAt(prefixIndex) != actual.charAt(prefixIndex)) break;
    }
  }

  private String computeCommonPrefix() {
    return (
      (prefixIndex > contextLength ? ELLIPSIS : "") +
      expected.substring(Math.max(0, prefixIndex - contextLength), prefixIndex)
    );
  }

  private String computeCommonSuffix() {
    int end = Math.min(expected.length() - suffixIndex + 1 + contextLength, expected.length());
    return (
      expected.substring(expected.length() - suffixIndex + 1, end) +
      (expected.length() - suffixIndex + 1 < expected.length() - contextLength ? ELLIPSIS : "")
    );
  }

  private boolean areStringEqual() {
    return expected.equals(actual);
  }
}
