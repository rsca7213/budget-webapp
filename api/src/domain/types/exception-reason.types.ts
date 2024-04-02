export type ExceptionReason =
  | 'Validation'
  | 'Verification'
  | 'NotFound'
  | 'Authorization'
  | 'Privilege'
  | 'Repository'
  | 'Generic'
export const exceptionReasons: ExceptionReason[] = [
  'Validation',
  'Verification',
  'NotFound',
  'Authorization',
  'Privilege',
  'Repository',
  'Generic'
]
