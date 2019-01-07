/**
 * CBA installing uuid from npm for such a small task
 * https://gist.github.com/gordonbrander/2230317
 * supposedly manages 10 milion ids generated with 0 collisions
 */
export default function generatedId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
