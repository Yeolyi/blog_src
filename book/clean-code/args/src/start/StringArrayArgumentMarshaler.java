// package start;

// import static start.ArgsException.ErrorCode.*;
// import java.util.Iterator;
// import java.util.NoSuchElementException;

// public class StringArrayArgumentMarshaler {
//   private String[] stringArray;

//   public void set(Iterator<String> currentArgument) throws ArgsException {
//     try {
//       stringValue = currentArgument.next();
//     } catch (NoSuchElementException e) {
//       throw new ArgsException(MISSING_STRING);
//     }
//   }

//   public static String[] getValue(ArgumentMarshaler am) {
//     if (am != null && am instanceof StringArrayArgumentMarshaler)
//       return ((StringArrayArgumentMarshaler) am).stringArray;
//     else
//       return new List();
//   }
// }
