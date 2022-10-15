package start;

import java.util.*;

public interface ArgumentMarshaler {
  void set(Iterator<String> currentArgument) throws ArgsException;
}
