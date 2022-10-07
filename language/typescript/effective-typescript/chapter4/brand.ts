type AbsolutePath = string & { _brand: 'abs' };
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith('/');
}
function listAbsolutePath(path: AbsolutePath) {
  // ...
}
const sample = '../../blog_src';
// listAbsolutePath(sample);
if (isAbsolutePath(sample)) {
  listAbsolutePath(sample);
}
