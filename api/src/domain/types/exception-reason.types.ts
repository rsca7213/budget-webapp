export type ExceptionReason =
  | 'Validation'
  | 'Verification'
  | 'NotFound'
  | 'Authorization'
  | 'Privilege'
  | 'Repository'
  | 'Generic'
export const ExceptionReasons: ExceptionReason[] = [
  'Validation',
  'Verification',
  'NotFound',
  'Authorization',
  'Privilege',
  'Repository',
  'Generic'
]
