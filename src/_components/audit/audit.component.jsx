import React, { useState } from "react";
import AuditItem from "../audit-item/audit-item";

export default function Audit({ auditsToShow }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Login Time</th>
            <th scope="col">Logout Time</th>
          </tr>
        </thead>

        {auditsToShow.map((audit) => {
          return (
            audit.user && (
              <AuditItem key={audit._id} auditItem={audit}></AuditItem>
            )
          );
        })}
      </table>
    </div>
  );
}
