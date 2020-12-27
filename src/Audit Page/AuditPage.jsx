import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auditActions } from "../_actions";
import Audit from "../_components/audit/audit.component";
import Pagination from "../_components/pagination/pagination";
import "./audit-page.css";

class AuditPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.props.getAudits();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  render() {
    const { currentPage } = this.state;
    let { audits } = this.props;

    const auditsPerPage = 10;
    //Get current audit
    const indexOfLastAudit = currentPage * auditsPerPage;
    const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
    let currentAudits = [];
    let totalAudits = [];
    if (audits.audits) {
      totalAudits = audits.audits;
      currentAudits = totalAudits.slice(indexOfFirstAudit, indexOfLastAudit);
    }

    return (
      <div>
        <p>You're logged in with React!!</p>
        <h1></h1>
        <h3>All Audits:</h3>
        {totalAudits.length && (
          <div className="center">
            <Audit auditsToShow={currentAudits}></Audit>
            <div>
              Page Number {currentPage} of{" "}
              {Math.ceil(totalAudits.length / auditsPerPage)}
            </div>
            <Pagination
              auditsPerPage={auditsPerPage}
              totalAudits={totalAudits.length}
              paginate={this.paginate}
            />
          </div>
        )}{" "}
        {}
        {audits.loading && <em>Loading users...</em>}
        {audits.error && (
          <span className="text-danger">ERROR: {audits.error}</span>
        )}
      </div>
    );
  }
}

function mapState(state) {
  const { audits } = state;

  return { audits };
}

const actionCreators = {
  getAudits: auditActions.getAllAudit,
};

const connectedAuditPage = connect(mapState, actionCreators)(AuditPage);
export { connectedAuditPage as AuditPage };
