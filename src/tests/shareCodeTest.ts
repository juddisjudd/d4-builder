import { safeDecodeBuildState } from '../utils/buildUtils';

function testShareCode(description: string, shareCode: string) {
  console.log(`Testing: ${description}`);
  const result = safeDecodeBuildState(shareCode);
  if (result.error) {
    console.log(`Error: ${result.error}`);
  } else {
    console.log('Decoded successfully');
  }
  console.log('---');
}

testShareCode('Valid share code', 'eyJzZWxlY3RlZENsYXNzIjoiQmFyYmFyaWFuIiwiYXNwZWN0cyI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sInNvY2tldHMiOltdLCJzZWxlY3RlZFNraWxscyI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwidGVjaG5pcXVlIjpudWxsLCJzcGlyaXRCb29ucyI6eyJEZWVyIjpbXSwiRWFnbGUiOltdLCJXb2xmIjpbXSwiU25ha2UiOltdfSwic3BlY2lhbGl6YXRpb24iOm51bGwsImVuY2hhbnRtZW50cyI6W251bGwsbnVsbF0sImJvb2tPZlRoZURlYWQiOnsiU2tlbGV0YWwgV2FycmlvcnMiOm51bGwsIlNrZWxldGFsIE1hZ2VzIjpudWxsLCJHb2xlbXMiOm51bGx9LCJzcGlyaXRIYWxsIjp7InByaW1hcnkiOm51bGwsInNlY29uZGFyeSI6bnVsbH0sIml0ZW1TdGF0cyI6e319');
testShareCode('Invalid JSON', 'aW52YWxpZCBqc29u');
testShareCode('Valid JSON but invalid schema', 'eyJpbnZhbGlkS2V5IjoidmFsdWUifQ==');
testShareCode('Not base64 encoded', 'not base64 encoded');
testShareCode('Empty string', '');

console.log('Share code tests completed');