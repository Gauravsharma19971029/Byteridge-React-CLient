import { auditConstants } from "../_constants";

export function audits(state = {}, action) {
  switch (action.type) {
    case auditConstants.GETALL_AUDIT_REQUEST:
      return {
        loading: true,
      };
    case auditConstants.GETALL_AUDIT_SUCCESS: {
      return {
        audits: action.audits,
      };
    }
    case auditConstants.GETALL_AUDIT_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
