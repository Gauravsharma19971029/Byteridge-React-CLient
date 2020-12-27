import { auditConstants } from "../_constants";
import { userService } from "../_services";

export const auditActions = {
    getAllAudit
  };

function getAllAudit() {
    return (dispatch) => {
      dispatch(request());
  
      userService.getAllAudit().then(
        (audits) =>{dispatch(success(audits))},
        (error) => dispatch(failure(error.toString()))
      );
    };
  
    function request() {
      return { type: auditConstants.GETALL_AUDIT_REQUEST };
    }
    function success(audits) {
      return { type: auditConstants.GETALL_AUDIT_SUCCESS, audits };
    }
    function failure(error) {
      return { type: auditConstants.GETALL_AUDIT_FAILURE, error };
    }
  }