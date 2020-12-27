import React, { useState } from "react";

const AuditItem = ({ auditItem }) => {
  const loginTime = new Date(auditItem.loginTime);
  const logoutTime = new Date(auditItem.logoutTime);
  
  return (
    <tbody>
      <tr>
        <td scope="row">{auditItem.user.username}</td>
        <td scope="row">{auditItem.user.role}</td>
        <td scope="row">
          {loginTime.toLocaleTimeString()} on {loginTime.toDateString()}
        </td>
        {auditItem.logoutTime ? (
          <td scope="row">
            {logoutTime.toLocaleTimeString()} on {logoutTime.toDateString()}
          </td>
        ) : (
          <td>Logged In</td>
        )}
      </tr>
    </tbody>
  );
};

export default AuditItem;
